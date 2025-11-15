#!/usr/bin/env python3
"""
Gera áudios pré-gravados usando Google Cloud Text-to-Speech (GRATUITO)
Para uso no jogo O Guardião do Sono
"""

from gtts import gTTS
import time
import os

# Todas as narrações do jogo
NARRATIONS = {
    "phase1_1": {
        "text": "Cada luz que se apaga no horizonte é um pensamento que se despede. Você não precisa fazer nada. Só deixar que o silêncio volte a morar em você.",
        "filename": "fase1_introducao.mp3"
    },
    "phase1_2": {
        "text": "Observe as cores se transformando. Cada respiração escurece o cenário. O dia já passou. Agora é hora de descansar.",
        "filename": "fase1_meio.mp3"
    },
    "phase2_1": {
        "text": "Essas bolhas são partes do seu dia. Toque, e veja-as subirem... libertas. A mente aprende que soltar é dormir.",
        "filename": "fase2_introducao.mp3"
    },
    "phase2_2": {
        "text": "Cada bolha que sobe leva consigo uma preocupação. Você está seguro aqui, no fundo tranquilo. Nada pode perturbá-lo.",
        "filename": "fase2_meio.mp3"
    },
    "phase2_3": {
        "text": "Sinta a leveza da água sustentando você. Não há peso. Não há pressa. Apenas a suave corrente do descanso.",
        "filename": "fase2_final.mp3"
    },
    "phase3_1": {
        "text": "Sou o reflexo do seu próprio descanso. Enquanto você dorme, eu permaneço desperto. Tudo está bem. Tudo pode parar.",
        "filename": "fase3_introducao.mp3"
    },
    "phase3_2": {
        "text": "Não há nada a fazer. Não há nada a controlar. Seu corpo descansa. Sua mente se cura. Eu cuido de tudo enquanto você se entrega ao sono.",
        "filename": "fase3_meio.mp3"
    },
    "phase3_3": {
        "text": "Agora, feche seus olhos internos. Deixe a escuridão abraçá-lo. Você está seguro. Você está em paz. Durma.",
        "filename": "fase3_final.mp3"
    },
}


def generate_audio(text, filename):
    """Gera áudio usando Google Text-to-Speech (gTTS - GRATUITO)"""
    
    print(f"🎤 Gerando: {filename}")
    print(f"   Texto: {text[:50]}...")
    
    try:
        # Criar áudio com gTTS (português do Brasil)
        tts = gTTS(text=text, lang='pt-br', slow=True)  # slow=True para voz mais calma
        
        # Salvar arquivo MP3
        output_path = f"audio/narrations/{filename}"
        tts.save(output_path)
        
        file_size = os.path.getsize(output_path) / 1024  # KB
        print(f"   ✅ Salvo: {output_path} ({file_size:.2f} KB)")
        return True
            
    except Exception as e:
        print(f"   ❌ Exceção: {e}")
        return False


def main():
    print("=" * 60)
    print("🌙 GERANDO ÁUDIOS - O GUARDIÃO DO SONO")
    print("=" * 60)
    print(f"Voz: Google Text-to-Speech (PT-BR)")
    print(f"Velocidade: Lenta (terapêutica)")
    print(f"Total de narrações: {len(NARRATIONS)}")
    print("=" * 60)
    print()
    
    success_count = 0
    
    for key, narration in NARRATIONS.items():
        text = narration["text"]
        filename = narration["filename"]
        
        if generate_audio(text, filename):
            success_count += 1
        
        # Pausa para não sobrecarregar API
        time.sleep(1)
        print()
    
    print("=" * 60)
    print(f"✅ Concluído: {success_count}/{len(NARRATIONS)} áudios gerados")
    print("=" * 60)
    
    if success_count == len(NARRATIONS):
        print("🎉 Todos os áudios foram gerados com sucesso!")
    else:
        print(f"⚠️ {len(NARRATIONS) - success_count} áudios falharam")


if __name__ == "__main__":
    main()
