<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
  <q-toolbar>
    <q-toolbar-title>
      <img width="32px" class="paytaca-logo" src="src/assets/favicon.png" alt="paytaca-logo.png" />
      <img height="32px" class="paytaca-paysplit-title" src="src/assets/paytaca-paysplit-title.png" alt="paytaca-paysplit-title.png" />
      
    </q-toolbar-title>
    <q-btn flat dense class="toolbar-btn-home" label="Home" @click="goToHome()" />
    <q-btn flat dense class="toolbar-btn" label="Get Started" @click="getStarted()" />
    <q-btn flat dense class="toolbar-btn-how-it-works" label="How it Works" @click="goToHowItWorks()" />
    
  </q-toolbar>
</q-header>

  <q-page-container>
    <router-view />
  </q-page-container>

<q-dialog v-model="getStartedDialog">
  <q-card class="floating-dialog qr-q-card">
    <q-card-section class="qrcode-wrapper">
      <qrcode-stream
          @detect="onQRDecode"
          @camera-on="onScannerInit"
          @error="onCameraError"
          :paused="pauseCam">
      </qrcode-stream>

      <div class="address-input-con">
        <q-input v-model="bchAddress" class="custom-input payer-input" @update:model-value="onManualAdressInput()" label="Your public wallet address" dense outlined ></q-input>
        <q-btn dense flat @click="pasteAddress" class="paste-btn">
          <q-icon name="fa-solid fa-paste" />
          <q-tooltip>Paste Paytaca Wallet Address</q-tooltip>
        </q-btn>
        <q-btn dense flat @click="clearAddress" class="paste-btn">
          <q-icon name="fa-solid fa-refresh" />
          <q-tooltip>Clear Address and Re-scan</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section class="reqkkb-container">
      <q-checkbox v-model="rememberMe" class="q-remember-me" label="Remember Address" checked/>
      <q-btn 
        class="proceed-btn text-capitalize" 
        label="Request Paysplit" 
        @click="checkAddress()" 
        unelevated 
        rounded 
        color="primary"
      />
    </q-card-section>
  </q-card>
</q-dialog>

<!--________________________________________Add KKB expenses dialog _________________________________________--->

    <q-dialog v-model="addExpenseFormVisible" persistent>
      <q-card class="q-pa-md kkb-forms">
        <q-card-section class="add-expense-form-top-sec">
          <div class="text-h6 text-bold">Add Expenses</div>
          <q-checkbox v-model="basicMode" class="basic-mode-toggle" @update:model-value="onUpdateMode()" label="Quick Mode" checked/>
        </q-card-section>
        <q-card-section class="q-gutter-md" style="padding-bottom: 6px;">
          <div class="custom-field">
            <div class="custom-label">Category</div>
            <q-select v-model="category" :options="categories" dropdown-icon="arrow_drop_down" options-class="custom-dropdown" dense outlined class="custom-input c-br-1" />
          </div>

        </q-card-section>
        <q-card-section>
          <div class="header-row row q-pb-sm text-bold items-center full-width">
            <div class="item-name-header th-name">Item Name</div>
            <div class="field-group">
              <div class="quantity-header text-center th-name">Quantity</div>
              <div class="price-header text-center th-name">Price (PHP)</div>
              <div class="actions-header text-center"></div>
            </div>
          </div>
          <div class="q-list-container item-list-container">
            <q-list class="full-width">
              <q-item v-for="(item, index) in items" :key="index" class="q-pa-none list-item">
                <div class="row items-center full-width no-wrap" style="position: relative;">
                  <q-select v-model="item.name" :options="item.filteredSuggestions" use-input hide-selected fill-input dense outlined dropdown-icon="arrow_drop_down" options-class="custom-dropdown" class="item-name-field item-inputs" @filter="(val, update) => update(() => filterSuggestions(item, val))" />
                  <div class="field-group">
                    <q-input v-model.number="item.quantity" type="number" outlined dense class="quantity-field item-inputs custom-input" @update:model-value="(val) => item.quantity = Math.min(9999, parseInt(val) || 0)">
                      <template v-slot:append>
                        <div class="custom-arrows">
                          <q-btn dense flat icon="keyboard_arrow_up" @click="item.quantity = Math.min(9999, item.quantity + 1)" />
                          <q-btn dense flat icon="keyboard_arrow_down" @click="item.quantity = Math.max(1, item.quantity - 1)" />
                        </div>
                      </template>
                    </q-input>
                    <q-input v-model.number="item.price" type="number" outlined dense class="price-field item-inputs custom-input" @update:model-value="(val) => item.price = formatPrice(val)">
                      <template v-slot:append>
                        <span class="bch-unit">PHP</span>
                        <div class="custom-arrows">
                          <q-btn dense flat icon="keyboard_arrow_up" @click="increasePrice(item)" />
                          <q-btn dense flat icon="keyboard_arrow_down" @click="decreasePrice(item)" />
                        </div>
                      </template>
                    </q-input>
                    <q-btn icon="close" dense flat @click="removeItem(index)" class="delete-btn" />
                  </div>
                </div>
              </q-item>
            </q-list>
          </div>
          <q-btn label="Add Item" icon="add" @click="addItem" class="q-mt-md full-width action-btn text-capitalize" />
        </q-card-section>
        <q-card-section style="padding-top: 0px; padding-bottom: 0px;">
          <q-card-actions align="right" style="padding-right: 0px;">
            <q-btn label="Cancel" class="cancel-btn text-capitalize" flat @click="addExpenseFormVisible = false" />
            <q-btn class="proceed-btn text-capitalize" label="Split Payment" @click="splitPayment()" />
          </q-card-actions>
        </q-card-section>

      </q-card>
    </q-dialog>


