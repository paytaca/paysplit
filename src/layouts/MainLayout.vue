<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
  <q-toolbar>
    <q-toolbar-title>
      <div class="paytaca-logo-con"></div>
      <div class="kkb-title">Paysplit</div>
    </q-toolbar-title>

    <q-btn flat dense class="toolbar-btn" label="Get Started" @click="getStartedDialog = !getStartedDialog" />
  </q-toolbar>
</q-header>

<q-dialog v-model="getStartedDialog">
  <q-card class="floating-dialog">
    <q-card-section class="">
      <qrcode-stream
        @detect="onQRDecode"
        @camera-on="onScannerInit"
        @error="onCameraError">
      </qrcode-stream>

      <div v-if="scannedCode" class="q-mt-md">
        <q-banner dense class="bg-green text-white">
          Scanned QR Code: {{ scannedCode }}
        </q-banner>
      </div>
    </q-card-section>
    <q-btn class="proceed-btn float-btn text-capitalize" label="Request KKB" @click="showAddExpenseForm = true"/>
  </q-card>
</q-dialog>

<!--________________________________________Add KKB expenses dialog _________________________________________--->

    <q-dialog v-model="showAddExpenseForm" persistent>
      <q-card class="q-pa-md kkb-forms">
        <q-card-section>
          <div class="text-h6 text-bold">Add KKB Expenses</div>
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
              <div class="price-header text-center th-name">Price (BCH)</div>
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
                        <span class="bch-unit">BCH</span>
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
            <q-btn label="Cancel" class="cancel-btn text-capitalize" flat @click="showAddExpenseForm = false" />
            <q-btn class="proceed-btn text-capitalize" label="Split Payment" @click="splitPayment()" />
          </q-card-actions>
        </q-card-section>

      </q-card>
    </q-dialog>


<!--________________________________________Split KKB expenses dialog _________________________________________--->

