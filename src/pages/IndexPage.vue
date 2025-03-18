<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  />


    <q-page class="q-pa-md page-bg scrollable-content">
      <div class="banner-container">
        <div class="text-content">
          <h1>Free Paysplit Feature Made for Everyone</h1>
          <p class="subtext">
            Effortlessly divide expenses with friends, family, or teams. Our seamless platform makes
            it simple to split costs and stay organized.
          </p>
          <q-btn class="cta-btn" @click="usePaysplit()">Use Paysplit Now</q-btn>
        </div>
        <div class="banneer-image-container">
          <img :src="flashm" alt="FlashM Image" class="banner-image-style" />
        </div>
      </div>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-section">
            <h1 style="font-size: xx-large">Let's keep in touch!</h1>
            <p style="font-size: large">Find us on any of these platforms and follow our updates.</p>
            <div class="social-icons">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-github"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
              <a href="#"><i class="fab fa-telegram"></i></a>
              <a href="#"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <hr />
        <div class="footer-bottom">
          <p>Copyright © 2025</p>
        </div>
      </footer>
    </q-page>

  
</template>

<script>
import flashm from 'src/assets/flashm.png'
import "src/css/index-page.css";

export default {
  name: 'LandingPage',
  data() {
    return {
      flashm,
    }
  },
  methods:{
    usePaysplit(){
      window.linkToGetStarted();
    }
  }
}
</script>

<style>


</style>
