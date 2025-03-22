
# Paytaca Paysplit Project (Recent Changes)

- Added a default "Quick Mode" to main function dialogs. The initiator only needs to directly input the total price amount to split.
- Changed background colors for better visibility. (Animated image background overlay is temporary.
- Scaled-up the dialog sizes for better visibility.
- Changes display currency to pesos (PHP) and modified the scripts amount increments and decrements
- Modified scripts to accommodate the added 'Quick Mode'.
- Added a confirmation dialog when "Generate QR Codes" is clicked. The user cannot return to paysplit setup once the wallet and the qrcodes are generated.
- send api requests to watchtower.cash to monitor balance changes in the generated temporary wallet.
- added network fee amount and equally allocate to the number of participants
- Payment is now sequential and a payer checklist was added.
- Finish button is disabled until all the payers have paid.

## Next targets:
  - automatically transfer the accumulated amount to the initiator's wallet
  - [Important] Temporarily save the generated wallet locally for a certain period of time. In case of unexpected situations where the payment process is interrupted mid-way(e.g. Sudden power loss, internet disconnection, page/session refresh, etc), the initiator can still resume the interrupted transaction. The temporary wallet can only be forgotten when the transfer process to the initiator's wallet is completed or when the temporary wallet is empty.






## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npx quasar dev
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
"#paysplit" 
>>>>>>> 57e92b5 (my first commit)
