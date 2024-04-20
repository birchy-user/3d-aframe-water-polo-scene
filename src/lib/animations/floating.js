// Dokumentācija: https://aframe.io/docs/1.5.0/core/component.html
AFRAME.registerComponent('float-in-water', {
    /**
     * Apraksta komponentes laukus, to tipus, sākotnējās vērtības
     */
    schema: {
        waveSpeed: { type: 'number', default: 1 },
        originalY: { type: 'number', default: 0 }
    },
  
    /**
     * Metode, kas tiek izpildīta vienu reizi brīdī, kad komponente tiek inicializēta un pievienota kādam elementam:
     */
    init: function() {
        this.data.originalY = this.el.object3D.position.y;
        this.el.sceneEl.addEventListener('loaded', () => {
            const oceanEl = document.querySelector('a-ocean');
            if (oceanEl && oceanEl.components.ocean) {
                this.data.waveSpeed = oceanEl.components.ocean.data.speed;
            } else {
                console.warn('The `a-ocean` component is not loaded.');
                this.data.waveSpeed = 1;
            }
        });
    },
  
    /**
     * Metode, kas tiek izpildīta katru reizi, kad tiek ģenerēts jauns A-Frame ainas (a-scene) kadrs (frame)
     * 
     * @param {*} time - laiks, kas atbilst A-Frame ainas (a-scene) kopējam renderētajam laikam (ms)
     * @param {*} timeDelta - laiks, kas pagājis, starp tagadējo un iepriekšējo kadru (ms)
     */
    tick: function(time, timeDelta) {
        const elapsedTime = time / 1000;  // Sekundes
        const x = this.el.object3D.position.x;
        const z = this.el.object3D.position.z;
        const scaleY = this.el.object3D.scale.y;

        // Pie katra kadra renderēšanas atjauno komponentes vertikālo pozīciju, izmantojot sinusoīda viļņu funkciju - y(t) = A sin(ωt + φ) -, ar dažādām modifikācijām:
        // Šajā gadījumā: 
        //      *) Viļņu garums A = 1, jo viļņu garums nav norādīts
        //      *) Leņķiskā frekvence ω = (viļņu ātrums jeb data.waveSpeed no a-ocean komponentes)
        //      *) Laiks (s) t = (cik ilgi ir pagājis kopš A-Frame aina tika pilnībā renderēta)
        //      *) (x / 0.9) un (z / 0.05) - papildus parametri, kas pielāgoti šai ainai, ar nolūku pieslīpēt animāciju
        //      *) Viļņa fāze φ = scaleY (tā kā objektiem ir atšķirīgi izmēri, tad skatās tās atbilstošo maksimālo y koordinātu no objekta 0-tā punkta - šajā punktā var uzskatīt, ka svārstība ir apstājusies pie t = 0)
        const newY = this.data.originalY + Math.abs(
            Math.sin((elapsedTime * this.data.waveSpeed + (x / 0.9)) + scaleY) +
            Math.cos((elapsedTime * this.data.waveSpeed + (z / 0.05)) + scaleY)
        );

        // TODO:
        //      1) Pievienot `drag-and-drop` komponenti
        //      2) Pievienot iespēju kustēties pa ainu ar VR kontrolieriem
        //      3) (Neobligāti) paeksperimentēt ar `gaze-oriented` events (kad kaut kas mainās tad, kad tu uz to paskaties)
        //      4) (Neobligāti) pamainīt ainu VR skatā tā, lai bumba un vārti ir vēl tālāk no oriģinālā skatpunkta (kad ieiet VR režīmā caur VR browser)

        // const newY = this.data.originalY + Math.abs(
        //     Math.sin(((x / 0.9) + elapsedTime * this.data.waveSpeed * scaleY) * 0.5) +
        //     Math.cos(((z / 0.05) + elapsedTime * this.data.waveSpeed * scaleY) * 0.5)
        // );

        this.el.object3D.position.y = newY;
    }
  });