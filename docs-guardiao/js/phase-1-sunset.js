/**
 * FASE 1: TRANSIÇÃO - "Apagar o Dia"
 * Pôr do sol com desaceleração cognitiva
 * Duração: 2 minutos (120 segundos)
 * Frequência: 7 Hz (Alfa)
 */

class Phase1Sunset {
    constructor(scene, camera, audioSystem, binauralBeats) {
        this.scene = scene;
        this.camera = camera;
        this.audioSystem = audioSystem;
        this.binauralBeats = binauralBeats;
        
        this.duration = 120; // 2 minutos
        this.elapsed = 0;
        this.isActive = false;
        
        // Elementos da cena
        this.sky = null;
        this.sun = null;
        this.ground = null;
        this.lights = [];
        this.particles = [];
    }

    /**
     * Inicializa a cena da Fase 1
     */
    initialize() {
        // Criar céu com gradiente
        this.createSky();
        
        // Criar sol
        this.createSun();
        
        // Criar chão/horizonte
        this.createGround();
        
        // Criar partículas de luz
        this.createLightParticles();
        
        // Posicionar câmera
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 1, 0);
    }

    /**
     * Cria o céu com shader gradiente
     */
    createSky() {
        const geometry = new THREE.SphereGeometry(500, 32, 32);
        
        const vertexShader = `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;

            void main() {
                float h = normalize(vWorldPosition + offset).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            }
        `;

        const uniforms = {
            topColor: { value: new THREE.Color(0xFF6B35) },    // Laranja vibrante
            bottomColor: { value: new THREE.Color(0xF7931E) },  // Dourado
            offset: { value: 33 },
            exponent: { value: 0.6 }
        };

        const skyMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide
        });

        this.sky = new THREE.Mesh(geometry, skyMaterial);
        this.scene.add(this.sky);
    }

    /**
     * Cria o sol
     */
    createSun() {
        const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xFDB813,
            emissive: 0xFDB813,
            emissiveIntensity: 1
        });
        
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.position.set(0, 10, -50);
        this.scene.add(this.sun);

        // Luz do sol
        const sunLight = new THREE.PointLight(0xFDB813, 2, 100);
        sunLight.position.copy(this.sun.position);
        this.scene.add(sunLight);
        this.lights.push(sunLight);

        // Luz ambiente quente
        const ambientLight = new THREE.AmbientLight(0xFF8C42, 0.5);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
    }

    /**
     * Cria o chão/horizonte
     */
    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x2C5F2D,
            shininess: 0,
            flatShading: true
        });

        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.position.y = 0;
        this.scene.add(this.ground);
    }

    /**
     * Cria partículas de luz flutuantes
     */
    createLightParticles() {
        const particleCount = 50;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < particleCount; i++) {
            // Posições aleatórias
            const x = (Math.random() - 0.5) * 100;
            const y = Math.random() * 20;
            const z = (Math.random() - 0.5) * 100;
            positions.push(x, y, z);

            // Cores quentes
            const color = new THREE.Color();
            color.setHSL(0.1 + Math.random() * 0.1, 1.0, 0.6);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
        this.particles.push(particles);
    }

    /**
     * Inicia a fase
     */
    start() {
        this.isActive = true;
        this.elapsed = 0;

        // Iniciar áudio binaural em 7 Hz (Alfa)
        this.binauralBeats.start(7);
        this.binauralBeats.fadeIn(3);

        // Iniciar som de vento suave
        this.audioSystem.startWind();

        // Narração inicial
        setTimeout(() => {
            this.audioSystem.narrate(
                "Cada luz que se apaga no horizonte é um pensamento que se despede. " +
                "Você não precisa fazer nada. Só deixar que o silêncio volte a morar em você."
            );
        }, 3000);

        // Segunda narração
        setTimeout(() => {
            this.audioSystem.narrate(
                "Observe as cores se transformando. Cada respiração escurece o cenário. " +
                "O dia já passou. Agora é hora de descansar."
            );
        }, 45000); // 45 segundos
    }

    /**
     * Atualiza a fase
     */
    update(deltaTime) {
        if (!this.isActive) return;

        this.elapsed += deltaTime;
        const progress = Math.min(this.elapsed / this.duration, 1);

        // Transição de cores do céu (dourado → azul petróleo)
        this.updateSkyColors(progress);

        // Movimento do sol (descendo)
        this.updateSunPosition(progress);

        // Animação das partículas
        this.updateParticles(deltaTime);

        // Reduzir luz gradualmente
        this.updateLighting(progress);

        // Verificar conclusão
        if (progress >= 1) {
            this.complete();
        }
    }

    /**
     * Atualiza cores do céu
     */
    updateSkyColors(progress) {
        if (!this.sky) return;

        // Cores iniciais (dourado e laranja)
        const startTop = new THREE.Color(0xFF6B35);
        const startBottom = new THREE.Color(0xF7931E);

        // Cores finais (azul petróleo escuro)
        const endTop = new THREE.Color(0x1a3a52);
        const endBottom = new THREE.Color(0x0d1f2d);

        // Interpolar
        const currentTop = new THREE.Color().lerpColors(startTop, endTop, progress);
        const currentBottom = new THREE.Color().lerpColors(startBottom, endBottom, progress);

        this.sky.material.uniforms.topColor.value = currentTop;
        this.sky.material.uniforms.bottomColor.value = currentBottom;
    }

    /**
     * Atualiza posição do sol
     */
    updateSunPosition(progress) {
        if (!this.sun) return;

        // Sol desce e fica mais vermelho
        this.sun.position.y = 10 - (progress * 15); // Desce abaixo do horizonte
        
        // Mudar cor para vermelho/roxo
        const sunColor = new THREE.Color();
        sunColor.setHSL(0.05 - (progress * 0.15), 1.0, 0.5 - (progress * 0.3));
        this.sun.material.color = sunColor;
        this.sun.material.emissive = sunColor;

        // Atualizar luz
        if (this.lights[0]) {
            this.lights[0].position.copy(this.sun.position);
        }
    }

    /**
     * Atualiza partículas
     */
    updateParticles(deltaTime) {
        this.particles.forEach(particleSystem => {
            // Rotação lenta
            particleSystem.rotation.y += deltaTime * 0.05;
            
            // Fade out gradual
            particleSystem.material.opacity = Math.max(0, 0.8 - (this.elapsed / this.duration));
        });
    }

    /**
     * Atualiza iluminação
     */
    updateLighting(progress) {
        // Reduzir intensidade das luzes
        this.lights.forEach((light, index) => {
            if (light.intensity) {
                const initialIntensity = index === 0 ? 2 : 0.5;
                light.intensity = initialIntensity * (1 - progress * 0.7);
            }
        });
    }

    /**
     * Completa a fase
     */
    complete() {
        this.isActive = false;
        
        // Callback para próxima fase (será definido externamente)
        if (this.onComplete) {
            this.onComplete();
        }
    }

    /**
     * Limpa a cena
     */
    cleanup() {
        this.isActive = false;
        
        // Remover objetos da cena
        if (this.sky) this.scene.remove(this.sky);
        if (this.sun) this.scene.remove(this.sun);
        if (this.ground) this.scene.remove(this.ground);
        
        this.particles.forEach(p => this.scene.remove(p));
        this.lights.forEach(l => this.scene.remove(l));
        
        this.particles = [];
        this.lights = [];
    }
}

// Exportar
window.Phase1Sunset = Phase1Sunset;
