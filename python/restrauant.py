# embed_images.py
import os, re, sys, io, base64, time
try:
    from PIL import Image
except Exception:
    print("The Python Imaging Library (Pillow) is not installed. Install it with: pip install pillow")
    sys.exit(1)

# Use requests if available, otherwise provide a lightweight shim using urllib
try:
    import requests
except Exception:
    import urllib.request as _urllib
    import urllib.parse as _parse

    class _Utils:
        @staticmethod
        def requote_uri(x):
            # basic URI quoting for path/query insertion
            return _parse.quote(x, safe=':/?&=,+')

    class _Response:
        def __init__(self, content, status):
            self.content = content
            self.status_code = status

        def raise_for_status(self):
            if self.status_code >= 400:
                raise Exception(f"HTTP {self.status_code}")

    class _RequestsShim:
        utils = _Utils()

        @staticmethod
        def get(url, timeout=20):
            req = _urllib.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with _urllib.urlopen(req, timeout=timeout) as resp:
                content = resp.read()
                status = resp.getcode()
            return _Response(content, status)

    requests = _RequestsShim

# === CONFIG ===
INPUT_HTML = "aurumbite-offline-photos-like.html"   # your current HTML (backup first!)
OUTPUT_HTML = "aurumbite-offline-with-photos.html"
TMP_DIR = "tmp_images"
QUALITY = 68           # JPEG quality (medium). Lower = smaller file.
MAX_DIM = 1200         # resize max dimension (keeps images reasonable)

# Dishes — must match the order in your HTML generation (same lists)
dishes = [
  "Truffle Lobster Tagliolini","Smoked Salmon Crudo","Crispy Pork Belly","Charred Octopus",
  "Wild Mushroom Risotto","Beetroot & Goat Cheese Tart","Paneer Malai Tikka","Butter Chicken Ravioli",
  "Herb-Crusted Lamb Rack","Seared Scallops","Wagyu Slider Trio","Sichuan Chili Prawns",
  "Classic Caesar — Elevated","Ghee Roast Chicken Biryani","Sushi Omakase (6 pcs)","Charcoal Naan & Dips",
  "Smoked Aubergine Caponata","Spiced Pumpkin Soup","Duck Confit Salad","Miso Glazed Salmon"
]

desserts = [
  "Crème Brûlée","Raspberry Macarons","Blueberry Cheesecake","Vanilla Bean Gelato",
  "Molten Lava Cake","Classic Tiramisu"
]

# Combined list in the order they appear in the DOM (main dishes then desserts)
all_items = dishes + desserts

# Unsplash source URL template (no API key required)
# This returns a random image matching keywords — good for demos.
UNSPLASH_TEMPLATE = "https://source.unsplash.com/1200x800/?{q}"

# === end config ===

os.makedirs(TMP_DIR, exist_ok=True)

def download_image(query, dest_path, tries=3):
    url = UNSPLASH_TEMPLATE.format(q=requests.utils.requote_uri(query))
    for attempt in range(tries):
        try:
            print(f"Downloading for '{query}' from {url} (attempt {attempt+1})...")
            resp = requests.get(url, timeout=20)
            resp.raise_for_status()
            with open(dest_path, "wb") as f:
                f.write(resp.content)
            # some unsplash redirects give HTML if rate-limited; verify as image
            try:
                Image.open(dest_path).verify()
            except Exception as e:
                print("Downloaded file is not a valid image. Retrying...", e)
                time.sleep(1)
                continue
            return True
        except Exception as e:
            print("Error:", e)
            time.sleep(1)
    return False

def convert_to_jpeg_base64(img_path, max_dim=MAX_DIM, quality=QUALITY):
    with Image.open(img_path) as im:
        im = im.convert("RGB")
        w,h = im.size
        scale = min(1.0, float(max_dim) / max(w,h))
        if scale < 1.0:
            im = im.resize((int(w*scale), int(h*scale)), Image.LANCZOS)
        bio = io.BytesIO()
        im.save(bio, format="JPEG", quality=quality, optimize=True)
        raw = bio.getvalue()
        b64 = base64.b64encode(raw).decode("ascii")
        return "data:image/jpeg;base64," + b64

def main():
    if not os.path.exists(INPUT_HTML):
        print(f"Input HTML file '{INPUT_HTML}' not found. Put this script in same folder as your HTML or change INPUT_HTML.")
        sys.exit(1)

    print(f"Will download {len(all_items)} images and embed them into {OUTPUT_HTML}.")
    confirm = input("Make a backup of your original HTML (recommended). Proceed? (y/n): ")
    if confirm.lower() != "y":
        print("Aborted.")
        return

    # read HTML
    with open(INPUT_HTML, "r", encoding="utf-8") as f:
        html = f.read()

    # Find all occurrences of the dish <img class="photo" src="..."> in the HTML
    # We will replace them sequentially with downloaded Base64 data URIs.
    pattern = re.compile(r'(<img\b[^>]*class=["\'][^"\']*photo[^"\']*["\'][^>]*src=["\'])([^"\']*)(["\'][^>]*>)', flags=re.IGNORECASE)
    matches = list(pattern.finditer(html))
    print(f"Found {len(matches)} <img class=\"photo\"> placeholders in HTML.")

    if len(matches) < len(all_items):
        print("Warning: placeholder count is less than the number of dish images. Script will replace placeholders in order and stop when placeholders are exhausted.")

    replacements = []
    for idx, name in enumerate(all_items):
        if idx >= len(matches):
            print("No more placeholders found — stopping image downloads.")
            break
        filename = os.path.join(TMP_DIR, f"img_{idx:02d}.jpg")
        ok = download_image(name, filename)
        if not ok:
            print(f"Failed to download image for '{name}', skipping.")
            replacements.append(None)
            continue
        print(f"Converting {filename} -> base64 (quality={QUALITY})")
        datauri = convert_to_jpeg_base64(filename)
        replacements.append(datauri)
        # slight pause to be polite
        time.sleep(0.5)

    # Replace placeholders sequentially
    new_html = html
    for i, m in enumerate(matches):
        if i < len(replacements) and replacements[i]:
            start, mid, end = m.group(1), m.group(2), m.group(3)
            old = start + mid + end
            new = start + replacements[i] + end
            new_html = new_html.replace(old, new, 1)
            print(f"Replaced placeholder {i+1} with image for '{all_items[i]}'")
        else:
            print(f"Skipped replacement {i+1} (no image).")

    # write output file
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(new_html)

    print("Done. Output written to:", OUTPUT_HTML)
    print("TMP images are in:", TMP_DIR)
    print("Open the new HTML file in your browser — it should display real photos (online -> downloaded -> embedded).")

if __name__ == "__main__":
    main()
