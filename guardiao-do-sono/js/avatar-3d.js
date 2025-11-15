/**
 * 🌟 Avatar 3D - Guardião Personalizado do Sono
 * 
 * Cria um avatar 3D que evolui conforme o usuário progride:
 * - Nível 1: Esfera azul simples
 * - Nível 2: Esfera com anéis orbitais
 * - Nível 3: Forma cristalina pulsante
 * - Nível 4: Galáxia espiral
 * - Nível 5: Guardião supremo radiante
 */

class Avatar3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas do avatar não encontrado!');
            return;
        }

        this.currentLevel = 1;
        this.initThree();
        this.createAvatar(this.currentLevel);
        this.animate();
        this.setupResize();
    }

    /**
     * Inicializa Three.js para o avatar
     */
    initThree() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparente

        // Camera
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.z = 3;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x8ab4f8, 1, 100);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);

        console.log('🎨 Avatar 3D inicializado');
    }

    /**
     * Cria o avatar baseado no nível
     */
    createAvatar(level) {
        // Remove avatar anterior
        if (this.avatarGroup) {
            this.scene.remove(this.avatarGroup);
        }

        this.avatarGroup = new THREE.Group();
        this.currentLevel = level;

        switch(level) {
            case 1:
                this.createLevel1Avatar();
                break;
            case 2:
                this.createLevel2Avatar();
                break;
            case 3:
                this.createLevel3Avatar();
                break;
            case 4:
                this.createLevel4Avatar();
                break;
            case 5:
                this.createLevel5Avatar();
                break;
            default:
                this.createLevel1Avatar();
        }

        this.scene.add(this.avatarGroup);
        console.log(`🌙 Avatar nível ${level} criado`);
    }

    /**
     * Nível 1: Esfera azul simples pulsante
     */
    createLevel1Avatar() {
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.3,
            shininess: 100
        });
        
        this.mainMesh = new THREE.Mesh(geometry, material);
        this.avatarGroup.add(this.mainMesh);

        // Partículas ao redor
        this.addParticles(20, 0x667eea, 1.5);
    }

    /**
     * Nível 2: Esfera com anéis orbitais
     */
    createLevel2Avatar() {
        // Esfera central
        const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x764ba2,
            emissive: 0x764ba2,
            emissiveIntensity: 0.4,
            shininess: 100
        });
        
        this.mainMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.avatarGroup.add(this.mainMesh);

        // Anéis orbitais
        this.rings = [];
        for (let i = 0; i < 2; i++) {
            const ringGeometry = new THREE.TorusGeometry(1.2 + i * 0.3, 0.05, 16, 100);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: 0x8ab4f8,
                emissive: 0x8ab4f8,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.6
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + i * 0.3;
            this.rings.push(ring);
            this.avatarGroup.add(ring);
        }

        this.addParticles(30, 0x764ba2, 2);
    }

    /**
     * Nível 3: Cristal pulsante
     */
    createLevel3Avatar() {
        const geometry = new THREE.OctahedronGeometry(0.9, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xf093fb,
            emissive: 0xf093fb,
            emissiveIntensity: 0.5,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        this.mainMesh = new THREE.Mesh(geometry, material);
        this.avatarGroup.add(this.mainMesh);

        // Cristais menores orbitando
        this.orbitingCrystals = [];
        for (let i = 0; i < 4; i++) {
            const smallGeometry = new THREE.TetrahedronGeometry(0.2);
            const smallMaterial = new THREE.MeshPhongMaterial({
                color: 0xf093fb,
                emissive: 0xf093fb,
                emissiveIntensity: 0.6,
                transparent: true,
                opacity: 0.8
            });
            
            const crystal = new THREE.Mesh(smallGeometry, smallMaterial);
            const angle = (i / 4) * Math.PI * 2;
            crystal.position.set(
                Math.cos(angle) * 1.5,
                Math.sin(angle) * 0.5,
                Math.sin(angle) * 1.5
            );
            
            this.orbitingCrystals.push({ mesh: crystal, angle: angle });
            this.avatarGroup.add(crystal);
        }

        this.addParticles(50, 0xf093fb, 2.5);
    }

    /**
     * Nível 4: Galáxia espiral
     */
    createLevel4Avatar() {
        // Núcleo galáctico
        const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x4facfe,
            emissive: 0x4facfe,
            emissiveIntensity: 0.8,
            shininess: 100
        });
        
        this.mainMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this.avatarGroup.add(this.mainMesh);

        // Espiral de partículas
        this.spiralParticles = [];
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x4facfe,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const positions = [];
        for (let i = 0; i < 200; i++) {
            const t = i / 200;
            const angle = t * Math.PI * 6;
            const radius = 0.5 + t * 1.5;
            
            positions.push(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 0.3,
                Math.sin(angle) * radius
            );
        }

        particlesGeometry.setAttribute('position', 
            new THREE.Float32BufferAttribute(positions, 3));
        
        this.spiral = new THREE.Points(particlesGeometry, particlesMaterial);
        this.avatarGroup.add(this.spiral);

        this.addParticles(70, 0x4facfe, 3);
    }

    /**
     * Nível 5: Guardião Supremo (forma complexa e radiante)
     */
    createLevel5Avatar() {
        // Núcleo dourado radiante
        const coreGeometry = new THREE.IcosahedronGeometry(0.6, 1);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            emissive: 0xffd700,
            emissiveIntensity: 1.0,
            shininess: 100
        });
        
        this.mainMesh = new THREE.Mesh(coreGeometry, coreMaterial);
        this.avatarGroup.add(this.mainMesh);

        // Múltiplas camadas de anéis
        this.supremeRings = [];
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(1 + i * 0.4, 0.03, 16, 100);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: 0xffd700,
                emissive: 0xffd700,
                emissiveIntensity: 0.8,
                transparent: true,
                opacity: 0.7
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + i * 0.5;
            ring.rotation.y = i * 0.3;
            this.supremeRings.push(ring);
            this.avatarGroup.add(ring);
        }

        // Halo de luz
        const haloGeometry = new THREE.RingGeometry(1.5, 1.8, 32);
        const haloMaterial = new THREE.MeshBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        this.halo = new THREE.Mesh(haloGeometry, haloMaterial);
        this.halo.rotation.x = Math.PI / 2;
        this.avatarGroup.add(this.halo);

        this.addParticles(100, 0xffd700, 3.5);
    }

    /**
     * Adiciona partículas ao redor do avatar
     */
    addParticles(count, color, radius) {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: color,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const positions = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = radius * (0.8 + Math.random() * 0.4);
            
            positions.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
        }

        geometry.setAttribute('position', 
            new THREE.Float32BufferAttribute(positions, 3));
        
        this.particles = new THREE.Points(geometry, material);
        this.avatarGroup.add(this.particles);
    }

    /**
     * Loop de animação
     */
    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        if (this.avatarGroup) {
            // Rotação base
            this.avatarGroup.rotation.y = time * 0.3;

            // Animações específicas por nível
            if (this.mainMesh) {
                // Pulsação
                const scale = 1 + Math.sin(time * 2) * 0.1;
                this.mainMesh.scale.set(scale, scale, scale);
            }

            if (this.rings) {
                this.rings.forEach((ring, i) => {
                    ring.rotation.z = time * (0.5 + i * 0.2);
                });
            }

            if (this.orbitingCrystals) {
                this.orbitingCrystals.forEach((crystal, i) => {
                    const angle = crystal.angle + time;
                    crystal.mesh.position.x = Math.cos(angle) * 1.5;
                    crystal.mesh.position.z = Math.sin(angle) * 1.5;
                    crystal.mesh.rotation.y = time * 2;
                });
            }

            if (this.spiral) {
                this.spiral.rotation.y = time * 0.5;
            }

            if (this.supremeRings) {
                this.supremeRings.forEach((ring, i) => {
                    ring.rotation.z = time * (0.3 + i * 0.15);
                });
            }

            if (this.halo) {
                this.halo.rotation.z = time * 0.2;
                const haloOpacity = 0.3 + Math.sin(time * 3) * 0.2;
                this.halo.material.opacity = haloOpacity;
            }

            if (this.particles) {
                this.particles.rotation.y = -time * 0.1;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Atualiza o avatar quando o nível muda
     */
    updateLevel(newLevel) {
        if (newLevel !== this.currentLevel) {
            console.log(`🆙 Atualizando avatar para nível ${newLevel}`);
            this.createAvatar(newLevel);
        }
    }

    /**
     * Ajusta o canvas quando a janela é redimensionada
     */
    setupResize() {
        const resizeObserver = new ResizeObserver(() => {
            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(width, height);
        });

        resizeObserver.observe(this.canvas);
    }

    /**
     * Limpa recursos
     */
    dispose() {
        this.renderer.dispose();
        console.log('🧹 Avatar 3D descartado');
    }
}

// Inicializa o avatar quando o DOM carregar
let avatar3D;
document.addEventListener('DOMContentLoaded', () => {
    avatar3D = new Avatar3D('avatar-canvas');
    console.log('🌟 Avatar 3D carregado!');
    
    // Sincroniza com o sistema de evolução
    if (window.evolutionSystem) {
        avatar3D.updateLevel(evolutionSystem.currentLevel);
    }
});
