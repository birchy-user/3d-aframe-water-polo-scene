<script>
  import { onMount } from "svelte";
  
  // import { AFRAME } from "aframe";
  import "aframe";

  // Gatavs ūdens materiāls no D. Evans (Dante83), avots: https://github.com/Dante83/a-water/blob/master/dist/a-water.v0.1.1.min.js
  // import "./components/a-water.v0.1.1.min.js";

  // Piemērs okeānam no A-Frame dokumentācijas (avots: https://www.npmjs.com/package/aframe-extras)
  // import "https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js";
  // import "https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@d5f3f8/dist/aframe-extras.min.js";
  import "aframe-extras/primitives/a-ocean";
  
  // import "https://cdn.jsdelivr.net/npm/aframe-simple-sun-sky@^1.2.2/simple-sun-sky.js";
  import "./components/sun.js";
  
  // Saule no A-Frame dokumentācijas (avots: https://www.npmjs.com/package/aframe-sun-sky)
  // import "aframe-sun-sky";

  let aframeScene;

  let sun;

  $: console.log("aframeScene ", aframeScene);
  
  $: console.log("sun as svelte prop: ", sun);

  import "./animations/floating.js";

</script>

<!-- Avots renderer atribūtam: https://aframe.io/docs/1.2.0/components/renderer.html#logarithmicdepthbuffer -->
<a-scene bind:this={aframeScene} renderer="logarithmicDepthBuffer: true">
  <!-- Definē brīvi kustināmu kameru: -->
  <a-entity camera look-controls wasd-controls position="0 1.6 25"></a-entity>
  <!-- Apgaismo visu ainu no vienas puses: -->
  <a-light type="directional" position="10 10 0" intensity="1" color="#FFF"></a-light>
  <!-- 3D modeļu importēšana no lokālajiem failiem: -->
  <!-- <a-assets>
    <a-asset-item id="football-goal-model" src="/assets/models/football_goal.glb"></a-asset-item>
    <a-asset-item id="football-model" src="/assets/models/football.gltf"></a-asset-item>
  </a-assets> -->

  <a-entity 
    gltf-model="url(/assets/models/football_goal.glb)" 
    position="0 -1.3 -30" 
    scale="5 5 5"
    float-in-water
  >
  </a-entity>

  <a-entity 
    gltf-model="url(/assets/models/football.gltf)" 
    position="0 -0.3 -5" 
    scale="1 1 1" 
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

  <!-- Debesu un saules gaismas atdarinājums (oriģināli no: https://cdn.jsdelivr.net/npm/aframe-simple-sun-sky@^1.2.2/simple-sun-sky.js) -->
  <a-simple-sun-sky bind:this={sun} sun-position="1 1 1"></a-simple-sun-sky>
</a-scene>