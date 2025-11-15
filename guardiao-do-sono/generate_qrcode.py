#!/usr/bin/env python3
"""
Gera QR Code para O Guardião do Sono
"""

import qrcode
from PIL import Image, ImageDraw, ImageFont

# URL do jogo
URL = "https://raw.githack.com/mt6dtt5dth-boop/questionario67hy6/main/guardiao-do-sono/index.html"

# Criar QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(URL)
qr.make(fit=True)

# Criar imagem do QR Code
img = qr.make_image(fill_color="#1a1a2e", back_color="white")
img = img.convert("RGB")

# Aumentar tamanho para adicionar texto
width, height = img.size
new_height = height + 120
new_img = Image.new('RGB', (width, new_height), 'white')
new_img.paste(img, (0, 60))

# Adicionar texto
draw = ImageDraw.Draw(new_img)

# Tentar usar fonte padrão
try:
    font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
    font_subtitle = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
except:
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()

# Texto superior
title = "🌙 O Guardião do Sono"
draw.text((width//2, 30), title, fill="#1a1a2e", font=font_title, anchor="mm")

# Texto inferior
subtitle = "Escaneie para acessar"
draw.text((width//2, height + 90), subtitle, fill="#555", font=font_subtitle, anchor="mm")

# Salvar
output_path = "qrcode-guardiao-sono.png"
new_img.save(output_path, quality=95)
print(f"✅ QR Code criado: {output_path}")
print(f"📱 URL: {URL}")
print(f"📐 Tamanho: {new_img.size}")
