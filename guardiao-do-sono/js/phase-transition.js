/**
 * Sistema de Transição entre Fases
 * Gerencia a mudança suave entre as três fases do jogo
 */

class PhaseTransition {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        
        this.isTransitioning = false;
        this.transitionProgress = 0;
        this.transitionDuration = 5; // 5 segundos de transição
        this.fadeOverlay = null;
        
        this.createFadeOverlay();
    }

    /**
     * Cria overlay para fade
     */
    createFadeOverlay() {
        this.fadeOverlay = document.createElement('div');
        this.fadeOverlay.id = 'phase-transition-overlay';
        this.fadeOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0;
            pointer-events: none;
            z-index: 50;
            transition: opacity 3s ease;
        `;
        document.body.appendChild(this.fadeOverlay);
    }

    /**
     * Inicia transição entre fases
     */
    async startTransition(fromPhase, toPhase, audioSystem, binauralBeats) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.transitionProgress = 0;

        // Atualizar indicador de fase
        this.updatePhaseIndicator(toPhase);

        // Fade out visual
        await this.fadeOut();

        // Limpar fase anterior
        if (fromPhase) {
            fromPhase.cleanup();
        }

        // Pequena pausa no escuro
        await this.wait(2000);

        // Inicializar e preparar nova fase
        if (toPhase) {
            toPhase.initialize();
        }

        // Fade in visual
        await this.fadeIn();

        // Iniciar nova fase
        if (toPhase) {
            toPhase.start();
        }

        this.isTransitioning = false;
    }

    /**
     * Fade out para preto
     */
    fadeOut() {
        return new Promise((resolve) => {
            if (this.fadeOverlay) {
                this.fadeOverlay.style.opacity = '1';
                setTimeout(resolve, 3000);
            } else {
                resolve();
            }
        });
    }

    /**
     * Fade in do preto
     */
    fadeIn() {
        return new Promise((resolve) => {
            if (this.fadeOverlay) {
                setTimeout(() => {
                    this.fadeOverlay.style.opacity = '0';
                    setTimeout(resolve, 3000);
                }, 500);
            } else {
                resolve();
            }
        });
    }

    /**
     * Aguarda um tempo
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Atualiza indicador de fase no HUD
     */
    updatePhaseIndicator(phase) {
        const indicator = document.getElementById('phase-indicator');
        if (!indicator) return;

        let text = '';
        
        if (phase instanceof Phase1Sunset) {
            text = 'Fase 1: Transição';
        } else if (phase instanceof Phase2Underwater) {
            text = 'Fase 2: Imersão';
        } else if (phase instanceof Phase3Guardian) {
            text = 'Fase 3: Dissolução';
        }

        indicator.textContent = text;
        indicator.classList.add('visible');

        // Esconder após 5 segundos
        setTimeout(() => {
            indicator.classList.remove('visible');
        }, 5000);
    }

    /**
     * Transição rápida (para reiniciar)
     */
    async quickReset(phases) {
        this.fadeOverlay.style.opacity = '1';
        
        await this.wait(1000);
        
        // Limpar todas as fases
        phases.forEach(phase => {
            if (phase) phase.cleanup();
        });
        
        await this.wait(500);
        
        this.fadeOverlay.style.opacity = '0';
    }
}

// Exportar
window.PhaseTransition = PhaseTransition;
