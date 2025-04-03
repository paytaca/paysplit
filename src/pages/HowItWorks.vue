<template>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <q-page class="q-pa-md page-bg scrollable-content">
    <div class="banner-container">
      <div class="how-it-works">
        <h1>How It Works</h1>
        <span class="subtext">Paysplit makes splitting expenses fast, fair, and effortless! Whether you're dining with friends, planning a group trip, or managing shared expenses, our step-by-step system ensures smooth transactions!</span>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 1: Click on "Get Started"</h4>
            <p></p>
          </div>
          <div class="step-image">
            <img :src="step1" alt="Step 1 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 2: Scan Your Wallet QR Code</h4>
            <p>Go to your Paytaca wallet and let Paysplit scan your wallet's QR code. Alternatively, you can manually paste your wallet's Bitcoincash address on the "Wallet Address" field. This step is crucial because the provided wallet address will receive the customers' payment once a transaction is completed. When done, click on the "<b>Request Paysplit</b>" button.</p>
          </div>
          <div class="step-image">
            <img :src="step2" alt="Step 2 Image" />
          </div>
        </div>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 3: Set Amount to Split then Split</h4>
            <p>Specify the total amount to be split, then select a "split type," either "equally" or "custom amount". By default, the app is always in "Basic Mode" and you can switch to "Advanced Mode" by toggling the checkbox on the top-right corner of the dialog. Once all there required fields are filled, click on "Generate QR Codes".</p>
          </div>
          <div class="step-image">
            <img :src="step3" alt="Step 3 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 4: Let the Payers Scan the QR Codes</h4>
            <p>Prompt your payers/customers to scan the QR Codes that appears on the screen. The payment is sequential and only one payer can scan a QR Code and pay BCH at a time. Once all the participant payers have paid, click on "Finish" to complete the transaction.</p>
          </div>
          <div class="step-image">
            <img :src="step4" alt="Step 4 Image" />
          </div>

        </div>
        <div class="step-container">
          <div class="step-description">
            <h4>Step 5: Review Transactions</h4>
            <p>Congratulations, the BCH transaction with Paysplit is complete and the exact BCH amount has already been sent to your Paytaca wallet. To confirm and check the details of your previous transactions, you can explore the "Transactions History" table.</p>
          </div>
          <div class="step-image">
            <img :src="step5" alt="Step 5 Image" />
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
  import flashm from 'src/assets/flashm.png';
  import step1 from 'src/assets/step1.png';
  import step2 from 'src/assets/step2.png';
  import step3 from 'src/assets/step3.png';
  import step4 from 'src/assets/step4.png';
  import step5 from 'src/assets/step5.png';
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
      }
    },
    methods:{
      usePaysplit(){
        window.linkToGetStarted();
      }
    }
  }

  </script>
