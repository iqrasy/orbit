import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import imgRight from "./images/right.png";
import imgLeft from "./images/left.png";
import imgUp from "./images/up.png.jpeg";
import imgDown from "./images/down.png";
import imgFront from "./images/front.png";
import imgBack from "./images/back.png";
import mercury from "./planets/mercurymap.jpg";
import venus from "./planets/venusmap.jpg";
import earth from "./planets/earthmap.jpg";
import mars from "./planets/marsmap1k.jpg";
import jupiter from "./planets/jupitermap.jpg";
import saturn from "./planets/saturnmap.jpg";
import uranus from "./planets/uranusmap.jpg";
import neptune from "./planets/neptunemap.jpg";
import saturnring from "./planets/saturnringcolor.jpg";
import uranusring from "./planets/uranusringcolour.jpg";

function main() {
  // set up the scene, camera, and renderer
  const canvas = document.querySelector("#c");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    30000
  );

  // setup camera
  camera.position.set(10, 0, 20);
  camera.lookAt(scene.position);
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Fix the viewport / aspect ratio.
  window.addEventListener("resize", function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // create controls for the shape
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  // create skybox
  const rt = new THREE.TextureLoader().load(imgRight);
  const up = new THREE.TextureLoader().load(imgUp);
  const lf = new THREE.TextureLoader().load(imgLeft);
  const bk = new THREE.TextureLoader().load(imgBack);
  const dn = new THREE.TextureLoader().load(imgDown);
  const ft = new THREE.TextureLoader().load(imgFront);

  // Load textures with proper wrapping and filtering for bottom image + rotate image
  dn.wrapS = THREE.RepeatWrapping;
  dn.wrapT = THREE.RepeatWrapping;
  dn.minFilter = THREE.LinearFilter;
  dn.magFilter = THREE.LinearFilter;
  dn.rotation = -Math.PI / 2;

  const cubeMaterial = [
    new THREE.MeshBasicMaterial({ map: rt, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: lf, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: up, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: dn, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: ft, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: bk, side: THREE.DoubleSide }),
  ];
  const cubeGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);

  // an array of objects that holds the planets and ring
  const objects = [];

  //create ring;
  const radius = 1.5;
  const tubeRadius = 0.3;
  const radialSegments = 20;
  const tubularSegments = 100;
  const ringGeometry = new THREE.TorusGeometry(
    radius,
    tubeRadius,
    radialSegments,
    tubularSegments
  );

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffffff });
  const sunMesh = new THREE.Mesh(ringGeometry, sunMaterial);
  scene.add(sunMesh);
  objects.push(sunMesh);

  //create mercury
  const mercuryGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const mercuryTexture = new THREE.TextureLoader().load(mercury);
  const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: mercuryTexture,
  });
  const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
  mercuryMesh.position.x = 2;
  sunMesh.add(mercuryMesh);
  objects.push(mercuryMesh);

  //create venus
  const venusGeo = new THREE.SphereGeometry(0.4, 32, 32);
  const venusTexture = new THREE.TextureLoader().load(venus);
  const venusMaterial = new THREE.MeshBasicMaterial({
    map: venusTexture,
  });
  const venusMesh = new THREE.Mesh(venusGeo, venusMaterial);
  venusMesh.position.x = 3;
  sunMesh.add(venusMesh);
  objects.push(venusMesh);

  // create earth
  const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const earthTexture = new THREE.TextureLoader().load(earth);
  const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture,
  });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earthMesh.position.x = 4;
  sunMesh.add(earthMesh);
  objects.push(earthMesh);

  //create mars
  const marsGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const marsTexture = new THREE.TextureLoader().load(mars);
  const marsMaterial = new THREE.MeshBasicMaterial({
    map: marsTexture,
  });
  const marsMesh = new THREE.Mesh(marsGeo, marsMaterial);
  marsMesh.position.x = 5;
  sunMesh.add(marsMesh);
  objects.push(marsMesh);

  // create jupiter
  const jupiterGeo = new THREE.SphereGeometry(1, 32, 32);
  const jupiterTexture = new THREE.TextureLoader().load(jupiter);
  const jupiterMaterial = new THREE.MeshBasicMaterial({
    map: jupiterTexture,
  });
  const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMaterial);
  jupiterMesh.position.x = 6.5;
  sunMesh.add(jupiterMesh);
  objects.push(jupiterMesh);

  //create saturn
  const saturnGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const saturnTexture = new THREE.TextureLoader().load(saturn);
  const saturnMaterial = new THREE.MeshBasicMaterial({
    map: saturnTexture,
  });
  const saturnMesh = new THREE.Mesh(saturnGeo, saturnMaterial);
  saturnMesh.position.x = 10;
  sunMesh.add(saturnMesh);
  objects.push(saturnMesh);

  // create saturn's ring
  const saturnRingGeo = new THREE.RingGeometry(1, 1.8, 64);
  const saturnRingTexture = new THREE.TextureLoader().load(saturnring);
  const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
  });
  const saturnRingMesh = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);
  saturnRingMesh.rotation.x = Math.PI / 2;
  saturnMesh.add(saturnRingMesh);

  //create uranus
  const uranusGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const uranusTexture = new THREE.TextureLoader().load(uranus);
  const uranusMaterial = new THREE.MeshBasicMaterial({
    map: uranusTexture,
  });
  const uranusMesh = new THREE.Mesh(uranusGeo, uranusMaterial);
  uranusMesh.position.x = 13.5;
  sunMesh.add(uranusMesh);
  objects.push(uranusMesh);

  //create uranus ring
  const uranusRingGeo = new THREE.RingGeometry(0.9, 1.2, 64);
  const uranusRingTexture = new THREE.TextureLoader().load(uranusring);
  const uranusRingMaterial = new THREE.MeshBasicMaterial({
    map: uranusRingTexture,
    side: THREE.DoubleSide,
  });
  const uranusRingMesh = new THREE.Mesh(uranusRingGeo, uranusRingMaterial);
  uranusRingMesh.rotation.x = Math.PI / 2;
  uranusRingMesh.position.set(0, 0, 0);
  uranusMesh.add(uranusRingMesh);

  //create neptune
  const neptuneGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const neptuneTexture = new THREE.TextureLoader().load(neptune);
  const neptuneMaterial = new THREE.MeshBasicMaterial({
    map: neptuneTexture,
  });
  const neptuneMesh = new THREE.Mesh(neptuneGeo, neptuneMaterial);
  neptuneMesh.position.x = 16;
  sunMesh.add(neptuneMesh);
  objects.push(neptuneMesh);

  // render the scene + create planet orbit
  const animate = () => {
    const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    sunMesh.rotation.y += 0.001;

    mercuryMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 8
    );
    venusMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 3
    );
    earthMesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), EARTH_YEAR);
    marsMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 0.5
    );
    jupiterMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 0.25
    );
    saturnMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 0.125
    );
    uranusMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 0.0625
    );
    neptuneMesh.position.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      EARTH_YEAR * 0.03125
    );

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  };
  animate();
}

main();
