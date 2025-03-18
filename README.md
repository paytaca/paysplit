
# Paytaca Paysplit Project (Recent Changes)

- Modified UIs for QR-code Scanner dialog. 'Clear and Re-scan' icon button was added.
- Auto-pause and auto-resume qrcode-stream camera when the bch address is filled and emptied.
- BCH address saving through localStorage so users need not to fill-in their bch address next session.
- Changed backdrop/background color for the 'main-function' dialogs to light-reddish-pink.
- Changed the site icon and site/app name
- Fixed the viewport width for better visibility in mobile browsers
- Linked the 'Use Paysplit Now' button in IndexPage.vue to the 'getStarted' function in MainLayout.vue
- Fixed the tall height of "paused frame" canvas when qrcode-stream is paused and added a matching style
- Added BCH address input validation

## Next targets:
  - New layout for generated qr-codes display dialog.
  - Preload the image successfully to avoid background-image loading when dialog shows up for the first time after reload.

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
