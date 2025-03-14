<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  />
  <q-page class="q-pa-md page-bg">
    <div class="banner-container">
      <div class="text-content">
        <h1>Free Pay Split Feature Made for Everyone</h1>
        <p class="subtext">
          Effortlessly divide expenses with friends, family, or teams. Our seamless platform makes
          it simple to split costs and stay organized.
        </p>
        <q-btn class="cta-btn">Use Paysplit Now</q-btn>
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

export default {
  name: 'LandingPage',
  data() {
    return {
      flashm,
    }
  },
}
</script>

<style>
/* General Page Background */

/* Flexbox Layout */
.banner-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 80px 100px;
  transform: translateY(-14px);
  margin: 0 20px;
}

/* Heading Style */
h1 {
  font-size: 48px;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  max-width: 600px;
  margin-top: 0;
}

/* Subtext */
.subtext {
  font-size: 18px;
  color: white;
  margin-top: 10px;
  font-size: x-large;
  width: 80%;
}

/* Call-to-Action Button */
.cta-btn {
  background-color: #ff5a5f;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 20px;

  transition: background-color 0.3s ease-in-out;
}

.cta-btn:hover {
  background-color: #e04b50;
}

/* Image */
.banner-image-style {
  width: 100%;
  height: auto;
  display: block;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }

  h1 {
    font-size: 36px;
    margin-top: 0;
  }

  .subtext {
    font-size: 16px;
  }

  .banner-image-style {
    width: 300px;
  }

  .banneer-image-container {
    width: 50%;
  }
}
.banner-image-style {
  /*width: 300px;*/
  height: auto;
  opacity: 0; /* Start invisible */
  transform: translateX(50px); /* Start position */
  animation: fadeInLeft 1s ease-out forwards;
}

.text-content {
  height: auto;
  opacity: 0; /* Start invisible */
  transform: translateX(-50px); /* Start position */
  animation: fadeInRight 1s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.footer {
  background-color: #1f2a38;
  color: white;
  padding: 40px 20px;
  text-align: left;
  transform: translateY(14px);
}

.footer-container {
  display: block;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 900px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin: 80px;
  width: 100%;
  box-sizing: border-box;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
}

.footer-section p {
  font-size: 14px;
  color: white;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: white;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  color: white;
  font-size: 20px;
  margin: 0 10px;
  text-decoration: none;
  transition: 0.3s;
}

.social-icons a:hover {
  color: #ff5a5f;
}

hr {
  border: 0.5px solid white;
  margin: 20px 0;
}

.footer-bottom {
  text-align: center;
  color: white;
  font-size: 14px;
}
</style>
