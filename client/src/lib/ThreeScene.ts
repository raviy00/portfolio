import * as THREE from 'three';
import gsap from 'gsap';

export class ThreeScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLElement;
  animationFrameId: number | null = null;
  objects: THREE.Object3D[] = [];
  scrollY: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;

    // Scene setup with gradient background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f0a1a); // Deep purple-blue
    this.scene.fog = new THREE.Fog(0x0f0a1a, 150, 1000);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    // Lighting
    this.setupLighting();

    // Event listeners
    this.setupEventListeners();

    // Start animation loop
    this.animate();
  }

  private setupLighting() {
    // Ambient light - brighter for loading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.6);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Cyan accent light
    const cyanLight = new THREE.PointLight(0x00ffff, 0.8);
    cyanLight.position.set(-8, 5, 5);
    this.scene.add(cyanLight);

    // Magenta accent light
    const magentaLight = new THREE.PointLight(0xff00ff, 0.6);
    magentaLight.position.set(8, -5, 5);
    this.scene.add(magentaLight);

    // Back light for depth
    const backLight = new THREE.PointLight(0x00aaff, 0.4);
    backLight.position.set(0, 0, -10);
    this.scene.add(backLight);
  }

  private setupEventListeners() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  createWireframeGeometry(type: 'box' | 'sphere' | 'torus' = 'box'): THREE.Mesh {
    let geometry: THREE.BufferGeometry;

    switch (type) {
      case 'sphere':
        geometry = new THREE.IcosahedronGeometry(1, 4);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      wireframe: false,
      emissive: 0x000000,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.objects.push(mesh);
    this.scene.add(mesh);

    return mesh;
  }

  createWireframeLines(type: 'box' | 'sphere' | 'torus' = 'box'): THREE.LineSegments {
    let geometry: THREE.BufferGeometry;

    switch (type) {
      case 'sphere':
        geometry = new THREE.IcosahedronGeometry(1, 4);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
    );

    this.objects.push(line);
    this.scene.add(line);

    return line;
  }

  animateObject(
    object: THREE.Object3D,
    duration: number,
    props: Record<string, number>
  ) {
    gsap.to(object.position, {
      ...props,
      duration,
      ease: 'power2.inOut',
    });
  }

  rotateObject(object: THREE.Object3D, axis: 'x' | 'y' | 'z' = 'y', speed: number = 0.005) {
    if (axis === 'x') object.rotation.x += speed;
    if (axis === 'y') object.rotation.y += speed;
    if (axis === 'z') object.rotation.z += speed;
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Update objects
    this.objects.forEach((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        obj.rotation.x += 0.001;
        obj.rotation.y += 0.002;
      }
    });

    // Update camera based on scroll
    this.camera.position.y = -this.scrollY * 0.001;

    // Render scene
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
