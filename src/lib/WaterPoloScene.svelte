<script>
  // import { AFRAME } from "aframe";
  import "aframe";

  // Gatavs ūdens materiāls no D. Evans (Dante83), avots: https://github.com/Dante83/a-water/blob/master/dist/a-water.v0.1.1.min.js
  // import "./components/a-water.v0.1.1.min.js";

  // Piemērs okeānam no A-Frame dokumentācijas:
  // import "https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js";
  import "https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@d5f3f8/dist/aframe-extras.min.js";

  // Saule no A-Frame dokumentācijas:
  import "https://cdn.jsdelivr.net/npm/aframe-simple-sun-sky@^1.2.2/simple-sun-sky.js";
</script>

<!-- Avots renderer atribūtam: https://aframe.io/docs/1.2.0/components/renderer.html#logarithmicdepthbuffer -->
<!-- <a-scene fog="type: linear; color: #a3d0ed; near: 20; far: 100;"> -->
<a-scene renderer="logarithmicDepthBuffer: true">
  <a-entity camera look-controls wasd-controls position="0 1.6 4"></a-entity>
  <a-light type="directional" position="10 10 0" intensity="1" color="#FFF"></a-light> <!-- Saules gaismas atdarinājums -->
  <!-- 3D modeļu importēšana no lokālajiem failiem: -->
  <!-- <a-assets>
    <a-asset-item id="football-goal-model" src="/assets/models/football_goal.glb"></a-asset-item>
    <a-asset-item id="football-model" src="/assets/models/football.gltf"></a-asset-item>
  </a-assets> -->

  <a-entity gltf-model="url(/assets/models/football_goal.glb)" position="0 0 -5"></a-entity>
  <a-entity gltf-model="url(/assets/models/football.gltf)" position="0 0 -3"></a-entity>

  <!-- <a-ocean 
    ocean-state="large_normal_map: '../../public/assets/textures/ocean_water_assets/water-normal-1.png';
                 small_normal_map: '../../public/assets/textures/ocean_water_assets/water-normal-2.png';"
  >
  </a-ocean> -->

  <a-entity id="ocean" ocean="density: 20; width: 50; depth: 50; speed: 4" material="color: #9CE3F9; opacity: 0.75; metalness: 0; roughness: 1" rotation="-90 0 0">
  </a-entity>

  <!-- <a-sky color="#ECECEC"></a-sky> -->
  <a-simple-sun-sky sun-position="1 0.4 0"></a-simple-sun-sky>
</a-scene>