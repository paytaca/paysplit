<template>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <q-page class="q-pa-md page-bg scrollable-content">
    <div class="banner-container">
      <div class="how-it-works">
        <h1 class="text-center">How It Works</h1>
        <span class="description">Paytaca Paysplit makes splitting expenses fast, fair, and effortless! Whether you're dining with friends, planning a group trip, or managing shared expenses, our step-by-step system ensures smooth transactions. Just tap "GET STARTED", generate a QR code, and let your friends scan and pay their share instantly. Customize split types, set participant numbers, and track payments—all in a few clicks. Say goodbye to manual calculations and awkward reminders—Paytaca Paysplit does it all for you!</span>

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
            <p>The highlighted section showcases key features of the Paysplit functionality, allowing users to easily manage and share payments. It includes a QR code linked to a public wallet address, enabling quick access by scanning. Below the QR code, the wallet address is displayed in text format (bitcoincash:qp2kx4v6vfzh…), with an options to paste or refresh it. Additionally, the "Request Paysplit" button simplifies the process by initiating a transaction request.</p>
          </div>
          <div class="step-image">
            <img :src="step2" alt="Step 2 Image" />
          </div>
        </div>

        <div class="step-container">
          <div class="step-description">
            <h4>Step 3</h4>
            <p>The highlighted sections in the image represent the core input fields and options for configuring a Paysplit transaction. The first highlighted box focuses on the Amount to Split, where users enter the total amount to be divided among participants. Next to it, the currency selector (PHP) allows users to choose the desired currency for the transaction. The second highlighted section features the Split Type dropdown, which provides options like "Split Equally" and "Split By Amount," enabling users to select their preferred method of dividing the expenses. Adjacent to this, the Number of Participants field lets users specify how many people will share the cost.</p>
          </div>
          <div class="step-image">
            <img :src="step3" alt="Step 3 Image" />
          </div>
        </div>

        <div class="step-container reverse">
          <div class="step-description">
            <h4>Step 4</h4>
            <p>The highlighted "Generate QR Codes" button in the image is the final step in the Paysplit process, allowing users to create individual QR codes for each participant based on the specified split amounts. The interface shows the "Split By Amount" option, where users manually assign different amounts to each participant. After confirming the split details, clicking "Generate QR Codes" will produce unique QR codes that each participant can scan to complete their respective payments. </p>
          </div>
          <div class="step-image">
            <img :src="step4" alt="Step 4 Image" />
          </div>

        </div>
        <div class="step-container">
          <div class="step-description">
            <h4>Step 5</h4>
            <p>The highlighted "OK" button in the confirmation dialog signifies the final step before proceeding with the Paysplit process. This prompt ensures that the user acknowledges the action is irreversible, meaning once they confirm, they cannot go back or modify the split. Clicking "OK" finalizes the QR code generation and locks in the specified expense split among participants. If the user needs to make changes, they should select "CANCEL" instead. </p>
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
          <span>Copyright © 2025</span>
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
  import "src/css/howitworks.scss";

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
