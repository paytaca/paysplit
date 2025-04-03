<template>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <q-page class="q-pa-md page-bg scrollable-content">
    <div class="banner-container">
      <div class="how-it-works">
        <h1 class="text-center">How It Works</h1>
        <br>
        <span class="description">Paytaca Paysplit makes splitting expenses fast, fair, and effortless! Whether you're dining with friends, planning a group trip, or managing shared expenses, our step-by-step system ensures smooth transactions!</span>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 1</h4>
            <p>Click "GET STARTED" to begin using Paytaca Paysplit. Easily split expenses with friends, family, or teams—quick, simple, and hassle-free!</p>
          </div>
          <div class="step-image">
            <img :src="step1" alt="Step 1 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 2</h4>
            <p>The image shows a "Paytaca Paysplit" interface with a QR code for scanning (1) and a "Request Paysplit" button (2), allowing users to generate and share their wallet address for payments.</p>
          </div>
          <div class="step-image">
            <img :src="step2" alt="Step 2 Image" />
          </div>
        </div>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 3</h4>
            <p>The image shows the "Split KKB Expenses" feature of Paytaca Paysplit, where users first have the option to enable Quick Mode for faster transactions. They can then select a split type (1), specify the number of participants (2), and finally, click Generate QR Codes (3) to create unique payment requests for each participant.</p>
          </div>
          <div class="step-image">
            <img :src="step3" alt="Step 3 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 4</h4>
            <p>In this step, users can enable Quick Mode for a faster process, select the Split Type (1) between splitting equally or by amount, add participants using the Add Participant button (2), and finally, generate unique QR codes by clicking Generate QR Codes (3).</p>
          </div>
          <div class="step-image">
            <img :src="step4" alt="Step 4 Image" />
          </div>

        </div>
        <div class="step-container">
          <div class="step-description">
            <h4>Step 5</h4>
            <p>In this step, users receive a Payment QR Code (1) for each participant, allowing them to scan and complete their payments. Once all payments are processed, users can click the Finish button (2) to complete the transaction.</p>
          </div>
          <div class="step-image">
            <img :src="step5" alt="Step 5 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 6</h4>
            <p>The left and right ◀ ▶ arrows allow users to navigate between different participants' QR codes, ensuring each individual gets their own unique payment code.

              Once all payments are settled, the system will enable the "COMPLETE" button, finalizing the transaction.</p>
          </div>
          <div class="step-image">
            <img :src="step6" alt="Step 6 Image" />
          </div>
        </div>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 7</h4>
            <p>The highlighted sections in the image represent the core input fields and options for configuring a Paysplit transaction. The first highlighted box focuses on the Amount to Split, where users enter the total amount to be divided among participants. Next to it, the currency selector (PHP) allows users to choose the desired currency for the transaction. The second highlighted section features the Split Type dropdown, which provides options like "Split Equally" and "Split By Amount," enabling users to select their preferred method of dividing the expenses. Adjacent to this, the Number of Participants field lets users specify how many people will share the cost. </p>
          </div>
          <div class="step-image">
            <img :src="step7" alt="Step 7 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 8</h4>
            <p>The highlighted "Generate QR Codes" button in the image is the final step in the Paysplit process, allowing users to create individual QR codes for each participant based on the specified split amounts. The interface shows the "Split By Amount" option, where users manually assign different amounts to each participant. After confirming the split details, clicking "Generate QR Codes" will produce unique QR codes that each participant can scan to complete their respective payments. </p>
          </div>
          <div class="step-image">
            <img :src="step8" alt="Step 8 Image" />
          </div>
        </div>
      </div>
    </div>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-section">
            <h1 style="font-size: xx-large">Let's keep in touch!</h1>
            <p class="foot-message">Find us on any of these platforms and follow our updates.</p>
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
          <p class="f-copyright-text">Copyright © 2025</p>
        </div>
      </footer>
    </q-page>
  </template>

  <script>
  import flashm from 'src/assets/flashm.png'
  import step1 from 'src/assets/step1.png'
  import step2 from 'src/assets/step2.png'
  import step3 from 'src/assets/step3.png'
  import step4 from 'src/assets/step4.png'
  import step5 from 'src/assets/step5.png'
  import step6 from 'src/assets/step6.png'
  import "src/css/page.scss";

  export default {
    name: 'LandingPage',
    data() {
      return {
        flashm,
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
      }
    },
    methods:{
      usePaysplit(){
        window.linkToGetStarted();
      }
    }
  }

  </script>
