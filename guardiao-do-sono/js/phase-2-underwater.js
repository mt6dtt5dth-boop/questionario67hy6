/**
 * FASE 2: IMERSÃO - "O Jardim Submerso"
 * Ambiente aquático onírico com bolhas interativas
 * Duração: 4 minutos (240 segundos)
 * Frequência: 4 Hz (Teta)
 */

class Phase2Underwater {
    constructor(scene, camera, audioSystem, binauralBeats, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.audioSystem = audioSystem;
        this.binauralBeats = binauralBeats;
        this.renderer = renderer;
        
        this.duration = 240; // 4 minutos
        this.elapsed = 0;
        this.isActive = false;
        
        // Elementos da cena
        this.water = null;
        this.bubbles = [];
        this.plants = [];
        this.lights = [];
        this.particleSystem = null;
        
        // Sistema de interação
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.touchSupported = 'ontouchstart' in window;
        this.interactionEnabled = false;
    }

    /**
     * Inicializa a cena da Fase 2
     */
    initialize() {
        // Criar ambiente aquático
        this.createWaterAmbient();
        
        // Criar bolhas interativas
        this.createBubbles();
        
        // Criar plantas flutuantes
        this.createPlants();
        
        // Criar partículas de luz subaquática
        this.createUnderwaterParticles();
        
        // Iluminação subaquática
        this.createLighting();
        
        // Posicionar câmera
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * Cria o ambiente aquático (névoa e cor)
     */
    createWaterAmbient() {
        // Fog para simular água
        this.scene.fog = new THREE.FogExp2(0x1a4d5c, 0.05);
        
        // Background color
        this.renderer.setClearColor(0x1a4d5c);
        
        // Criar esfera de água ao redor
        const waterGeometry = new THREE.SphereGeometry(400, 32, 32);
        const waterMaterial = new THREE.MeshPhongMaterial({
            color: 0x2596be,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide,
            depthWrite: false
        });
        
        this.water = new THREE.Mesh(waterGeometry, waterMaterial);
        this.scene.add(this.water);
    }

    /**
     * Cria bolhas interativas
     */
    createBubbles() {
        const bubbleCount = 30;
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = this.createBubble(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 20
            );
            this.bubbles.push(bubble);
        }
    }

