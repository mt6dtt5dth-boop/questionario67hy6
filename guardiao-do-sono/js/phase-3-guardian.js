/**
 * FASE 3: DISSOLUÇÃO - "O Guardião do Sono"
 * Figura de luz translúcida e transição final para o sono
 * Duração: 3 minutos (180 segundos)
 * Frequência: 2 Hz (Delta)
 */

class Phase3Guardian {
    constructor(scene, camera, audioSystem, binauralBeats, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.audioSystem = audioSystem;
        this.binauralBeats = binauralBeats;
        this.renderer = renderer;
        
        this.duration = 180; // 3 minutos
        this.elapsed = 0;
        this.isActive = false;
        
        // Elementos da cena
        this.guardian = null;
        this.guardianLight = null;
        this.aura = null;
        this.stars = [];
        this.lights = [];
    }

    /**
     * Inicializa a cena da Fase 3
     */
    initialize() {
        // Criar o guardião
        this.createGuardian();
        
        // Criar aura ao redor do guardião
        this.createAura();
        
        // Criar estrelas/partículas de fundo
        this.createStars();
        
        // Iluminação minimalista
        this.createLighting();
        
        // Posicionar câmera
        this.camera.position.set(0, 0, 15);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * Cria o guardião (forma abstrata de luz)
     */
    createGuardian() {
        // Geometria abstrata - forma alongada vertical
        const geometry = new THREE.CylinderGeometry(0.5, 1, 5, 32);
        
        // Material translúcido com shader personalizado
        const material = new THREE.MeshPhongMaterial({
            color: 0x9370DB,  // Violeta médio
            emissive: 0x9370DB,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.4,
            shininess: 100,
            side: THREE.DoubleSide
        });
        
        this.guardian = new THREE.Mesh(geometry, material);
        this.guardian.position.set(0, 0, 0);
        
        // Adicionar "cabeça" - esfera superior
        const headGeometry = new THREE.SphereGeometry(1, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0xE6E6FA,  // Lavanda claro
            emissive: 0xE6E6FA,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        });
        
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 3;
        this.guardian.add(head);
        
        this.scene.add(this.guardian);
        
        // Luz do guardião
        this.guardianLight = new THREE.PointLight(0x9370DB, 2, 20);
        this.guardianLight.position.copy(this.guardian.position);
        this.scene.add(this.guardianLight);
    }

