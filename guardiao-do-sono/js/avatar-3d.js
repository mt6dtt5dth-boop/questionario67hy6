/**
 * 🌙 Sistema de Avatar 3D - Guardião do Sono
 * 
 * Renderiza um avatar 3D animado que evolui conforme o usuário progride
 * Usa Three.js em um canvas dedicado dentro do painel lateral
 */

class Avatar3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.avatar = null;
        this.lights = [];
        this.clock = new THREE.Clock();
        
        this.currentLevel = 1;
        this.isAnimating = false;
        
        this.init();
    }
    
    /**
     * Inicializa o sistema 3D
     */
    init() {
        if (!this.container) {
            console.error('❌ Container do avatar não encontrado');
            return;
        }
        
        // Obter canvas
        const canvas = document.getElementById('avatar-canvas');
        if (!canvas) {
            console.error('❌ Canvas do avatar não encontrado');
            return;
        }
        
        // Dimensões do container
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        console.log(`🎨 Inicializando avatar 3D (${width}x${height})`);
        
        // Cena
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x1a1a2e, 5, 15);
        
        // Câmera
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0); // Transparente
        
        // Criar avatar
        this.createAvatar();
        
        // Iluminação
        this.setupLights();
        
        // Iniciar animação
        this.isAnimating = true;
        this.animate();
        
        // Responsividade
        window.addEventListener('resize', () => this.onResize());
        
        console.log('✅ Avatar 3D inicializado');
    }
    
    /**
     * Cria o avatar (esfera com shader personalizado)
     */
    createAvatar() {
        // Geometria: Icosaedro (parece mais orgânico que esfera perfeita)
        const geometry = new THREE.IcosahedronGeometry(1.2, 3);
        
        // Material com efeito de energia
        const material = new THREE.MeshPhongMaterial({
            color: this.getLevelColor(this.currentLevel),
            emissive: this.getLevelColor(this.currentLevel),
            emissiveIntensity: 0.3,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        this.avatar = new THREE.Mesh(geometry, material);
        this.scene.add(this.avatar);
        
        // Adicionar partículas ao redor
        this.createParticles();
        
        console.log('✅ Avatar criado');
    }
    
    /**
     * Cria partículas orbitando o avatar
     */
    createParticles() {
        const particleCount = 50;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const radius = 2 + Math.random() * 1;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: this.getLevelColor(this.currentLevel),
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particles);
    }
    
    /**
     * Configura iluminação
     */
    setupLights() {
        // Luz ambiente
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        // Luz direcional principal
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        this.scene.add(mainLight);
        this.lights.push(mainLight);
        
        // Luz de preenchimento
        const fillLight = new THREE.DirectionalLight(this.getLevelColor(this.currentLevel), 0.4);
        fillLight.position.set(-3, 2, -2);
        this.scene.add(fillLight);
        this.lights.push(fillLight);
        
        // Luz pontual (brilho)
        const pointLight = new THREE.PointLight(this.getLevelColor(this.currentLevel), 1, 10);
        pointLight.position.set(0, 0, 3);
        this.scene.add(pointLight);
        this.lights.push(pointLight);
    }
    
    /**
     * Retorna cor baseada no nível
     */
    getLevelColor(level) {
        const colors = {
            1: 0x667eea, // Azul-roxo
            2: 0x764ba2, // Roxo
            3: 0xf093fb, // Rosa
            4: 0x4facfe, // Azul claro
            5: 0xffd700  // Dourado
        };
        return colors[level] || colors[1];
    }
    
    /**
     * Atualiza o nível do avatar
     */
    setLevel(level) {
        if (level === this.currentLevel) return;
        
        console.log(`⬆️ Avatar: Level ${this.currentLevel} → ${level}`);
        this.currentLevel = level;
        
        // Animar transição de cor
        this.animateLevelUp(level);
    }
    
    /**
     * Animação de level up
     */
    animateLevelUp(newLevel) {
        const newColor = this.getLevelColor(newLevel);
        const duration = 2000; // 2 segundos
        const startTime = Date.now();
        
        const startColor = this.avatar.material.color.clone();
        const endColor = new THREE.Color(newColor);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolar cor
            this.avatar.material.color.lerpColors(startColor, endColor, progress);
            this.avatar.material.emissive.copy(this.avatar.material.color);
            
            // Pulsar durante transição
            const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
            this.avatar.scale.setScalar(scale);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.avatar.scale.setScalar(1);
                
                // Atualizar partículas
                if (this.particles) {
                    this.particles.material.color.set(newColor);
                }
                
                // Atualizar luzes
                this.lights[1].color.set(newColor);
                this.lights[2].color.set(newColor);
            }
        };
        
        animate();
    }
    
    /**
     * Loop de animação
     */
    animate() {
        if (!this.isAnimating) return;
        
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        const elapsed = this.clock.getElapsedTime();
        
        if (this.avatar) {
            // Rotação suave
            this.avatar.rotation.y += delta * 0.3;
            this.avatar.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
            
            // Respiração (escala)
            const breathe = 1 + Math.sin(elapsed * 1.5) * 0.05;
            this.avatar.scale.setScalar(breathe);
        }
        
        if (this.particles) {
            // Rotação das partículas (oposta ao avatar)
            this.particles.rotation.y -= delta * 0.2;
            this.particles.rotation.x += delta * 0.1;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * Redimensionamento responsivo
     */
    onResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    /**
     * Limpa recursos
     */
    dispose() {
        this.isAnimating = false;
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.avatar) {
            this.avatar.geometry.dispose();
            this.avatar.material.dispose();
        }
        
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }
        
        console.log('🗑️ Avatar 3D descartado');
    }
}

// Inicializar quando o DOM carregar
let avatar3D;
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar o evolutionSystem estar pronto
    setTimeout(() => {
        avatar3D = new Avatar3D('avatar-container');
        
        // Sincronizar com o sistema de evolução
        if (window.evolutionSystem) {
            const level = window.evolutionSystem.currentLevel;
            avatar3D.setLevel(level);
            console.log('🔗 Avatar sincronizado com level', level);
        }
    }, 500);
});
