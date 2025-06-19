<script setup lang="ts">
    defineOptions({
      name: 'Skin-Component'
    })
</script>

<style>
  ::-webkit-scrollbar { display: none; }


  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }


  .button-container {
    height: calc(100vh - 80vh);
    min-height: 80px;
  }

  .grid-wrapper {
    height: calc(100vh - 20vh);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .skin-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2vw;
    max-width: 1200px;
    width: 100vw;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }



  .flex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4.99%;
    border: 5px solid white;
    width: 12rem;
    height: 12rem;
    padding: 0.5rem;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .stylingGIF {
    width: auto;
    height: 6.25rem;
    margin-top: 0.9375rem;
  }


  @media (max-width: 1366px)  {
    .button-container {
      height: calc(100vh - 87vh);
    }

    .grid-wrapper {
      height: calc(100vh - 13vh);
      overflow-y: auto;
      overflow-x: hidden;
    }
    .stylingGIF {
      height: 5rem;
    }
  }

  @media (max-width: 1024px)  {
    .skin-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .stylingGIF {
      height: 4rem;
    }
  }

  @media (max-width: 800px) {
    .skin-container {
      grid-template-columns: repeat(2, 1fr);

    }

    .stylingGIF {
      height: 3rem;
    }
  }



  /* 1) bei ≤900px Höhe: etwas kleinere Cards */
  @media (max-height: 900px) {

    .stylingGIF {
      height: 5rem;
    }
    .Select-Button {
      margin-bottom: 12px;
      font-size: 0.9rem;
      height: 1.8rem;
    }
  }

  @media (max-height: 700px) {

    .stylingGIF {
      height: 5rem;
    }
    .Select-Button {
      margin-bottom: 10px;
      font-size: 0.8rem;
      height: 1.6rem;
    }
  }

  @media (max-height: 600px) {

    .stylingGIF {
      height: 5rem;
    }
    .Select-Button {
      margin-bottom: 8px;
      font-size: 0.75rem;
      height: 1.4rem;
    }
  }

</style>
