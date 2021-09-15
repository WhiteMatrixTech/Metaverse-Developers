import TronWeb from 'tronweb';

const tronWebInstance = {
  loggedIn: false,
  tronWeb: null,
  contract: null,
  loaded: false,
  loading: null,
};

function pollTronLink(maxTries, pollInterval) {

  return new Promise((resolve) => {
    const tronWebState = {
      installed: !!window.tronWeb,
      loggedIn: window.tronWeb && window.tronWeb.ready
    };
    console.log("pollTronLink------->",tronWebState)
    console.log("tronweb",window.tronWeb)
    // let tries;
    // const timer = setInterval(() => {
    if (tronWebState.installed) {
      // Logged in with TronLink
      // clearInterval(timer);
      resolve({ tronWeb: window.tronWeb, loggedIn: true });
    } else {
      const TRONGRID_API = 'https://api.trongrid.io';
      const tronApi = new TronWeb(TRONGRID_API,TRONGRID_API,TRONGRID_API);
      resolve({ tronWeb: tronApi, loggedIn: false });
    }
    //   if (tries >= maxTries) {
    //     // No TronLink - Create TronWeb instance for call methods

    //   }
    // }, pollInterval);
  });
}

export async function initTronWeb() {
  const { tronWeb, loggedIn } = await pollTronLink(5, 0);
  tronWebInstance.tronWeb = tronWeb;
  tronWebInstance.loggedIn = loggedIn;
  tronWebInstance.loaded = true;
}

export async function getTronWebInstance() {
  if (tronWebInstance.loaded) return tronWebInstance;
  if (!tronWebInstance.loading) {
    tronWebInstance.loading = initTronWeb();
  }
  await tronWebInstance.loading;
  return tronWebInstance;
}

export async function isOwner() {
  const { tronWeb, contract, loggedIn } = await getTronWebInstance();
  if (!loggedIn) return false;
  const owner = await contract.chairPerson().call();
  return owner === tronWeb.defaultAddress.hex;
}