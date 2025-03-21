let address = null;

self.onmessage = function (event) {
  if (event.data.address) {
    address = event.data.address;
    console.log("Received Address:", address);
    startFetchingBalance();
  }
};

const startFetchingBalance = () => {
  if (!address) return;

  const fetchBalance = async () => {

    /*const response = await fetch(
    `https://watchtower.cash/api/balance/bch/${encodeURIComponent(address)}`
    );
    const data = await response.json();
    self.postMessage(data);*/

    //----------Balance Change simulator --------------//
    setTimeout(() => {
        self.postMessage({
            "valid": true,
            "address": "bitcoincash:qp2kx4v6vfzhvy54kdrc5l7grtwn6yvcayz0s0l7rk",
            "spendable": 0,
            "balance": 0.000026276761567818743,
          });
    }, 3000);
    //----------------------------------------------------//

  };

  fetchBalance();
  setInterval(fetchBalance, 3000);
};
