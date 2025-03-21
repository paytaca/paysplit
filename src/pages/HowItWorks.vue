<template>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
  
    <q-page class="q-pa-md page-bg scrollable-content">
    <div class="banner-container">    
      <div class="how-it-works">
        <h1 class="text-center">How It Works</h1>
        <p class="description">Learn how our system works step by step to achieve the best results.</p>
  
        <div class="step-container">
          <div class="step-description">
            <h4>Step 1</h4>
            <p>Brief description of Step 1 explaining how the process begins.</p>
          </div>
          <div class="step-image">
            <img src="step1.png" alt="Step 1 Image" />
          </div>
        </div>
  
        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 2</h4>
            <p>Explanation of Step 2 detailing the next part of the process.</p>
          </div>
          <div class="step-image">
            <img src="step2.png" alt="Step 2 Image" />
          </div>
        </div>
  
        <div class="step-container">
          <div class="step-description">
            <h2>Step 3</h2>
            <p>Details about Step 3 explaining further progress.</p>
          </div>
          <div class="step-image">
            <img src="step3.png" alt="Step 3 Image" />
          </div>
        </div>
  
        <div class="step-container reverse">
          <div class="step-description">
            <h2>Step 4</h2>
            <p>Final step description to complete the process.</p>
          </div>
          <div class="step-image">
            <img src="step4.png" alt="Step 4 Image" />
          </div>
        </div>
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
  import "src/css/page.scss";
  import "src/css/howitworks.scss";
  
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
 
  
  