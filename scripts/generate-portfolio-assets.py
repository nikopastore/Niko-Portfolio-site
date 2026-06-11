from __future__ import annotations

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def font(size: int, bold: bool = False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Helvetica.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def gradient(size, top, bottom):
    w, h = size
    img = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        draw.line((0, y, w, y), fill=(r, g, b))
    return img


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_phone_status(draw: ImageDraw.ImageDraw, w: int, dark: bool = False):
    color = (255, 250, 242) if dark else (80, 55, 35)
    draw.text((70, 52), "9:41", font=font(28, True), fill=color)
    # Dynamic island
    draw.rounded_rectangle((w // 2 - 82, 44, w // 2 + 82, 78), radius=18, fill=(24, 20, 18) if not dark else (8, 8, 10))
    # Battery/signal hints
    draw.rounded_rectangle((w - 145, 54, w - 86, 78), radius=8, outline=color, width=3)
    draw.rectangle((w - 82, 62, w - 76, 70), fill=color)
    draw.rectangle((w - 224, 68, w - 214, 78), fill=color)
    draw.rectangle((w - 208, 60, w - 198, 78), fill=color)
    draw.rectangle((w - 192, 52, w - 182, 78), fill=color)


def parchment_screen(title: str, subtitle: str, panel: str, accent=(147, 92, 45), variant=0):
    W, H = 1206, 2622
    img = gradient((W, H), (255, 248, 235), (238, 217, 184))
    # subtle paper fibers
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(360):
        y = (i * 73) % H
        x = (i * 191) % W
        od.line((x, y, min(W, x + 260), y + 18), fill=(135, 99, 62, 14), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(img)
    draw_phone_status(d, W)

    d.text((72, 145), "Parchment", font=font(58, True), fill=(69, 45, 27))
    d.text((72, 220), title, font=font(36, True), fill=(96, 61, 35))
    d.text((72, 270), subtitle, font=font(27), fill=(132, 94, 62))

    if variant == 0:
        rounded(d, (72, 365, W - 72, 1125), 52, (255, 253, 246), (199, 159, 108), 3)
        d.text((120, 420), "Today", font=font(32, True), fill=(73, 50, 31))
        entries = [
            ("Morning clarity", "Voice note • 2 min", "I woke up with a clean plan: finish the portfolio visuals, then send applications."),
            ("Idea capture", "Handwriting OCR", "Doc scanner flow could become a reusable mobile component."),
            ("Evening reflection", "AI summary", "Less context switching. More shipping."),
        ]
        y = 500
        for heading, meta, body in entries:
            rounded(d, (120, y, W - 120, y + 155), 28, (247, 235, 215), None)
            d.text((152, y + 24), heading, font=font(30, True), fill=(76, 49, 30))
            d.text((152, y + 66), meta, font=font(22), fill=accent)
            d.text((152, y + 101), body, font=font(20), fill=(112, 82, 54))
            y += 190
        # compose button
        rounded(d, (790, H - 360, W - 82, H - 244), 58, accent, None)
        d.text((850, H - 323), "+ New Entry", font=font(30, True), fill=(255, 250, 240))
    elif variant == 1:
        cx, cy = W // 2, 790
        for r, alpha in [(315, 36), (245, 56), (175, 86)]:
            d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=accent + (alpha,) if len(accent) == 4 else accent, width=6)
        d.ellipse((cx - 112, cy - 112, cx + 112, cy + 112), fill=accent)
        d.rectangle((cx - 30, cy - 140, cx + 30, cy + 70), fill=(255, 246, 230))
        d.rounded_rectangle((cx - 82, cy + 30, cx + 82, cy + 92), radius=31, fill=(255, 246, 230))
        rounded(d, (110, 1270, W - 110, 1815), 46, (255, 253, 246), (205, 166, 113), 3)
        d.text((155, 1326), "Live transcript", font=font(34, True), fill=(69, 45, 27))
        lines = ["I want the site to feel premium,", "not like a template. Each card should", "show a real product decision, not filler."]
        y = 1405
        for line in lines:
            d.text((155, y), line, font=font(36), fill=(96, 61, 35))
            y += 62
        rounded(d, (180, 1925, W - 180, 2048), 61, accent, None)
        d.text((345, 1962), "Save as Journal Entry", font=font(34, True), fill=(255, 250, 240))
    elif variant == 2:
        # paper scan card
        rounded(d, (142, 395, W - 142, 1505), 34, (255, 253, 247), (202, 165, 115), 4)
        for y in range(520, 1360, 115):
            d.line((230, y, W - 235, y), fill=(196, 153, 100), width=4)
        d.text((235, 450), "handwritten note", font=font(32), fill=(160, 104, 61))
        # crop corners
        c = accent
        for x1, y1, sx, sy in [(142, 395, 1, 1), (W - 142, 395, -1, 1), (142, 1505, 1, -1), (W - 142, 1505, -1, -1)]:
            d.line((x1, y1, x1 + sx * 95, y1), fill=c, width=10)
            d.line((x1, y1, x1, y1 + sy * 95), fill=c, width=10)
        rounded(d, (110, 1630, W - 110, 2040), 46, (255, 253, 246), None)
        d.text((155, 1685), "OCR preview", font=font(34, True), fill=(69, 45, 27))
        d.text((155, 1755), "Turn rough notes into clean, searchable entries.", font=font(32), fill=(96, 61, 35))
        d.text((155, 1818), "Tags: portfolio, shipping, applications", font=font(26), fill=accent)
    else:
        rounded(d, (84, 390, W - 84, 850), 46, (255, 253, 246), None)
        d.text((132, 450), "AI reflection", font=font(38, True), fill=(69, 45, 27))
        d.text((132, 530), "You keep returning to the same theme:", font=font(30), fill=(105, 75, 47))
        d.text((132, 590), "make the work visible.", font=font(48, True), fill=accent)
        metrics = [("Mood", "Focused"), ("Streak", "12 days"), ("Words", "642")]
        x = 84
        for label, val in metrics:
            rounded(d, (x, 980, x + 315, 1165), 38, (255, 253, 246), None)
            d.text((x + 40, 1028), label, font=font(24), fill=(132, 94, 62))
            d.text((x + 40, 1078), val, font=font(36, True), fill=(69, 45, 27))
            x += 360
        rounded(d, (84, 1300, W - 84, 1895), 46, (255, 253, 246), None)
        d.text((132, 1358), "Suggested tags", font=font(34, True), fill=(69, 45, 27))
        tags = ["job search", "portfolio", "AI products", "discipline", "ideas"]
        x, y = 132, 1445
        for tag in tags:
            tw = int(d.textlength(tag, font=font(28))) + 56
            rounded(d, (x, y, x + tw, y + 76), 38, (248, 232, 204), (218, 176, 120), 2)
            d.text((x + 28, y + 22), tag, font=font(28), fill=(91, 60, 36))
            x += tw + 20
            if x > W - 300:
                x, y = 132, y + 100
    return img


def draw_mealswipe_icon():
    S = 1024
    img = gradient((S, S), (22, 176, 123), (255, 238, 188)).convert("RGBA")
    d = ImageDraw.Draw(img)
    # white rounded card
    d.rounded_rectangle((178, 178, 846, 846), radius=150, fill=(255, 255, 250, 235))
    # plate
    d.ellipse((312, 322, 712, 722), outline=(18, 142, 102), width=38)
    d.ellipse((414, 424, 610, 620), outline=(18, 142, 102), width=18)
    # swipe arrow
    d.arc((270, 230, 760, 790), start=218, end=318, fill=(245, 111, 66), width=44)
    # arrowhead
    d.polygon([(730, 380), (842, 365), (778, 462)], fill=(245, 111, 66))
    # fork
    d.rounded_rectangle((250, 302, 274, 694), radius=12, fill=(21, 84, 70))
    for x in [218, 244, 270, 296]:
        d.rounded_rectangle((x, 270, x + 16, 365), radius=8, fill=(21, 84, 70))
    # knife
    d.rounded_rectangle((760, 290, 784, 706), radius=12, fill=(21, 84, 70))
    d.polygon([(760, 290), (842, 392), (784, 448)], fill=(21, 84, 70))
    return img.convert("RGB")


def docpilot_screen(title: str, subtitle: str, variant: int):
    W, H = 1206, 2622
    img = gradient((W, H), (8, 40, 28), (3, 17, 13))
    d = ImageDraw.Draw(img)
    draw_phone_status(d, W, dark=True)
    d.text((74, 152), "DocPilot", font=font(58, True), fill=(238, 255, 244))
    d.text((74, 225), title, font=font(34, True), fill=(157, 229, 183))
    d.text((74, 274), subtitle, font=font(26), fill=(151, 184, 160))
    if variant == 0:
        rounded(d, (90, 420, W - 90, 1590), 54, (17, 71, 48), (93, 176, 123), 4)
        # scanned document
        rounded(d, (205, 555, W - 205, 1390), 32, (246, 249, 239), None)
        d.text((255, 625), "INVOICE", font=font(44, True), fill=(20, 55, 40))
        for i in range(7):
            y = 735 + i * 74
            d.rounded_rectangle((255, y, W - 255 - (i % 3) * 90, y + 22), radius=11, fill=(99, 131, 109))
        for x1, y1, sx, sy in [(162, 505, 1, 1), (W - 162, 505, -1, 1), (162, 1445, 1, -1), (W - 162, 1445, -1, -1)]:
            d.line((x1, y1, x1 + sx * 130, y1), fill=(114, 238, 159), width=12)
            d.line((x1, y1, x1, y1 + sy * 130), fill=(114, 238, 159), width=12)
        rounded(d, (130, 1775, W - 130, 1940), 50, (238, 255, 244), None)
        d.text((270, 1822), "Auto-detected: Invoice", font=font(35, True), fill=(16, 52, 36))
    elif variant == 1:
        rounded(d, (92, 435, W - 92, 1010), 46, (241, 250, 244), None)
        d.text((145, 495), "Extracted fields", font=font(38, True), fill=(16, 52, 36))
        fields = [("Vendor", "Northstar Supply"), ("Total", "$1,284.30"), ("Due", "Jan 31"), ("PO", "RW-20419")]
        y = 590
        for k, v in fields:
            d.text((145, y), k, font=font(26), fill=(81, 114, 93))
            d.text((420, y), v, font=font(30, True), fill=(16, 52, 36))
            y += 88
        rounded(d, (92, 1125, W - 92, 1840), 46, (14, 55, 39), (83, 155, 112), 3)
        d.text((145, 1182), "Markdown export", font=font(34, True), fill=(232, 255, 238))
        code = ["# Invoice Summary", "- Vendor: Northstar Supply", "- Total: $1,284.30", "- Status: Ready for approval"]
        y = 1270
        for line in code:
            d.text((145, y), line, font=font(30), fill=(157, 229, 183))
            y += 76
    else:
        rounded(d, (135, 500, W - 135, 1385), 60, (16, 64, 44), (101, 216, 146), 4)
        # app mark
        cx, cy = W // 2, 790
        d.rounded_rectangle((cx - 155, cy - 205, cx + 155, cy + 205), radius=26, outline=(185, 255, 207), width=11)
        d.line((cx - 100, cy - 70, cx + 100, cy - 70), fill=(185, 255, 207), width=10)
        d.line((cx - 100, cy + 10, cx + 100, cy + 10), fill=(185, 255, 207), width=10)
        d.line((cx - 100, cy + 90, cx + 60, cy + 90), fill=(185, 255, 207), width=10)
        d.text((W // 2 - 112, 1115), "DocPilot", font=font(46, True), fill=(238, 255, 244))
        d.text((W // 2 - 154, 1180), "Document intelligence", font=font(28), fill=(157, 229, 183))
        rounded(d, (148, 1620, W - 148, 1815), 55, (238, 255, 244), None)
        d.text((315, 1680), "Scan another document", font=font(34, True), fill=(16, 52, 36))
    return img


def main():
    parchment_dir = PUBLIC / "apps" / "parchment"
    parchment_dir.mkdir(parents=True, exist_ok=True)
    parchment_assets = [
        ("01_home.png", "AI journal", "Voice, handwriting, and reflective prompts in one quiet place.", "Entries", 0),
        ("02_voice.png", "Voice capture", "Dictate messy thoughts. Parchment turns them into clean entries.", "Voice", 1),
        ("03_ocr.png", "Handwriting OCR", "Scan notebook pages and make them searchable.", "OCR", 2),
        ("04_reflection.png", "Personal insights", "AI summaries reveal themes, tags, and streaks.", "Reflect", 3),
    ]
    for filename, title, subtitle, _panel, variant in parchment_assets:
        parchment_screen(title, subtitle, _panel, variant=variant).save(parchment_dir / filename)

    # MealSwipe icon was too placeholder-looking; replace with a branded app mark.
    draw_mealswipe_icon().save(PUBLIC / "apps" / "mealswipe" / "icon.png")

    # Replace sparse/duplicative DocPilot screenshots with clearer product-state mockups.
    docpilot_dir = PUBLIC / "apps" / "docpilot"
    docpilot_assets = [
        ("01.png", "Scan anything", "Live edge detection for receipts, invoices, contracts.", 0),
        ("02.png", "Extract structure", "Clean fields + markdown without manual cleanup.", 1),
        ("03.png", "Ready to export", "Save as PDF, markdown, or structured JSON.", 2),
    ]
    for filename, title, subtitle, variant in docpilot_assets:
        docpilot_screen(title, subtitle, variant).save(docpilot_dir / filename)

    print("Generated portfolio QA asset fixes: Parchment screenshots, DocPilot screenshots, MealSwipe icon")


if __name__ == "__main__":
    main()
