#!/usr/bin/env python3
"""Bake a repeating Icy watermark onto the two AI workflow diagrams."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MARK = "Icy"
SOURCE = ROOT / "assets/ai/source"
OUTPUT = ROOT / "assets/ai"

FILES = [
    "yuqing-map.png",
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size)


def make_tile(text: str, font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int]) -> Image.Image:
    dummy = Image.new("RGBA", (8, 8), (0, 0, 0, 0))
    box = ImageDraw.Draw(dummy).textbbox((0, 0), text, font=font)
    tw, th = box[2] - box[0], box[3] - box[1]
    pad_x, pad_y = max(24, tw), max(18, th)
    tile = Image.new("RGBA", (tw + pad_x * 2, th + pad_y * 2), (0, 0, 0, 0))
    ImageDraw.Draw(tile).text((pad_x, pad_y), text, font=font, fill=fill)
    return tile.rotate(28, expand=True, resample=Image.Resampling.BICUBIC)


def add_watermark(path: Path) -> None:
    base = Image.open(path).convert("RGBA")
    width, height = base.size
    shortest = min(width, height)

    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    tile_font = load_font(max(16, int(shortest * 0.048)))
    tile = make_tile(MARK, tile_font, (126, 184, 204, 58))
    step_x = max(1, int(tile.width * 0.72))
    step_y = max(1, int(tile.height * 0.72))

    row = 0
    y = -tile.height
    while y < height + tile.height:
        x = -tile.width + (step_x // 2 if row % 2 else 0)
        while x < width + tile.width:
            overlay.alpha_composite(tile, (x, y))
            x += step_x
        y += step_y
        row += 1

    draw = ImageDraw.Draw(overlay)
    corner_font = load_font(max(13, int(shortest * 0.038)))
    label = "Icy"
    box = draw.textbbox((0, 0), label, font=corner_font)
    tw, th = box[2] - box[0], box[3] - box[1]
    pad = max(8, int(shortest * 0.018))
    x = width - tw - pad * 2
    y = height - th - pad * 2
    draw.rounded_rectangle(
        (x - pad, y - pad // 2, width - pad // 2, height - pad // 2),
        radius=max(8, pad),
        fill=(255, 255, 255, 150),
    )
    draw.text(
        (x, y),
        label,
        font=corner_font,
        fill=(110, 168, 186, 210),
        stroke_width=1,
        stroke_fill=(255, 255, 255, 180),
    )

    out = Image.alpha_composite(base, overlay).convert("RGB")
    out.save(path, format="PNG", optimize=True)
    print(f"watermarked {path.relative_to(ROOT)} ({width}x{height})")


if __name__ == "__main__":
    for name in FILES:
        src = SOURCE / name
        dest = OUTPUT / name
        dest.write_bytes(src.read_bytes())
        add_watermark(dest)
