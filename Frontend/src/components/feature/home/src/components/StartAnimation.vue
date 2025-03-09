<template>
  <div>
    <!-- Overlay und Pac-Man Container -->
    <div class="black-overlay" v-show="showOverlay">
      <!-- Pixel werden dynamisch in JS hinzugefügt -->
    </div>

    <div class="pacman-container" v-show="showPacman">
      <svg id="pacman" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="yellow"/>
        <polygon id="mouth" :points="mouthPoints" fill="black"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartAnimation',
  data() {
    return {
      showOverlay: false, // Steuerung für das Overlay
      showPacman: false,  // Steuerung für Pac-Man
      mouthPoints: '50,50 100,20 100,80', // Anfangs-Mundposition
    };
  },
  methods: {
    startTransition() {
      this.showOverlay = true;
      this.showPacman = true;

      const pacman = document.getElementById('pacman');
      const mouth = document.getElementById('mouth');
      const overlay = document.querySelector('.black-overlay');

      // Pac-Man bewegt sich
      pacman.classList.add('move');

      let open = true;
      let eatInterval = setInterval(() => {
        this.mouthPoints = open ? "50,50 100,40 100,60" : "50,50 100,20 100,80";
        open = !open;
      }, 150); // Mund öffnet/schließt sich alle 150ms

      // Erzeuge Pixel für die Animation (hinter Pac-Man)
      this.createPixels(overlay);

      // Nach 1.8 Sekunden → Wechsel zur Ingame-Seite
      setTimeout(() => {
        clearInterval(eatInterval); // Stoppe die Mund-Animation
        this.$router.push('/ingame'); // Seitenwechsel in Vue, z.B. über Vue Router
      }, 1800);
    },

    createPixels(overlay) {
      // 400 Pixel werden generiert und zufällig auf dem Bildschirm verteilt
      for (let i = 0; i < 400; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');

        // Zufällige Position der Pixel innerhalb des Bildschirms
        const x = Math.random() * 100; // Zufällige x-Position (0-100%)
        const y = Math.random() * 100; // Zufällige y-Position (0-100%)

        pixel.style.left = `${x}vw`;
        pixel.style.top = `${y}vh`;

        pixel.style.animationDelay = `${Math.random() * 0.6}s`; // Zufällige Verzögerung für jedes Pixel
        overlay.appendChild(pixel);
      }
    },
  },
  mounted() {
    this.startTransition(); // Starte die Animation sobald die Komponente geladen ist
  }
};
</script>

<style scoped>
/* Start Animation */
.black-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  pointer-events: none;
}

.pixel {
  position: absolute; /* Positioniere Pixel absolut innerhalb des Overlays */
  width: 5vw;
  height: 5vw;
  background-color: black;
  opacity: 0;
  transform: scale(0);
  pointer-events: none; /* Stellen sicher, dass Pixel nicht mit anderen Elementen interagieren */
}

.fill .pixel {
  animation: pixelFade 0.6s forwards;
}

@keyframes pixelFade {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.pacman-container {
  position: fixed;
  top: 50%;
  left: -100px;
  width: 50px;
  height: 50px;
  z-index: 1001;
}

#pacman {
  width: 100px;
  height: 100px;
}

.move {
  animation: moveAcross 1.5s ease-in-out forwards;
}

@keyframes moveAcross {
  from { transform: translateX(-10vw); }
  to { transform: translateX(110vw); }
}
</style>