    /**
     * Cria uma bolha individual
     */
    createBubble(x, y, z) {
        const size = 0.3 + Math.random() * 0.5;
        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.4,
            emissive: 0x4682B4,
            emissiveIntensity: 0.3,
            shininess: 100
        });
        
        const bubble = new THREE.Mesh(geometry, material);
        bubble.position.set(x, y, z);
        
        // Dados para animação
        bubble.userData = {
            speed: 0.2 + Math.random() * 0.3,
            amplitude: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            initialY: y,
            active: true
        };
        
        this.scene.add(bubble);
        
        // Luz interna da bolha
        const bubbleLight = new THREE.PointLight(0x87CEEB, 0.5, 3);
        bubbleLight.position.copy(bubble.position);
        this.scene.add(bubbleLight);
        bubble.userData.light = bubbleLight;
        
        return bubble;
    }

    /**
     * Cria plantas flutuantes
     */
    createPlants() {
        const plantCount = 15;
        
        for (let i = 0; i < plantCount; i++) {
            const plant = this.createPlant(
                (Math.random() - 0.5) * 30,
                -10 + Math.random() * 5,
                (Math.random() - 0.5) * 30
            );
            this.plants.push(plant);
        }
    }

    /**
     * Cria uma planta individual
     */
    createPlant(x, y, z) {
        const height = 2 + Math.random() * 3;
        const segments = 8;
        
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(Math.random() - 0.5, height / 2, Math.random() - 0.5),
            new THREE.Vector3(Math.random() - 0.5, height, Math.random() - 0.5)
        );
        
        const tubeGeometry = new THREE.TubeGeometry(curve, segments, 0.1, 8, false);
        const material = new THREE.MeshPhongMaterial({
            color: 0x2E8B57,
            emissive: 0x006400,
            emissiveIntensity: 0.2,
            shininess: 30
        });
        
        const plant = new THREE.Mesh(tubeGeometry, material);
        plant.position.set(x, y, z);
        
        plant.userData = {
            swaySpeed: 0.5 + Math.random() * 0.5,
            swayAmount: 0.1 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2
        };
        
        this.scene.add(plant);
        return plant;
    }

    /**
     * Cria partículas de luz subaquática
     */
    createUnderwaterParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 50
            );

            // Cores azul-turquesa-branco
            const color = new THREE.Color();
            color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.6 + Math.random() * 0.3);
            colors.push(color.r, color.g, color.b);
            
            sizes.push(0.5 + Math.random() * 1.5);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    /**
     * Cria iluminação
     */
    createLighting() {
        // Luz ambiente azulada
        const ambientLight = new THREE.AmbientLight(0x4682B4, 0.4);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Luz direcional simulando luz do sol através da água
        const directionalLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);
    }

    /**
     * Inicia a fase
     */
    start() {
        this.isActive = true;
        this.elapsed = 0;

        // Transição para frequência Teta (4 Hz)
        this.binauralBeats.transitionTo(4, 10);

        // Iniciar som de água
        this.audioSystem.stopAllAmbient();
        this.audioSystem.startWater();
        
        // Ativar interação com bolhas
        this.enableInteraction();

        // Narração inicial (usando CHAVE)
        setTimeout(() => {
            this.audioSystem.narrate('phase2_1'); // ✅ USA A CHAVE!
        }, 3000);

        // Segunda narração (usando CHAVE)
        setTimeout(() => {
            this.audioSystem.narrate('phase2_2'); // ✅ USA A CHAVE!
        }, 80000); // 1:20

        // Terceira narração (usando CHAVE)
        setTimeout(() => {
            this.audioSystem.narrate('phase2_3'); // ✅ USA A CHAVE!
        }, 160000); // 2:40
    }

    /**
     * Atualiza a fase
     */
    update(deltaTime) {
        if (!this.isActive) return;

        this.elapsed += deltaTime;
        const progress = Math.min(this.elapsed / this.duration, 1);

        // Animar bolhas
        this.updateBubbles(deltaTime);

        // Animar plantas
        this.updatePlants(deltaTime);

        // Animar partículas
        this.updateParticles(deltaTime);

        // Movimentação lenta da câmera
        this.updateCamera(deltaTime);

        // Transição de cor para mais escuro
        this.updateAmbient(progress);

        // Verificar conclusão
        if (progress >= 1) {
            this.complete();
        }
    }

    /**
     * Atualiza bolhas
     */
    updateBubbles(deltaTime) {
        this.bubbles.forEach(bubble => {
            if (!bubble.userData.active) return;

            const data = bubble.userData;
            
            // Movimento para cima
            bubble.position.y += data.speed * deltaTime;
            
            // Movimento lateral sinusoidal
            bubble.position.x += Math.sin(this.elapsed + data.phase) * data.amplitude * deltaTime;
            bubble.position.z += Math.cos(this.elapsed + data.phase) * data.amplitude * deltaTime;
            
            // Rotação
            bubble.rotation.x += deltaTime * 0.5;
            bubble.rotation.y += deltaTime * 0.3;
            
            // Atualizar luz
            if (data.light) {
                data.light.position.copy(bubble.position);
            }
            
            // Reposicionar se subir muito
            if (bubble.position.y > 15) {
                bubble.position.y = -15;
                bubble.position.x = (Math.random() - 0.5) * 20;
                bubble.position.z = (Math.random() - 0.5) * 20;
            }
        });
    }

    /**
     * Atualiza plantas
     */
    updatePlants(deltaTime) {
        this.plants.forEach(plant => {
            const data = plant.userData;
            
            // Movimento de balanço
            plant.rotation.z = Math.sin(this.elapsed * data.swaySpeed + data.phase) * data.swayAmount;
            plant.rotation.x = Math.cos(this.elapsed * data.swaySpeed + data.phase) * data.swayAmount * 0.5;
        });
    }

    /**
     * Atualiza partículas
     */
    updateParticles(deltaTime) {
        if (!this.particleSystem) return;
        
        // Rotação lenta
        this.particleSystem.rotation.y += deltaTime * 0.02;
        
        // Animação de posições (efeito de corrente)
        const positions = this.particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(this.elapsed + i) * 0.01; // Y
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * Atualiza câmera (flutuação lenta)
     */
    updateCamera(deltaTime) {
        this.camera.position.y = Math.sin(this.elapsed * 0.1) * 0.5;
        this.camera.position.x = Math.cos(this.elapsed * 0.15) * 0.3;
    }

    /**
     * Atualiza ambiente (escurecendo)
     */
    updateAmbient(progress) {
        // Escurecer gradualmente
        const startColor = new THREE.Color(0x1a4d5c);
        const endColor = new THREE.Color(0x0d1f2d);
        const currentColor = new THREE.Color().lerpColors(startColor, endColor, progress);
        
        this.renderer.setClearColor(currentColor);
        if (this.scene.fog) {
            this.scene.fog.color = currentColor;
        }
    }

    /**
     * Ativa interação com bolhas
     */
    enableInteraction() {
        this.interactionEnabled = true;
        
        // Mouse events
        this.onMouseMove = (event) => this.handleMouseMove(event);
        this.onMouseClick = (event) => this.handleClick(event);
        
        // Touch events
        this.onTouchStart = (event) => this.handleTouch(event);
        this.onTouchMove = (event) => this.handleTouchMove(event);
        
        // Adicionar listeners
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('click', this.onMouseClick, false);
        window.addEventListener('touchstart', this.onTouchStart, false);
        window.addEventListener('touchmove', this.onTouchMove, false);
        
        console.log('✅ Interação com bolhas ativada');
    }
    
    /**
     * Desativa interação
     */
    disableInteraction() {
        this.interactionEnabled = false;
        
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('click', this.onMouseClick);
        window.removeEventListener('touchstart', this.onTouchStart);
        window.removeEventListener('touchmove', this.onTouchMove);
    }
    
    /**
     * Atualiza posição do mouse
     */
    handleMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    /**
     * Atualiza posição do touch
     */
    handleTouchMove(event) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    }
    
    /**
     * Manipula clique em bolha
     */
    handleClick(event) {
        this.checkBubbleInteraction();
    }
    
    /**
     * Manipula toque em bolha
     */
    handleTouch(event) {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            this.checkBubbleInteraction();
        }
        event.preventDefault();
    }
    
    /**
     * Verifica se clicou em uma bolha
     */
    checkBubbleInteraction() {
        if (!this.interactionEnabled || !this.isActive) return;
        
        // Atualizar raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Verificar interseções com bolhas
        const intersects = this.raycaster.intersectObjects(this.bubbles);
        
        if (intersects.length > 0) {
            const bubble = intersects[0].object;
            this.popBubble(bubble);
            console.log('💧 Bolha tocada!');
        }
    }
    
    /**
     * Faz a bolha "estourar" e subir rapidamente
     */
    popBubble(bubble) {
        if (!bubble.userData.active) return;
        
        const data = bubble.userData;
        
        // Aumentar velocidade de subida
        data.speed = 3.0;
        
        // Efeito visual: aumentar brilho
        if (data.light) {
            data.light.intensity = 2.0;
            
            // Voltar ao normal após 0.5s
            setTimeout(() => {
                if (data.light) {
                    data.light.intensity = 0.5;
                }
            }, 500);
        }
        
        // Animação de "explosão" sutil
        const originalScale = bubble.scale.clone();
        bubble.scale.multiplyScalar(1.3);
        
        // Reduzir opacidade
        bubble.material.opacity = 0.2;
        
        // Voltar ao normal após um tempo
        setTimeout(() => {
            bubble.scale.copy(originalScale);
            bubble.material.opacity = 0.4;
            data.speed = 0.2 + Math.random() * 0.3;
        }, 1000);
        
        // Som de bolha
        this.playBubbleSound();
        
        // Feedback visual no HUD
        this.showBubbleHint();
    }
    
    /**
     * Mostra dica visual quando toca bolha
     */
    showBubbleHint() {
        const narrationText = document.getElementById('narration-text');
        if (narrationText && Math.random() < 0.3) { // 30% de chance
            const hints = [
                "✨ Liberado...",
                "💧 Deixe ir...",
                "🌊 Solte...",
                "💫 Leve e livre..."
            ];
            const hint = hints[Math.floor(Math.random() * hints.length)];
            
            // Salvar texto anterior
            const previousText = narrationText.textContent;
            const wasVisible = narrationText.classList.contains('visible');
            
            // Mostrar hint
            narrationText.textContent = hint;
            narrationText.classList.add('visible');
            
            // Voltar ao texto anterior após 2 segundos
            setTimeout(() => {
                narrationText.textContent = previousText;
                if (!wasVisible) {
                    narrationText.classList.remove('visible');
                }
            }, 2000);
        }
    }
    
    /**
     * Toca som de bolha
     */
    playBubbleSound() {
        // Som procedural de bolha
        if (this.audioSystem && this.audioSystem.audioContext) {
            const ctx = this.audioSystem.audioContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.frequency.value = 800 + Math.random() * 400;
            osc.type = 'sine';
            
            gain.gain.value = 0.05;
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            const currentTime = ctx.currentTime;
            osc.start(currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.3);
            osc.stop(currentTime + 0.3);
        }
    }

    /**
     * Completa a fase
     */
    complete() {
        this.isActive = false;
        this.disableInteraction();
        
        if (this.onComplete) {
            this.onComplete();
        }
    }

    /**
     * Limpa a cena
     */
    cleanup() {
        this.isActive = false;
        this.disableInteraction();
        
        if (this.water) this.scene.remove(this.water);
        if (this.particleSystem) this.scene.remove(this.particleSystem);
        
        this.bubbles.forEach(b => {
            this.scene.remove(b);
            if (b.userData.light) this.scene.remove(b.userData.light);
        });
        
        this.plants.forEach(p => this.scene.remove(p));
        this.lights.forEach(l => this.scene.remove(l));
        
        this.bubbles = [];
        this.plants = [];
        this.lights = [];
        
        this.scene.fog = null;
    }
}

// Exportar
window.Phase2Underwater = Phase2Underwater;
