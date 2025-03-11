<template>
  <div>
    <div class="black-overlay" v-show="showOverlay"></div>
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
      showOverlay: false,
      showPacman: false,
      mouthPoints: '50,50 100,20 100,80'
    };
  },
  methods: {
    startTransition() {
      this.showOverlay = true;
      this.showPacman = true;
      this.$nextTick(() => {
        const pacman = document.getElementById('pacman');
        const overlay = document.querySelector('.black-overlay');
        pacman.classList.add('move');
        let open = true;
        const eatInterval = setInterval(() => {
          this.mouthPoints = open ? "50,50 100,40 100,60" : "50,50 100,20 100,80";
          open = !open;
        }, 150);
        this.createPixels(overlay);
        overlay.classList.add('fill');
        setTimeout(() => {
          clearInterval(eatInterval);
          this.$router.push('/ingame');
        }, 1800);
      });
    },
    createPixels(overlay) {
      for (let i = 0; i < 400; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.animationDelay = `${Math.random() * 0.6}s`;
        overlay.appendChild(pixel);
      }
    },
  },
  mounted() {
    this.startTransition();
  }
};
</script>

<style scoped>
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

::v-deep .pixel {
  width: 5vw;
  height: 5vw;
  background-color: black;
  opacity: 0;
  transform: scale(0);
}

::v-deep .fill .pixel {
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
