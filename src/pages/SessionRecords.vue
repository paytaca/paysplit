<template>
     <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  />
    <q-page class="q-pa-md page-bg scrollable-content">
      <div class="banner-container">
        <div class="text-content">
          <h1>Transactions</h1>
        </div>
      </div>
  
      <q-table
        flat
        bordered
        title="Transaction History"
        :rows="transactions"
        :columns="columns"
        row-key="id"
      />
  
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
          <p>Copyright &copy; 2025</p>
        </div>
      </footer>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'TransactionPage',
    data() {
      return {
        columns: [
          { name: 'id', label: 'Transaction ID', field: 'id', align: 'left' },
          { name: 'bch', label: 'BCH Amount', field: 'bch', align: 'right' },
          { name: 'pesos', label: 'Pesos Amount', field: 'pesos', align: 'right' },
          { name: 'date', label: 'Date & Time', field: 'date', align: 'left' }
        ],
        transactions: [
          { id: 'TXN001', bch: 0.012, pesos: 500, date: '2025-04-02 14:30:00' },
          { id: 'TXN002', bch: 0.025, pesos: 1000, date: '2025-04-01 10:15:00' }
        ]
      };
    }
  };
  </script>
  
  <style>

  </style>
  