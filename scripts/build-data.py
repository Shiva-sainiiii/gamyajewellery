#!/usr/bin/env python3
"""Turns data/catalog.csv (Kaggle jewellery dataset) into lib/products.json for the shop.
Run:  python3 scripts/build-data.py
Names are re-labelled with Indian collection names, weights are estimated and prices are
computed in the app from live gold rates, so everything here is DEMO data."""
import csv, json, re, hashlib, os
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
rows = list(csv.DictReader(open(os.path.join(ROOT, 'data', 'catalog.csv'), encoding='utf-8')))
NAMES = ['Aarohi','Kiara','Mehr','Noor','Anaya','Ishani','Tara','Zoya','Meera','Riya','Saanvi','Vanya','Aadya','Diya','Kavya','Navya','Myra','Siya','Trisha','Amaya','Ira','Leela','Nysa','Pari','Roshni','Suhana','Tanvi','Urvi','Vidya','Yashvi','Aditi','Bhavya','Charu','Devika','Esha','Falak','Gauri','Harini','Inaya','Jiya','Kritika','Lavanya','Mitali','Naina','Oja','Prisha','Rhea','Sanaya','Tisha','Uma','Veda','Waaman','Yami','Zara','Ahana','Bela','Chitra','Dhriti','Eshani','Fiza','Gargi','Hansa','Ishika','Janvi','Kimaya','Lakshmi','Mira','Nitya','Omisha','Pihu','Rudra','Shreya','Tanya','Uvika','Varna','Yuvika']
TYPE = {'rings':'Ring','bracelets':'Bracelet','necklaces':'Necklace','earrings':'Earrings'}
CAT = {'rings':'Rings','bracelets':'Bracelets','necklaces':'Necklaces','earrings':'Earrings'}
def h(s, n=1000): return int(hashlib.md5(s.encode()).hexdigest(), 16) % n
def base(t, cat):
    t = t.split(',')[0]
    t = re.sub(r'\b(wedding band|ring|bracelet|necklace|earrings?|SM|LM|XL|XS|small model|medium model|large model|model)\b', '', t, flags=re.I)
    return re.sub(r'\s+', ' ', t).strip().lower() or 'classic'
coll = {}
def cname(t, cat):
    k = (base(t, cat), cat)
    if k not in coll: coll[k] = NAMES[len(coll) % len(NAMES)]
    return coll[k]
out = []
for r in rows:
    cat = r['categorie']; t = r['title'].strip(); tags = [x.strip().rstrip('.') for x in r['tags'].split(',')]
    d = r['description']; low = d.lower()
    plat = 'platinum' in tags
    col = 'platinum' if plat else 'white' if 'white gold' in tags else 'rose' if 'pink gold' in tags else 'yellow'
    mixed = sum(1 for x in tags if x.endswith(' gold')) > 1
    if mixed: col = 'tri'
    cts = [float(x) for x in re.findall(r'([\d.]+)\s*carats?', d) if re.match(r'^\d*\.?\d+$', x)]
    ct = round(max(cts), 2) if cts else 0
    dia = any(x.startswith('diamond') for x in tags)
    gems = [x for x in tags if x not in ('diamond','diamonds','platinum') and not x.endswith(' gold')]
    wm = re.search(r'Width:\s*([\d.]+)\s*mm', d); width = float(wm.group(1)) if wm else None
    j = h(r['ref'], 21) / 100 - 0.1   # -10%..+10%
    if cat == 'rings':     w = (2.0 + (width or 4) * 0.6) * (1 + j)
    elif cat == 'bracelets': w = ((10 + (width or 5) * 1.4) if width else 14) * (1 + j)
    elif cat == 'necklaces': w = (8 + h(r['ref'], 14)) * (1 + j)
    else:                  w = (3 + h(r['ref'], 40) / 10) * (1 + j)
    if plat: w *= 1.25
    stone = 0
    if dia: stone += ct * (90000 if ct < 1 else 150000 if ct < 3 else 220000) if ct else 6000
    stone += 14000 * len(gems)
    stone = round(stone / 100) * 100
    mk = 8 + h(r['ref'] + 'm', 9) + (4 if dia else 0)   # making charge %
    wedding = 'wedding' in t.lower()
    delicate = (width is not None and width < 3.5) or ('small' in t.lower())
    if wedding: occ = 'Wedding'
    elif dia and ct >= 1: occ = 'Party'
    elif gems: occ = 'Festive'
    elif not dia and delicate: occ = 'Daily wear'
    elif not dia: occ = 'Gifting' if h(r['ref'], 3) else 'Daily wear'
    else: occ = ['Daily wear','Gifting','Party'][h(r['ref'], 3)]
    nm = cname(t, cat)
    extra = [x.strip() for x in t.split(',')[1:] if x.strip()]
    lowt = t.lower()
    kind = 'band' if 'wedding band' in lowt else TYPE[cat].lower()
    name = f"{nm} {kind}" if kind != 'earrings' else f"{nm} earrings"
    name = name[0].upper() + name[1:] if name[0].islower() else name
    if extra:
        e = ', '.join(extra); e = e.replace('diamond-paved', 'pavé diamonds').replace('SM','small').replace('LM','large')
        name += ' · ' + e
    karat = 'Platinum 950' if plat else '18K ' + {'yellow':'yellow gold','rose':'rose gold','white':'white gold','tri':'tri-colour gold'}[col]
    bits = [karat]
    if dia: bits.append(f'set with diamonds totalling {ct} ct' if ct else 'set with diamonds')
    if gems: bits.append(' & '.join(gems))
    if width: bits.append(f'{width:g} mm wide')
    out.append(dict(id=r['ref'].strip().lower(), n=name, cat=CAT[cat], col=col, k=950 if plat else 18, dia=int(dia), ct=ct,
                    w=round(w, 2), mk=mk, st=stone, occ=occ, coll=nm + ' collection', d=', '.join(bits) + '.',
                    img=r['image'].strip(), g=gems, fam=cat + '|' + t.lower()))
# families: same design in other metals (same title) -> used for colour swatches
fam = {}
for p in out: fam.setdefault(p['fam'], []).append(p['id'])
for p in out:
    p['v'] = [x for x in fam[p['fam']] if x != p['id']][:5]; del p['fam']
# interleave so the default "featured" order is not all one category
out.sort(key=lambda p: (h(p['id'], 100000)))
json.dump(out, open(os.path.join(ROOT, 'lib', 'products.json'), 'w'), separators=(',', ':'), ensure_ascii=False)
print(len(out), 'products;', len(coll), 'collections')
