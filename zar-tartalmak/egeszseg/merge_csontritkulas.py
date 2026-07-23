"""Csontritkulás recept HTML + képek egyesítése egyetlen fájlba"""
import base64
import os

SRC_DIR = os.path.join(os.path.dirname(__file__), "Csontritkulás recept_files")
DST = os.path.join(os.path.dirname(__file__), "Csontritkulás_recept_v2.html")

# Képek base64 kódolása
pics = {}
for fname, label in [("pic003.jpg", "Önnek csontritkulása van? (1)"),
                     ("pic004.jpg", "Önnek csontritkulása van? (2)")]:
    path = os.path.join(SRC_DIR, fname)
    with open(path, "rb") as f:
        pics[fname] = base64.b64encode(f.read()).decode()
    print(f"  {fname}: {len(pics[fname])} chars")

html = f"""<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Önnek csontritkulása van? — Csontritkulás recept</title>
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  background: #f0f4f7;
  padding: 20px;
}}
.page {{
  max-width: 680px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,.08);
  padding: 36px 28px;
}}
h1 {{
  font-size: 22px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 6px;
}}
.subtitle {{
  font-size: 13px;
  color: #888;
  margin-bottom: 26px;
  padding-bottom: 18px;
  border-bottom: 2px solid #2D6A9F;
}}
img {{
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 22px;
  border-radius: 6px;
  box-shadow: 0 1px 6px rgba(0,0,0,.1);
  border: 1px solid #e0e0e0;
}}
.footer {{
  margin-top: 24px;
  padding-top: 14px;
  border-top: 1px solid #ddd;
  font-size: 11px;
  color: #aaa;
  text-align: center;
}}
</style>
</head>
<body>
<div class="page">
  <h1>Önnek csontritkulása van?</h1>
  <p class="subtitle">Dr. Lenkei Gábor receptje — Csontritkulás • Jog az Egészséghez Egyesület</p>

  <img src="data:image/jpeg;base64,{pics['pic003.jpg']}" alt="Csontritkulás 1">
  <img src="data:image/jpeg;base64,{pics['pic004.jpg']}" alt="Csontritkulás 2">

  <div class="footer">Dr. Lenkei Gábor • Jog az Egészséghez Egyesület</div>
</div>
</body>
</html>"""

with open(DST, "w", encoding="utf-8") as f:
    f.write(html)
print(f"\n  KÉSZ: {DST}")
print(f"  Méret: {os.path.getsize(DST):,} bytes")