<!--________________________________________Split KKB expenses dialog _________________________________________--->

<q-dialog  v-model="showSplitExpenseForm" persistent>
      <q-card  class="q-pa-md kkb-forms split-expense-q-card">
        <q-card-section class="split-expense-form-top">
          <div class="text-h6 text-bold">Split KKB Expenses</div>
          <q-checkbox v-model="basicMode" class="basic-mode-toggle" @update:model-value="onUpdateMode()" label="Quick Mode" checked/>
        </q-card-section>
        
        <q-card-section class="q-gutter-md" style="padding-bottom: 6px;">
          <div v-if="basicMode">
            <div class="custom-field">
              <div class="custom-label">Amount To Split</div>
              <q-input v-model.number="amountToSplit" type="number" dense outlined class="custom-input c-br-1" min="2" @update:model-value="onSetTotalAmount()">
                <template v-slot:append>
                  <span class="bch-unit basic-mode-amount-unit">PHP</span>
                  <div class="custom-arrows">
                    <q-btn dense flat icon="keyboard_arrow_up" @click="amountToSplit = Math.min(9999, amountToSplit + 100)" />
                    <q-btn dense flat icon="keyboard_arrow_down" @click="amountToSplit = Math.max(1, amountToSplit - 100)" />
                  </div>
                </template>
              </q-input>
            </div>
          </div>
          <div v-if="!basicMode">
            <div class="header-row text-bold">
              <q-item class="q-pa-none" style="min-height: 20px; box-sizing:border-box;">
                <span  style="min-width: 230px; text-align: left">Item(s)</span>
                <span  style="min-width: 60px; text-align: right;">Quantity</span>
                <span  style="min-width: 150px;text-align: right;">Price/Quantity</span>
                <span  style="min-width: 160px; text-align: right;">Total Prices</span>
              </q-item>
            </div>
            <div class="q-list-container item-list-tally-container">
              <q-list class="full-width item-list-tally">
                <q-item v-for="(item, index) in items" :key="index" class="q-pa-none item-tally-row">
                    <span class="field-text" style="min-width: 230px;">{{item.name}}  </span>
                    <span class="field-text" style="min-width: 60px; text-align: right;">x {{ item.quantity }}</span>
                    <span class="field-text" style="min-width: 150px;text-align: right;">{{ item.price }} <b style="color: darkgoldenrod;">PHP</b></span>
                    <span class="field-text" style="min-width: 160px; text-align: right;">{{ formatPrice(item.quantity * item.price) }} <b style="color: darkgoldenrod;">PHP</b></span>
                </q-item>
              </q-list>
            </div>
            <div class="text-bold footer-row">
              <q-item class="q-pa-none" style="min-height: 20px; box-sizing:border-box; position: sticky; bottom: 0;">
                <span style="min-width: 440px;text-align: right;">Total Amount: </span>
                <span class="field-text" style="min-width: 160px; text-align: right; padding-right: 2px;">{{this.getTotalPrice()}} <b style="color: darkgoldenrod;">PHP</b></span>
              </q-item>
            </div>
          </div>

          <div class="custom-field">
            <div class="custom-label">Split Type</div>
            <q-select v-model="splitType" :options="splitTypes" dropdown-icon="arrow_drop_down"
                  options-class="custom-dropdown" dense outlined class="custom-input c-br-1" @update:model-value="resetParticipants"/>
          </div>

          <!-- Split Equally -->
          <div v-if="splitType === 'Split Equally'">
            <div class="custom-field">
              <div class="custom-label">Number of Participants</div>
              <q-input v-model.number="participantCount" type="number" dense outlined class="custom-input c-br-1" min="2" @update:model-value="splitEqually"/>
            </div>
          </div>

          <!-- Split By Amount -->
          <div v-if="splitType === 'Split By Amount'">
            <div class="payer-list-container">
              <div class="participant-info">
                <div class="custom-label">Number of Participants</div>
                <div  class="participant-count-field" >
                  <div class="count-text">{{ this.participantCount }}</div>
                </div>
              </div>
              <div class="payer-list-wrapper">
                  <q-list>
                    <q-item v-for="(payer, index) in participants" :key="index" class="q-pa-none list-item">
                      
                        <q-input v-model="payer.name" dense outlined class="custom-input payer-name" placeholder="Payer Name"/>

                          
                        <q-input v-model.number="payer.amount" type="number" dense outlined class="custom-input payer-amount"
                                :max="getMaxAmount()" @update:model-value="adjustAmountsIfMismatch(payer)" >
                                <template v-slot:append>
                                  <span class="bch-unit">PHP</span>
                                  <div class="custom-arrows">
                                    <q-btn dense flat icon="keyboard_arrow_up" @click="increaseAmount(payer)" />
                                    <q-btn dense flat icon="keyboard_arrow_down" @click="decreaseAmount(payer)" />
                                  </div>
                                </template>
                        </q-input>

                        <q-btn icon="close" class="delete-btn" dense flat @click="removePayer(index)" :disable="participantCount <= 2" />
                    
                    </q-item>
                  </q-list>
              </div>
            </div>
            <q-btn label="Add Participant" icon="add" @click="addParticipant" class="q-mt-md full-width action-btn text-capitalize" />
          </div>

        </q-card-section>



        <q-card-section style="padding-top: 0px; padding-bottom: 0px;">
          <q-card-actions align="right" style="padding-right: 0px;">
            <q-btn label="Return" class="cancel-btn text-capitalize" flat @click="if(!basicMode) {showSplitExpenseForm = false; addExpenseFormVisible = true; } else{ showSplitExpenseForm = false;}" />
            <q-btn class="proceed-btn text-capitalize" label="Generate QR Codes" @click="confirmGenerate()"/>
          </q-card-actions>
        </q-card-section>

      </q-card>
    </q-dialog>


    <q-dialog v-model="showQRCodes" persistent>
  <q-card class="q-pa-md kkb-forms qrcode-form">
    <q-card-section>
      <div class="text-h6 text-bold">Payment QR Code</div>
    </q-card-section>

    <q-card-section class="q-pa-md flex items-center qrcode-pay-detail-con">
      <!-- Left Icon Button -->
      <div class="left-container">
        <q-btn 
          flat dense class="stretch-y-arrow"
          @click="prevQRCode"
          icon="arrow_left" 
          size="xl"
          :disabled="currentQRCodeIndex === 0"
        />

      </div>

      <!-- Center Container -->
      <div class="center-container flex flex-column items-center">
        <div v-if="participantsQRPairs[currentQRCodeIndex]?.paid" class="paid-stamp-bg">
          <div class="paid-stamp"></div>
        </div>
        <img
          v-if="participantsQRPairs.length > 0"
          :src="participantsQRPairs[currentQRCodeIndex].qrcode"
          alt="Payment QR Code"
          class="qrcode-img-large"
        />
        <p v-else class="text-grey">Loading QR Code...</p>

        <!-- Payer Name & Amount under QR Code -->
        <div v-if="participants.length > 0" class="text-center q-mt-md text-h6">
          <div><span class="text-bold">Name: </span><span>{{ participantsQRPairs[currentQRCodeIndex]?.name}}</span></div>
          <div><span class="text-bold">Amount (PHP): </span>{{ parseFloat(participants[currentQRCodeIndex]?.amount).toFixed(2)}} <span>Pesos</span></div>
          <div><span class="text-bold">Amount (BCH): </span>{{ parseFloat(participantsQRPairs[currentQRCodeIndex]?.amount).toFixed(7)}} <span>BCH</span></div>
        </div>
      </div>

      <!-- Right Icon Button -->
      <div class="right-container">
        <q-btn 
          flat dense class="stretch-y-arrow"
          @click="nextQRCode"
          icon="arrow_right"
          size="xl"
          :disabled="currentQRCodeIndex >= participantsQRPairs.length - 1"
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Complete" color="primary" @click="completePaysplit()" />
    </q-card-actions>
  </q-card>