    /**
     * Cria aura pulsante ao redor do guardião
     */
    createAura() {
        const auraGeometry = new THREE.SphereGeometry(4, 32, 32);
        const auraMaterial = new THREE.MeshBasicMaterial({
            color: 0x9370DB,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        
        this.aura = new THREE.Mesh(auraGeometry, auraMaterial);
        this.aura.position.copy(this.guardian.position);
        this.scene.add(this.aura);
    }

    /**
     * Cria estrelas de fundo
     */
    createStars() {
        const starCount = 300;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        for (let i = 0; i < starCount; i++) {
            // Distribuição esférica
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 50 + Math.random() * 50;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions.push(x, y, z);

            // Cores violeta → branco
            const color = new THREE.Color();
            color.setHSL(0.75 + Math.random() * 0.1, 0.5, 0.7 + Math.random() * 0.3);
            colors.push(color.r, color.g, color.b);
            
            sizes.push(0.5 + Math.random() * 1.5);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
        this.stars.push(stars);
    }

    /**
     * Cria iluminação
     */
    createLighting() {
        // Luz ambiente muito suave
        const ambientLight = new THREE.AmbientLight(0x4B0082, 0.2);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        // Cor de fundo escura
        this.renderer.setClearColor(0x0a0a1a);
    }

    /**
     * Inicia a fase
     */
    start() {
        this.isActive = true;
        this.elapsed = 0;

        // Transição para frequência Delta (2 Hz)
        this.binauralBeats.transitionTo(2, 15);

        // Parar sons de água, manter apenas binaural
        this.audioSystem.stopAllAmbient();

        // Narração 1 - Logo após iniciar (5 segundos)
        setTimeout(() => {
            this.audioSystem.narrate('phase3_1'); // ✅ USA A CHAVE!
        }, 5000);

        // Narração 2 - No meio da fase (1 minuto)
        setTimeout(() => {
            this.audioSystem.narrate('phase3_2'); // ✅ USA A CHAVE!
        }, 60000);

        // Narração 3 - Perto do final (2 minutos)
        setTimeout(() => {
            this.audioSystem.narrate('phase3_3'); // ✅ USA A CHAVE!
        }, 120000);

        // Fade out final - Após 2:30
        setTimeout(() => {
            this.startFinalFadeOut();
        }, 150000);
    }

    /**
     * Inicia o fade out final
     */
    startFinalFadeOut() {
        // Mensagem visual opcional
        const narrationText = document.getElementById('narration-text');
        if (narrationText) {
            narrationText.textContent = "Boa noite...";
            narrationText.classList.add('visible');
            
            // Remover após 3 segundos
            setTimeout(() => {
                narrationText.classList.remove('visible');
            }, 3000);
        }
    }

    /**
     * Atualiza a fase
     */
    update(deltaTime) {
        if (!this.isActive) return;

        this.elapsed += deltaTime;
        const progress = Math.min(this.elapsed / this.duration, 1);

        // Animar guardião (flutuação lenta e respiração)
        this.updateGuardian(deltaTime);

        // Animar aura (pulso lento)
        this.updateAura(deltaTime);

        // Animar estrelas
        this.updateStars(deltaTime);

        // Fade out gradual de tudo
        this.updateFadeOut(progress);

        // Movimentação mínima da câmera
        this.updateCamera(deltaTime);

        // Verificar conclusão
        if (progress >= 1) {
            this.complete();
        }
    }

    /**
     * Atualiza o guardião
     */
    updateGuardian(deltaTime) {
        if (!this.guardian) return;

        // Flutuação vertical suave
        this.guardian.position.y = Math.sin(this.elapsed * 0.3) * 0.5;
        
        // Rotação muito lenta
        this.guardian.rotation.y += deltaTime * 0.1;
        
        // "Respiração" - escala sutil
        const breathScale = 1 + Math.sin(this.elapsed * 0.4) * 0.05;
        this.guardian.scale.set(breathScale, 1, breathScale);
        
        // Atualizar luz
        if (this.guardianLight) {
            this.guardianLight.position.copy(this.guardian.position);
            // Pulso de intensidade
            this.guardianLight.intensity = 1.5 + Math.sin(this.elapsed * 0.5) * 0.5;
        }
    }

    /**
     * Atualiza a aura
     */
    updateAura(deltaTime) {
        if (!this.aura) return;

        // Pulso de escala
        const auraPulse = 1 + Math.sin(this.elapsed * 0.3) * 0.15;
        this.aura.scale.set(auraPulse, auraPulse, auraPulse);
        
        // Rotação oposta ao guardião
        this.aura.rotation.y -= deltaTime * 0.05;
        
        // Pulso de opacidade
        this.aura.material.opacity = 0.05 + Math.sin(this.elapsed * 0.4) * 0.05;
    }

    /**
     * Atualiza estrelas
     */
    updateStars(deltaTime) {
        this.stars.forEach(starSystem => {
            // Rotação muito lenta
            starSystem.rotation.y += deltaTime * 0.02;
            starSystem.rotation.x += deltaTime * 0.01;
        });
    }

    /**
     * Atualiza fade out
     */
    updateFadeOut(progress) {
        // Começar fade out aos 80% da duração
        if (progress > 0.8) {
            const fadeProgress = (progress - 0.8) / 0.2;
            
            // Reduzir opacidade do guardião
            if (this.guardian) {
                this.guardian.material.opacity = 0.4 * (1 - fadeProgress);
                this.guardian.children[0].material.opacity = 0.6 * (1 - fadeProgress);
            }
            
            // Reduzir aura
            if (this.aura) {
                this.aura.material.opacity = 0.1 * (1 - fadeProgress);
            }
            
            // Reduzir estrelas
            this.stars.forEach(s => {
                s.material.opacity = 0.8 * (1 - fadeProgress);
            });
            
            // Reduzir luz
            if (this.guardianLight) {
                this.guardianLight.intensity = 2 * (1 - fadeProgress);
            }
            
            // Escurecer fundo
            const startColor = new THREE.Color(0x0a0a1a);
            const endColor = new THREE.Color(0x000000);
            const currentColor = new THREE.Color().lerpColors(startColor, endColor, fadeProgress);
            this.renderer.setClearColor(currentColor);
        }
    }

    /**
     * Atualiza câmera
     */
    updateCamera(deltaTime) {
        // Movimento mínimo, quase imperceptível
        this.camera.position.y = Math.sin(this.elapsed * 0.1) * 0.2;
        this.camera.position.x = Math.cos(this.elapsed * 0.08) * 0.15;
    }

    /**
     * Completa a fase
     */
    complete() {
        this.isActive = false;
        
        if (this.onComplete) {
            this.onComplete();
        }
    }

    /**
     * Limpa a cena
     */
    cleanup() {
        this.isActive = false;
        
        if (this.guardian) this.scene.remove(this.guardian);
        if (this.aura) this.scene.remove(this.aura);
        if (this.guardianLight) this.scene.remove(this.guardianLight);
        
        this.stars.forEach(s => this.scene.remove(s));
        this.lights.forEach(l => this.scene.remove(l));
        
        this.stars = [];
        this.lights = [];
    }
}

// Exportar
window.Phase3Guardian = Phase3Guardian;
