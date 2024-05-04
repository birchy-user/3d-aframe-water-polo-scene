<script>
  import { onMount } from "svelte";
  
  import AFRAME from "aframe";

  // Gatavas VR vides integrācija (Oculus Quest 2 pārlūks nodod kontroli ):
  // import "aframe-environment-component";

  // Piemērs okeānam no A-Frame dokumentācijas (avots: https://www.npmjs.com/package/aframe-extras)
  // import "https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@d5f3f8/dist/aframe-extras.min.js";
  import "aframe-extras/primitives/a-ocean";
  
  // Saules un debesu objekts:
  import "./components/sun.js";

  // Peldoša objekta komponente:
  import "./animations/floating.js";

  // "Drag-n-drop" komponente
  // Oriģinālais: https://github.com/jesstelford/aframe-click-drag-component
  // Atjaunotā versija, kas darbojas kopā ar A-Frame 1.5.0: https://github.com/kumitterer/aframe-click-drag-component
  import registerClickDrag from '@kumitterer/aframe-click-drag-component';

  let aframeScene;

  let sun;

  let waterPoloBall;

  onMount(() => {
    if (!AFRAME.components['click-drag']) {
      registerClickDrag(AFRAME);
    }

    // Kad ieiet VR režīmā, pabīda kameru vairāk uz atpakaļu (kad iziet ārā, aiziet uz sākotnējo pozīciju (camera.x, camera.y, 25) ):
    AFRAME.registerComponent('adjust-for-vr', {
      init: function() {
          this.el.sceneEl.addEventListener('enter-vr', () => {
              alert('Entered VR');
              AFRAME.scenes[0].camera.el.object3D.position.z = 25;
          });
          this.el.sceneEl.addEventListener('exit-vr', () => {
              alert('Exited VR');
              AFRAME.scenes[0].camera.el.object3D.position.z = 25;
          });
      }
    });

    // Komponente, kas pievieno 6DoF ("6 degrees of freedom" jeb "6 kustības virzienu") kontrolierus (avots no dokumentācijas: https://aframe.io/docs/1.5.0/introduction/interactions-and-controllers.html#adding-6dof-controllers-vive-controls-oculus-touch-controls)
    AFRAME.registerComponent('vr-grab', {
      init: function() {
          this.grabbing = false;

          this.el.addEventListener('triggerdown', (evt) => {
              let intersectedEl = this.el.components.raycaster.intersectedEls[0];
              if (intersectedEl && intersectedEl.classList.contains('grabbable')) {
                  this.grabbing = true;
                  intersectedEl.addState('dragging');
                  intersectedEl.setAttribute('position', this.el.object3D.position);
              }
          });

          this.el.addEventListener('triggerup', (evt) => {
              if (this.grabbing) {
                  let intersectedEl = this.el.components.raycaster.intersectedEls[0];
                  if (intersectedEl) {
                      intersectedEl.removeState('dragging');
                  }
                  this.grabbing = false;
              }
          });
      }
    });

    // Ja objekts tiek vilkts pa ekrānu, to attiecīgi marķējam ar statusu "dragging":
    waterPoloBall.addEventListener('dragstart', (e) => {
      console.log("dragstart: ", e);
      e.target.addState('dragging');
    });

    waterPoloBall.addEventListener('dragend', (e) => {
      console.log("dragend: ", e);
      e.target.removeState('dragging');
    });
  })

  // TODO:
  //      1) Pievienot `drag-and-drop` komponenti
  //      2) Pievienot iespēju kustēties pa ainu ar VR kontrolieriem
  //      3) (Neobligāti) paeksperimentēt ar `gaze-oriented` events (kad kaut kas mainās tad, kad tu uz to paskaties)
  //      4) (Neobligāti) pamainīt ainu VR skatā tā, lai bumba un vārti ir vēl tālāk no oriģinālā skatpunkta (kad ieiet VR režīmā caur VR browser)

</script>

<!-- Avots renderer atribūtam: https://aframe.io/docs/1.2.0/components/renderer.html#logarithmicdepthbuffer -->
<a-scene 
  bind:this={aframeScene} 
  renderer="logarithmicDepthBuffer: true" 
  environment="preset: default;"
  adjust-for-vr
>
  <!-- Definē brīvi kustināmu kameru: -->
  <!-- <a-entity camera look-controls wasd-controls position="0 1.6 25"></a-entity> -->
  <!-- <a-entity camera look-controls-enabled="false" keyboard-controls="fpsMode: true" position="0 1.6 25"></a-entity> -->
  <!-- <a-entity movement-controls="fly: true">
    <a-entity camera position="0 1.6 25" look-controls></a-entity>
  </a-entity> -->
  <a-entity id="rig" movement-controls="controls: checkpoint; fly: true; speed: 0.1">
    <a-entity camera look-controls position="0 1.6 25"></a-entity>
  </a-entity>
  <!-- Apgaismo visu ainu no vienas puses: -->
  <a-light type="directional" position="10 10 0" intensity="1" color="#FFF"></a-light>

  <!-- Ūdenspolo bumbas modeļa (OBJ) ielāde -->
  <a-assets>
    <a-asset-item id="water-polo-ball-obj" src="/assets/models/water_polo_goal_FINAL.obj"></a-asset-item>
    <a-asset-item id="water-polo-ball-mtl" src="/assets/models/water_polo_goal_FINAL.mtl"></a-asset-item>
  </a-assets>

  <a-entity 
    obj-model="obj: #water-polo-ball-obj; mtl: #water-polo-ball-mtl"
    position="0 0 -15"
    scale="15 15 15"
    rotation="0 -90 0"
    float-in-water
  ></a-entity>

  <a-entity
    bind:this={waterPoloBall}
    gltf-model="url(/assets/models/water_polo_ball_FINAL_v2.glb)" 
    position="0 -0.3 -5" 
    scale="1 1 1" 
    click-drag
    float-in-water
  ></a-entity>

  <!-- Okeāna elementa ievietošana (oriģināli no: "aframe-extras/primitives/a-ocean") -->
  <a-ocean
    color="#92E2E2"
    width="100"
    depth="100"
    density="50"
    speed="0.2"
  ></a-ocean>

  <a-simple-sun-sky bind:this={sun} sun-position="1 1 1"></a-simple-sun-sky>

  <!-- Oculus Quest 2 kontrolieru pievienošana kreisajai un labajai rokai -->
  <a-entity oculus-touch-controls="hand: left" vr-grab></a-entity>
  <a-entity oculus-touch-controls="hand: right" vr-grab></a-entity>
</a-scene>