</q-dialog>




    <q-page-container>
    
    </q-page-container>
  </q-layout>
</template>

<script>
  import { QrcodeStream } from "vue-qrcode-reader";
  import * as secp256k1 from "secp256k1";
  import bs58 from "bs58";
  import cashaddr from "cashaddrjs";
  import CryptoJS from "crypto-js";
  import QRCode from "qrcode";
  import axios from 'axios';

  export default {
    components: { QrcodeStream },
    data() {
      return {
        basicMode: true,
        bchAddress: "",
        rememberMe: true,
        getStartedDialog : false,
        addExpenseFormVisible: false,
        showSplitExpenseForm: false,
        showQRCodes: false,
        maxIntegerLength: 7,
        maxDecimalLength: 2,
        category: 'Food',
        participantCount: 2,
        pauseCam: false,
        
        validAddress: false,
        paymentAmounts : [],
        privateKeyWIF:"",
        publicKeyHex:"",
        bitcoinCashAddress: "",

        participants: [
          { name: this.generateRandomName(), amount: 0 },
          { name: this.generateRandomName(), amount: 0 }
        ],
        splitType: 'Split Equally',
        splitTypes: ['Split Equally',  'Split By Amount'], //'Split By Items',
        items: [],
        amountToSplit: 1,
        categories: ['Food', 'Entertainment', 'Family', 'Friends', 'Activities', 'Gift', 'Shopping', 'Transportation', 'Travel', 'Utilities', 'Others'],
        itemSuggestions: {
          Food : [ "Rice", "Bread", "Milk", "Eggs", "Meat", "Fish", "Vegetables", "Fruits", "Snacks", "Soda", "Juice", "Coffee", "Tea", "Beer", "Wine", "Fast Food", "Barbeque", "Chicken Meat", "Spagetti", "Pizza", "Burger", "Pasta", "Noodles", "Yogurt", "Cheese", "Oatmeal", "Cereal", "Condiments", "Ketsup", "Sauce", "Spices", "Cooking Oil", "Frozen Meals", "Deli Meats", "Baked Goods", "Cookies", "Cake",  "Donuts", "Ice Cream", "Smoothies", "Protein Powder", "Energy Drinks", "Specialty Sauces", "Ethnic Cuisine Ingredients", "Meal Delivery Service", "Restaurant Takeout", "Prepared Salads", "Seafood (Shellfish, etc.)"],
          Entertainment : [ "Movie Ticket", "Concert Ticket", "Streaming Subscription", "Video Game", "Board Game", "Sports Ticket", "Book", "Magazine", "Music Album", "Karaoke Session", "Theater Play Ticket", "Museum Admission", "Art Gallery Visit", "Amusement Park Ticket", "Escape Room", "Comedy Show", "Podcast Subscription", "Audiobook", "Online Course", "Virtual Reality Experience", "Live Music Venue", "Festival Entry", "Dance Performance", "Opera Ticket", "Ballet Ticket"],
          Family : [ "Baby Diapers", "Baby Formula", "School Supplies", "Toys", "Medicine", "Cleaning Supplies", "Family Dinner", "Grocery Items", "Pet Food", "Home Essentials", "Children's Clothing", "Educational Games", "Family Outing (Zoo, Park)", "Birthday Party Supplies", "Family Photoshoot", "Home Improvement Items", "Garden Supplies", "Holiday Decorations", "Pet Grooming", "Household Repairs", "Children's Books", "Sports Equipment for Kids", "Youth Sports Fees", "Tutoring Services", "Family Vacation", "Kids Haircuts"],
          Friends : ["Drinks", "Snacks", "Fast Food", "Board Games", "Movie Night", "Concert Ticket", "Gift", "Shared Meal", "Party Supplies", "Trip Contribution", "Game Night Supplies", "Potluck Ingredients", "Bar Tab", "Coffee Shop Visit", "Hiking Trip Supplies", "Road Trip Fuel", "Group Activity Fees (Bowling, Mini Golf)", "Escape Room Fees", "Weekend Getaway", "Sporting Event Tickets", "Picnic Supplies", "Theme Park Visit", "Club Entry Fee", "Cooking Class", "Wine Tasting"],
          Activities : [ "Gym Membership", "Yoga Class", "Dance Lesson", "Swimming Fee","Hiking Gear", "Camping Tent", "Bike Rental", "Sports Equipment", "Skateboard", "Surfboard", "Martial Arts Class", "Rock Climbing", "Kayaking Rental", "Fishing Gear", "Golf Fees", "Tennis Court Rental", "Art Supplies", "Photography Equipment", "Music Instrument Lessons", "Pottery Class", "Sailing Lesson", "Running Shoes", "Personal Trainer", "Cycling Gear", "Meditation Retreat"],
          Gift : [ "Flowers", "Chocolates", "Perfume", "Watch", "Jewelry", "Book", "Toy", "Handbag", "Gift Card", "Personalized Mug", "Cake", "Clothes", "Accessories", "Spa Day", "Experience Gift (Cooking Class, Wine Tasting)", "Tech Gadget", "Home Decor Item", "Subscription Box", "Artwork", "Plants", "Wallet", "Scarf", "Gloves", "Custom Portrait", "Framed Photo", "Tool Set", "Portable Speaker", "Gift Basket"],
          Shopping : ["Clothes", "Shoes", "Bag", "Accessories", "Makeup", "Skincare", "Electronics", "Gadget", "Furniture", "Appliances", "Books", "Home Decor", "Kitchenware", "Bedding", "Towels", "Curtains", "Lighting", "Gardening Tools", "Power Tools", "Hardware Supplies", "Sporting Goods", "Craft Supplies", "Stationery", "Pet Supplies", "Luggage", "Travel Accessories", "Office Supplies"],
          Transportation : ["Bus Ticket", "Train Ticket", "Taxi Fare", "Fuel", "Toll Fee", "Parking Fee", "Car Rental", "Bike Rental", "Ride-sharing Fare", "Flight Ticket", "Ferry Ticket", "Motorcycle Rental", "Scooter Rental", "Public Transportation Pass", "Car Maintenance", "Car Insurance", "Bicycle Repair", "Airplane Baggage Fees", "Airport Parking", "Shuttle Service", "Boat Fuel", "Helicopter Tour", "Personal Driver", "Car Wash", "Roadside Assistance"],
          Travel : [ "Hotel Booking", "Flight Ticket", "Tour Package", "Souvenirs","Travel Insurance", "Car Rental", "Backpack", "Luggage", "Tour Guide Fee", "Transportation Pass", "Airbnb Booking", "Hostel Stay", "Cruise Ticket", "Travel Visa", "Vaccinations", "Currency Exchange", "Day Trip Excursions", "Local SIM Card", "Travel Adapter", "Maps", "Travel Pillow", "Travel First Aid Kit", "Language Translation Device", "Travel Journal", "Photography Tour"],
          Utilities : [ "Electric Bill", "Water Bill", "Internet Bill", "Phone Bill", "Cable Subscription", "Gas Bill", "Garbage Collection", "Rent", "Maintenance Fee", "Housekeeping Service", "Security System", "Pest Control", "Lawn Care", "Pool Maintenance", "Home Insurance", "Renter's Insurance", "Storage Unit", "Satellite TV", "Streaming Services (Separate from Entertainment)", "Smart Home Devices", "Water Softener", "HVAC Maintenance", "Appliance Repair", "Landline Phone", "Alarm System Monitoring"],
          Others : [ "Donation", "Charity", "Miscellaneous Expense", "Subscription", "Printing Service", "Courier Service", "Postage Fee", "Legal Fees", "Accounting Services", "Financial Advisor Fees", "Online Learning Platform", "Software Subscription", "Domain Name Registration", "Web Hosting", "Bank Fees", "Health Insurance", "Life Insurance", "Asset Insurance", "Tax Preparation", "Professional Association Dues", "Notary Services", "Copywriting Services", "Graphic Design Services", "Event Planning", "Software Development"],
        },
        
        currentQRCodeIndex: 0,
        participantsQRPairs: [
          { name: this.generateRandomName(), amount: 0 , qrcode: null, paid: false},
          { name: this.generateRandomName(), amount: 0 , qrcode: null, paid: false},
        ],
        worker: null,
        tempWalletBalance: 0,

      };
    },
    mounted(){
      window.getStarted = this.getStarted;
    },
    methods: {
      getStarted(){
        
        this.getStartedDialog = !this.getStartedDialog; 
        this.retrieveAddress();
      },
      goToHome(){
        this.$router.push('/');
      },
      goToHowItWorks(){
        this.$router.push('/how-it-works');
      },
      async pasteAddress(){
          try {
            const text = await navigator.clipboard.readText(); // Read clipboard content
            //console.log("Clipboard content:", text);
            this.bchAddress = text;
            this.pauseCam = true;
          } catch (err) {
            console.error("Failed to read clipboard:", err);
          }
      },
      saveInitiatorAddress(){
          if(this.rememberMe){
            localStorage.setItem('bchpadd', this.bchAddress);
            this.$q.notify({
              type: 'positive',
              message: 'Public address saved!',
              position: 'top'
            });
          }
          else{
            localStorage.removeItem('bchpadd');
            //console.log('Saved Address removed:');
          }
      },

      checkAddress(){
          if(this.bchAddress===''){
            this.$q.notify({
              type: 'negative',
              message: 'Please scan your Paytaca wallet public address QR code or paste it manually.',
              position: 'top'
            });
            this.pauseCam = false;
          }
          else{
            const cleanAdd = this.bchAddress.split(':')[1];
            const pref =  this.bchAddress.split(':')[0];
            //console.log("Clean Address: ", cleanAdd);
            if((pref === 'bitcoincash') && cleanAdd && (cleanAdd.length === 42) && !(/[^a-zA-Z0-9]/.test(cleanAdd)) && (cleanAdd.charAt(0) === 'q')){
              this.validAddress = true;
              this.showAddExpenseForm();
              this.saveInitiatorAddress();
              this.getStartedDialog = !this.getStartedDialog;
            }
            else{
              this.validAddress = false;
              this.$q.notify({
                type: 'negative',
                message: 'Paytaca wallet address is invalid!',
                position: 'top'
              });
              this.clearAddress();
            }         
          }  
      },

      showAddExpenseForm(){
        if(this.basicMode){
          this.addExpenseFormVisible = false;
          this.showSplitExpenseForm = true;
        }
        else{
          this.addExpenseFormVisible = true;
        }
        this.resetParticipants();
      },

      onSetTotalAmount(){
          if(this.basicMode && this.amountToSplit && this.amountToSplit > 0){
            this.items = [];
            this.items.push({ name: 'Item Bundle', quantity: 1, price: this.amountToSplit, filteredSuggestions: [] });
          }
          this.resetParticipants();
      },

      onUpdateMode(){
          this.items = [];
          this.resetParticipants();
          this.splitType = 'Split Equally';
          if(!this.basicMode){
            this.showSplitExpenseForm = false;
            this.addExpenseFormVisible = true;
          }
          else{
            this.showSplitExpenseForm = true;
            this.addExpenseFormVisible = false;
          }
      },

      clearAddress(){
        this.bchAddress = '';
        this.pauseCam = false;
      },

      onManualAdressInput(){
        if(this.bchAddress){
          this.pauseCam = true;
        }
        else{
          this.pauseCam = false;
        }
      },

      retrieveAddress(){
        const savedadd = localStorage.getItem('bchpadd');
        //console.log('Saved Address:', savedadd);
        if(savedadd){
          this.bchAddress = savedadd;
          this.pauseCam = true;
        }
      },

      onScannerInit () {
        //console.log('camera set up successfully')
      },
      onCameraError (error) {
        const vm = this
        //console.log('error', error)
        if (error.name === 'NotAllowedError') {
          // user denied camera access permission
          vm.error = vm.$t('CameraPermissionErrMsg1');
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
          vm.error = vm.$t('CameraPermissionErrMsg2');
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
          vm.error = vm.$t('CameraPermissionErrMsg3');
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
          vm.error = vm.$t('CameraPermissionErrMsg4');
        } else if (error.name === 'OverconstrainedError') {
          vm.frontCamera = false;
          // did you request the front camera although there is none?
          vm.error = vm.$t('CameraPermissionErrMsg5');
        } else if (error.name === 'StreamApiNotSupportedError') {
          // browser seems to be lacking features
          console.log(error)
        } else {
          vm.error = vm.$t('UnknownErrorOccurred') + ': ' + error.message;
        }
      },
      async onQRDecode (content) {

        if (content) {
          this.bchAddress = content[0].rawValue.split("?amount=")[0];
          this.pauseCam = true;
        }
      },

      addItem() {
        this.items.push({ name: '', quantity: 1, price: 1, filteredSuggestions: [] });
      },
      removeItem(index) {
        this.items.splice(index, 1);
      },
      formatPrice(val) {
        let formatted = parseFloat(val).toFixed(this.maxDecimalLength);
        let maxLength = this.maxDecimalLength + this.maxIntegerLength;
        return parseFloat(formatted.length > maxLength ? formatted.substring(0, maxLength) : formatted);
      },
      increasePrice(item) {
        item.price = this.formatPrice((parseFloat(item.price) + 1));
      },
      decreasePrice(item) {
        item.price = this.formatPrice(Math.max(0, (parseFloat(item.price) - 1)));
      },
      filterSuggestions(item, val = '') {
        item.filteredSuggestions = val ? this.itemSuggestions[this.category].filter(suggestion => suggestion.toLowerCase().includes(val.toLowerCase())) : this.itemSuggestions[this.category];
      },
      splitPayment() {
        if(this.items.length === 0){
          this.$q.notify({
            type: 'negative',
            message: 'Please add items first before proceeding.',
            position: 'top'
          });
          return;
        }
        let hasEmptyField = false;
        for (let i = 0; i < this.items.length; i++) {
          if (!this.items[i].name || this.items[i].name.trim() === '') {
            hasEmptyField = true;
            break;
          }
        }
        if (hasEmptyField) {
          this.$q.notify({
            type: 'negative',
            message: 'Please fill in all item fields before proceeding.',
            position: 'top'
          });
          return;
        }
        //console.log("Items:", this.items);
        this.addExpenseFormVisible = false;
        this.showSplitExpenseForm = true;
        this.splitType = "Split Equally";
        this.resetParticipants();
      },

      getTotalPrice(){
        if(this.basicMode){
          return this.amountToSplit;
        }
        let total = 0;
        this.items.forEach(item => {
            total += (item.price * item.quantity);
        });
        return total;
      },

      resetParticipants() {
        this.participantCount = 2;
        this.participants = [];
        if (this.splitType === 'Split Equally'){
          this.participants =  [
              { name: this.generateRandomName(), amount: 0 },
              { name: this.generateRandomName(), amount: 0 }
            ];
          this.splitEqually();
        }
        if (this.splitType === 'Split By Amount') {
          this.participants = [
            { name: this.generateRandomName(), amount: (this.getTotalPrice() > 1) ? 1 : this.formatPrice(this.getTotalPrice()/2) },
            { name: this.generateRandomName(), amount: (this.getTotalPrice() > 1) ? this.formatPrice(this.getTotalPrice() - 1) : this.formatPrice(this.getTotalPrice()/2) }
          ];
        }
        
        
      },
      splitEqually(){
          //console.log("Participant count: ", this.participantCount);
          if(this.participantCount >= 2){
              this.participants = [];
              for(let n = 0; n < this.participantCount; n++){
                this.participants.push( { name: this.generateRandomName(), amount: 0 });
              }
              this.participants.forEach(payer => {
                  payer.amount = this.formatPrice(this.getTotalPrice() / this.participantCount);
              })
              //console.log("Equal Split Amount: ", this.participants);
          }
          else{
            this.participantCount = 2;
            this.splitEqually();
          }
      },
      
      addParticipant() {
          this.participantCount += 1;
          let highestPayer = this.getHighestPayer();
          if (highestPayer && highestPayer.amount > 1) {
              let newParticipantAmount = 1;
              let updatedHighestAmount = this.formatPrice(highestPayer.amount - newParticipantAmount);
              if (updatedHighestAmount < 0) {
                  newParticipantAmount += updatedHighestAmount;
                  updatedHighestAmount = 0;
              }
              highestPayer.amount = updatedHighestAmount; 
              this.participants.push({ name: this.generateRandomName(), amount: newParticipantAmount });
              this.adjustAmountsIfMismatch();
          }
          else{
            this.$q.notify({
              type: 'negative',
              message: 'Cannot add any more participants.',
              position: 'top'
            });
          }
      },

      getHighestPayer(excludeIndex = -1) {
        return this.participants.reduce((highest, payer, index) =>
          (index !== excludeIndex && payer.amount > highest.amount) ? payer : highest, { amount: 0 });
      },
      getMaxAmount() {
        return (this.getTotalPrice() - 1).toFixed(this.maxDecimalLength);
      },
      generateRandomName() {
        return 'Payer ' + Math.random().toString(36).substring(7).toUpperCase();
      },
      removePayer(index) {
          if (this.participants.length > 2) {
              let removedPayer = this.participants[index];
              this.participants.splice(index, 1);
              this.participantCount -= 1;

              let highestPayer = this.getHighestPayer();
              if (highestPayer) {
                  highestPayer.amount = this.formatPrice(highestPayer.amount + removedPayer.amount);
              }
              this.adjustAmountsIfMismatch();
          }
      },
      increaseAmount(payer){
        if(payer.amount <= this.getTotalPrice() - ((this.participantCount) * 1)){
          payer.amount = this.formatPrice(Math.max(0, (parseFloat(payer.amount) + 1)));
          this.adjustAmountsIfMismatch(payer);
        }
        else{
          this.$q.notify({
            type: 'negative',
            message: 'Total value cannot exceed the total amount to pay.',
            position: 'top'
          });
          return;
        }
        
      },
      decreaseAmount(payer){
        if(payer.amount > 1){
          payer.amount = this.formatPrice(Math.max(0, (parseFloat(payer.amount) - 1)));
          this.adjustAmountsIfMismatch(payer);
        }
        else{
          this.$q.notify({
            type: 'negative',
            message: 'The payment amount cannot go any lower.',
            position: 'top'
          });
          return;
        }

      },
      adjustAmountsIfMismatch(excludePayer = null) {
        let totalAssigned = this.participants.reduce((sum, p) => sum + p.amount, 0);
        let difference = this.getTotalPrice() - totalAssigned;

        if (difference !== 0) {
            let filteredParticipants = excludePayer 
                ? this.participants.filter(p => p.name !== excludePayer.name) 
                : this.participants;
            let maxAmount = Math.max(...filteredParticipants.map(p => p.amount));
            let highestPayers = filteredParticipants.filter(p => p.amount === maxAmount);
            if (highestPayers.length > 0) {
                let payerToAdjust = highestPayers[0]; 
                payerToAdjust.amount = this.formatPrice(payerToAdjust.amount + difference);
            }
        }
    },

    confirmGenerate() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to proceed? You cannot return.',
        cancel: true, // Show the cancel button
        persistent: true, // Prevent closing by clicking outside
        class: "confirm-dialog"
      }).onOk(() => {
        this.generateQRCodes();
        this.showSplitExpenseForm = false;
      }).onCancel(() => {
        //--
      });
    },
    async generateQRCodes(){
      //console.log("Total" ,this.amountToSplit);
      if(this.getTotalPrice() && this.getTotalPrice() > 0){
        this.participantsQRPairs = [];
        let amounts = [];
        let bchPesoPrice;
        try {
          const response = await axios.get('https://watchtower.cash/api/bch-prices/?currencies=php');
          bchPesoPrice = response.data[0].price_value; 
          console.log("PriceBCH: ", bchPesoPrice);
        } catch (err) {
          //error.value = 'Failed to fetch BCH price';
          console.error(err);
        }
        if(!bchPesoPrice && bchPesoPrice == 0){
            this.$q.notify({
              type: 'negative',
              message: 'Error Occurred! Cannot fetch BCH price.',
              position: 'top'
            });
           return;
        }
        this.participants.forEach(payer => {
          //console.log("1 PHP = ", (1/bchPesoPrice), "Res: ", payer.amount*(1/bchPesoPrice));
          amounts.push(payer.amount*(1/bchPesoPrice));
        });
        //console.log("Amts: ", amounts);
        this.paymentAmounts = amounts;
        //console.log("Amots: ", this.paymentAmounts);
        await this.generateNewKeys();

        console.log("t-ADDRESS: ", this.bitcoinCashAddress);
        this.showQRCodes = true;
        this.startBalanceWorker();
      }
      else{
        this.$q.notify({
          type: 'negative',
          message: 'Please enter an amount greater than 1PHP to proceed.',
          position: 'top'
        });
      }
      
    },


    prevQRCode() {
      if (this.currentQRCodeIndex > 0) {
        this.currentQRCodeIndex -= 1;
      }
    },

    nextQRCode() {
      if (this.currentQRCodeIndex < this.participantsQRPairs.length - 1) {
        this.currentQRCodeIndex += 1;
      }
    },

    completePaysplit(){
        //----
    },


    //-----------important----------------------------------





    async sha256(data = '', encoding = 'utf8') {
      let buffer;

      if (data instanceof Uint8Array) {
        buffer = data;
      } else if (encoding === 'utf8') {
        buffer = new TextEncoder().encode(data);
      } else if (encoding === 'hex') {
        buffer = this.hexToBin(data);
      } else {
        throw new Error('Unsupported encoding type');
      }

      // Use window.crypto.subtle explicitly
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      return this.binToHex(new Uint8Array(hashBuffer));
    },

    
    // Generates new private and public keys, WIF, and Bitcoin Cash address
    async generateNewKeys() {
      const privateKey = await this.generatePrivateKey();
      this.privateKeyWIF = privateKey.wif;
      this.publicKeyHex = privateKey.publicKey;
      this.bitcoinCashAddress = privateKey.address;
      await this.generatePublicQRCodes();
    },
    
    // Generates a private key, derives public key and Bitcoin Cash address
    async generatePrivateKey() {
      // Generate a 32-byte private key using browser crypto API
      const privateKey = new Uint8Array(32);
      window.crypto.getRandomValues(privateKey);

      // Generate compressed public key
      const publicKey = secp256k1.publicKeyCreate(privateKey, true);

      const privateKeyHex = this.binToHex(privateKey);
      const publicKeyHex = this.binToHex(publicKey);

      const privateKeyHash = await this.sha256(privateKeyHex, 'hex');
      const publicKeyHash = await this.sha256(publicKeyHex, 'hex');

      const sha256Hash = await this.sha256(publicKeyHex, 'hex');
      const ripemdHash = this.ripemd160(this.hexToBin(sha256Hash));
      const extendedKey = new Uint8Array([0x80, ...privateKey, 0x01]);
      const hashWif1 = await this.sha256(extendedKey, 'hex');
      const hashWif2 = await this.sha256(this.hexToBin(hashWif1), 'hex');
      const checksumWif = this.hexToBin(hashWif2).slice(0, 4);
      const wifKey = new Uint8Array([...extendedKey, ...checksumWif]);
      const finalWIF = this.binToBase58(wifKey);

      return {
        privateKey: privateKeyHex,
        privateKeyHash,
        publicKey: publicKeyHex,
        publicKeyHash,
        address: this.encodeCashAddress({
          prefix: 'bitcoincash',
          type: 'P2PKH',
          payload: ripemdHash,
        }),
        wif: finalWIF
      };
    },


    
    
    // Updates the public QR code with a payment amount
    async generatePublicQRCodes() {
    
      for(let n = 0; n < this.paymentAmounts.length; n++){
          const cleanAddress = this.bitcoinCashAddress.replace(/^bitcoincash:/, '');
          let qrDataPublic = `bitcoincash:${cleanAddress}`;
          this.publicWalletAddress = qrDataPublic;
          //console.log("Address: ", this.publicWalletAddress);
          qrDataPublic += `?amount=${this.paymentAmounts[n]}`;
          //console.log("Address: ", qrDataPublic);
          let paid = false;
          if(this.paymentAmounts[n] === 0){
            paid = true;
          }
          try {
              let qrcode1 = await QRCode.toDataURL(qrDataPublic, {
                errorCorrectionLevel: 'L',
              });
              this.participantsQRPairs.push({
                name: this.participants[n].name,
                amount: this.paymentAmounts[n],
                qrcode: qrcode1,
                paid: paid,
              });
              console.log("PAmt: ", this.paymentAmounts[n]);
              //this.qrCodes.push(qrcode1);
          } catch (error) {
              console.error(`Error generating QR code for ${cleanAddress}:`, error);
              return;
          }
          
      }
    },

        // Convert Uint8Array to Hex
    binToHex(uint8Array) {
      return Array.from(uint8Array)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    },

    // Convert Hex to Uint8Array
    hexToBin(hex) {
      return new Uint8Array(
        hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
      );
    },

    // Convert Uint8Array to Base58 (if needed for WIF key)
    binToBase58(uint8Array) {
      return bs58.encode(uint8Array); // Requires 'bs58' library
    },

    ripemd160(buffer) {
      return new Uint8Array(
        CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(this.binToHex(buffer)))
          .toString(CryptoJS.enc.Hex)
          .match(/.{1,2}/g)
          .map(byte => parseInt(byte, 16))
      );
    },

    
    encodeCashAddress({ prefix, type, payload }) {
      return cashaddr.encode(prefix, type.toUpperCase(), payload);
    },

    //---------- for temp wallet balance monitoring ---------------

    startBalanceWorker() {
      if (window.Worker) {
        this.worker = new Worker(new URL("./balanceWorker.js", import.meta.url), { type: "module" });

        this.worker.onmessage = (event) => {
          if (event.data.error) {
            console.error(event.data.error);
          } else {
            const updatedBalance = event.data.balance;
            const balChange = updatedBalance - this.tempWalletBalance;
            if(balChange > 0){
              if(parseFloat(balChange).toFixed(7) === parseFloat(this.participantsQRPairs[this.currentQRCodeIndex].amount).toFixed(7)){
                this.participantsQRPairs[this.currentQRCodeIndex].paid = true;
              }
              else{ //countermeasure
                  for(var i = 0; i < this.participantsQRPairs.length; i++){
                    if(parseFloat(balChange).toFixed(7) === parseFloat(this.participantsQRPairs[i].amount).toFixed(7)){
                      this.participantsQRPairs[i].paid = true;
                      break;
                    }
                  }
              }
              this.tempWalletBalance = updatedBalance;
            }
            console.log("Updated Balance:", updatedBalance);
          }
        };

        this.worker.postMessage({ address: this.address });
      } else {
        console.error("Web Workers not supported in this browser.");
      }
      if (this.worker) {
        this.worker.postMessage({ address: this.bitcoinCashAddress });
      }
    },
    
    stopBalanceWorker() {
      if (this.worker) {
        this.worker.terminate();
        this.worker = null;
      }
    },


    }

  };
</script>
