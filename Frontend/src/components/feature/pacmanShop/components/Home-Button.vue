<script setup lang="ts">
    defineOptions({
      name: 'ButtonsComponent'
    })
</script>

<style>

  .Home-Button {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    width: 10vw;
    /*height: 4.1667vw;*/
    height: auto;
    background-color: black;
    color: white;
    font-family: "Jersey 10", serif;
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
    /*font-size: 48px;*/
    font-size: clamp(24px, 4vw, 48px);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform-origin: center;
  }

  .Home-Button:hover {
    transform: scale(1.02);
    font-size: clamp(2rem, 2.5vw + 1rem, 3.2rem);
    background-color: #222;
  }

  .HomeButton-Container {
    padding: 50px;
  }

  @media (max-width: 1366px) {
    .Home-Button {
      top: 1.8%;
      left: 1%;
      padding: 0.4rem 0.8rem;
      font-size: clamp(20.8px, 3vw, 38.4px);
      height: auto;
    }
  }

  @media (max-width: 1024px) {
    .Home-Button {
      top: 1.5%;
      left: 0.8%;
      padding: 0.3rem 0.6rem;
      font-size: clamp(19.2px, 2.5vw, 32px);
      height: auto;
    }
  }

  /* Extra Klein (≤800×600) */
  @media (max-width: 800px)  {
    .Home-Button {
      top: 1rem;
      left: 0.5rem;
      padding: 0.25rem 0.5rem;
      font-size: clamp(16px, 2vw, 25.6px);
      height: auto;

    }
  }



</style>
