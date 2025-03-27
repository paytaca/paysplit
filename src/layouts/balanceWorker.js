let address = null;

self.onmessage = function (event) {
  if (event.data.address) {
    address = event.data.address;
    startFetchingBalance();
  }
};

const startFetchingBalance = () => {
  if (!address) return;

  const fetchBalance = async () => {

    const response = await fetch(`https://api.haskoin.com/bch/address/${encodeURIComponent(address)}/balance`);
    const data = await response.json();
    //console.log(data);
    self.postMessage(data);

  };

  fetchBalance();
  setInterval(fetchBalance, 2000);
};