<q-dialog  v-model="showSplitExpenseForm" persistent>
      <q-card  class="q-pa-md kkb-forms split-expense-q-card">
        <q-card-section>
          <div class="text-h6 text-bold">Split KKB Expenses</div>
        </q-card-section>
        <q-card-section class="q-gutter-md" style="padding-bottom: 6px;">
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
                  <span class="field-text" style="min-width: 150px;text-align: right;">{{ item.price }} <b style="color: darkgoldenrod;">BCH</b></span>
                  <span class="field-text" style="min-width: 160px; text-align: right;">{{ formatPrice(item.quantity * item.price) }} <b style="color: darkgoldenrod;">BCH</b></span>
              </q-item>
            </q-list>
          </div>
          <div class="text-bold footer-row">
            <q-item class="q-pa-none" style="min-height: 20px; box-sizing:border-box; position: sticky; bottom: 0;">
              <span style="min-width: 440px;text-align: right;">Total Amount: </span>
              <span class="field-text" style="min-width: 160px; text-align: right; padding-right: 2px;">{{getTotalPrice()}} <b style="color: darkgoldenrod;">BCH</b></span>
            </q-item>
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
                                  <span class="bch-unit">BCH</span>
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

          <!-- Placeholder for the third condition 
          <div v-if="splitType === 'Split By Items'">
        
          </div>-->





        </q-card-section>



        <q-card-section style="padding-top: 0px; padding-bottom: 0px;">
          <q-card-actions align="right" style="padding-right: 0px;">
            <q-btn label="Return" class="cancel-btn text-capitalize" flat @click="showSplitExpenseForm = false; showAddExpenseForm = true;" />
            <q-btn class="proceed-btn text-capitalize" label="Generate QR Codes" />
          </q-card-actions>
        </q-card-section>

      </q-card>
    </q-dialog>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { QrcodeStream } from "vue-qrcode-reader";

  export default {
    components: { QrcodeStream },
    data() {
      return {
        scannedCode: null,
        getStartedDialog : false,
        showAddExpenseForm: false,
        showSplitExpenseForm: false,
        maxIntegerLength: 7,
        maxDecimalLength: 8,
        category: 'Food',
        participantCount: 2,
        participants: [
          { name: this.generateRandomName(), amount: 0 },
          { name: this.generateRandomName(), amount: 0 }
        ],
        splitType: 'Split Equally',
        splitTypes: ['Split Equally',  'Split By Amount'], //'Split By Items',
        items: [],
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
      };
    },
    methods: {
          // DESKTOP
      onScannerInit () {
        console.log('camera set up successfully')
      },
      onCameraError (error) {
        const vm = this
        console.log('error', error)
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
          this.scannedCode = content[0].rawValue;
        }
      },

      addItem() {
        this.items.push({ name: '', quantity: 1, price: 0.00001, filteredSuggestions: [] });
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
        item.price = this.formatPrice((parseFloat(item.price) + 0.00001));
      },
      decreasePrice(item) {
        item.price = this.formatPrice(Math.max(0, (parseFloat(item.price) - 0.00001)));
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
        console.log("Items:", this.items);
        this.showAddExpenseForm = false;
        this.showSplitExpenseForm = true;
        this.splitType = "Split Equally";
        this.resetParticipants();
      },

      getTotalPrice(){
        let total = 0;
        this.items.forEach(item => {
            total += (item.price * item.quantity);
        });
        return this.formatPrice(total);
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
          let totalAmount = this.getTotalPrice();
          this.participants = [
            { name: this.generateRandomName(), amount: 0.00001 },
            { name: this.generateRandomName(), amount: this.formatPrice(totalAmount - 0.00001) }
          ];

        }

      },
      splitEqually(){
          if(this.participantCount >= 2){
              this.participants.forEach(payer => {
                  payer.amount = this.formatPrice(this.getTotalPrice() / this.participantCount);
              })
              console.log("Equal Split Amount: ", this.participants);
          }
          else{
            this.participantCount = 2;
            this.splitEqually();
          }
      },
      
      addParticipant() {
          this.participantCount += 1;
          let highestPayer = this.getHighestPayer();
          
          if (highestPayer && highestPayer.amount > 0.00001) {
              let newParticipantAmount = 0.00001;
              let updatedHighestAmount = this.formatPrice(highestPayer.amount - newParticipantAmount);
              
              if (updatedHighestAmount < 0) {
                  newParticipantAmount += updatedHighestAmount;
                  updatedHighestAmount = 0;
              }
              highestPayer.amount = updatedHighestAmount; 
              this.participants.push({ name: this.generateRandomName(), amount: newParticipantAmount });
              this.adjustAmountsIfMismatch();
          }
      },

      getHighestPayer(excludeIndex = -1) {
        return this.participants.reduce((highest, payer, index) =>
          (index !== excludeIndex && payer.amount > highest.amount) ? payer : highest, { amount: 0 });
      },
      getMaxAmount() {
        return (this.getTotalPrice() - 0.00001).toFixed(this.maxDecimalLength);
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
        if(payer.amount <= this.getTotalPrice() - ((this.participantCount) * 0.00001)){
          payer.amount = this.formatPrice(Math.max(0, (parseFloat(payer.amount) + 0.00001)));
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
        if(payer.amount > 0.00001){
          payer.amount = this.formatPrice(Math.max(0, (parseFloat(payer.amount) - 0.00001)));
          this.adjustAmountsIfMismatch(payer);
        }
        else{
          this.$q.notify({
            type: 'negative',
            message: 'The payment amount must at least be 0.00001 or higher.',
            position: 'top'
          });
          return;
        }

      },
      adjustAmountsIfMismatch(excludePayer = null) {
        console.log('Payer:', excludePayer ? excludePayer.name : "None");
        
        let totalAmount = this.getTotalPrice();
        let totalAssigned = this.participants.reduce((sum, p) => sum + p.amount, 0);
        let difference = totalAmount - totalAssigned;

        if (difference !== 0) {
            // Filter out the excludePayer if it's not null
            let filteredParticipants = excludePayer 
                ? this.participants.filter(p => p.name !== excludePayer.name) 
                : this.participants;

            // Find the maximum amount from the remaining participants
            let maxAmount = Math.max(...filteredParticipants.map(p => p.amount));

            // Get the highest payers from the remaining participants
            let highestPayers = filteredParticipants.filter(p => p.amount === maxAmount);
            console.log('Highest Payers:', highestPayers.map(p => p.name));

            if (highestPayers.length > 0) {
                let payerToAdjust = highestPayers[0]; // Pick the first highest payer
                payerToAdjust.amount = this.formatPrice(payerToAdjust.amount + difference);
                console.log(`Adjusted ${payerToAdjust.name}'s amount by ${difference}, new amount: ${payerToAdjust.amount}`);
            }
        }
    },


    }
  };
</script>
