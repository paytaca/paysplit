<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  />
  <q-page class="q-pa-md page-bg scrollable-content">

    <q-table
      flat
      bordered
      title="Transaction History"
      :rows="paysplitRecords"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      ref="transactionTable"
      class="printable-area"
    >
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <a
            :href="'https://blockchair.com/bitcoin-cash/transaction/' + props.row.txid"
            target="_blank"
            class="text-blue-500"
            style="text-decoration: none;"
          >
            {{ props.row.txid }}
          </a>
        </q-td>
      </template>
    </q-table>

    <div class="print-btn-container">
      <q-btn class="print-rec-btn" icon="print" label="Print Records" @click="printRecords" />
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
        <p class="f-copyright-text">Copyright &copy; 2025</p>
      </div>
    </footer>
  </q-page>
</template>

<script>
import "src/css/page.scss";
export default {
  name: 'TransactionPage',
  data() {
    return {
      paysplitRecords: [],
      columns: [
        { name: 'id', label: 'Transaction ID', field: 'txid', align: 'left' },
        { name: 'bch', label: 'BCH Amount', field: 'bch_amount', align: 'left' },
        { name: 'pesos', label: 'Pesos Amount', field: 'php_amount', align: 'left' },
        { name: 'date', label: 'Date & Time', field: 'timestamp', align: 'right' }
      ],
      
      pagination: {
        page: 1, // Current page
        rowsPerPage: 50, // Set records per page
      }
    };
  },
  mounted(){
    this.fetchRecords();
  },
  methods: {
    printRecords() {
      const printContent = document.querySelector('.printable-area').outerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      location.reload();
    },

    fetchRecords() {
      const rec = localStorage.getItem("localSessionRecords");
      this.paysplitRecords = [];
      if (rec) {
        this.paysplitRecords = JSON.parse(rec)
          .map(row => ({
            txid: row.txid,
            bch_amount: row.bch_amount + " BCH",
            php_amount: row.php_amount + " PHP",
            timestamp: row.timestamp,
          }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort descending (latest first)
      }
    },
  }
};
</script>

<style>

</style>
