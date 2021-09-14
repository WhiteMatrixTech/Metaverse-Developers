(function () {
  'use strict';

  const FUNC_CODE = "0x6a4a2282"

  var mainAddr = '0x20dfb9803773f27d87c2c509091e565754431a0d'
  var testAddr = '0x90083eca3D9dd80920Cd80f4436125C802a9374d'

  var operaAddr = mainAddr

  const desiredNetwork = "1" // '1' 表示以太坊主网
  const price = 40000000000000000 // 单位：wei
  const GAS_LIMIT = '600000'
  var account

  var buyBtn = document.getElementById('J-buyBtn');
  var installBtn = document.getElementById('J-installBtn');
  var loginBtn = document.getElementById('J-loginBtn');
  var bugDialog = document.getElementById('J-buyDialog');
  var closeBtn = document.getElementById('J-closeBtn');

  const NFT_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "numberOfTokens",
          "type": "uint256"
        }
      ],
      "name": "mintSell",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ];


  var abiInterface = new ethers.utils.Interface(NFT_ABI)


  if (typeof window.ethereum == "undefined"){
      
      buyBtn.style.display='none'
      loginBtn.style.display='none'
  }else{
      installBtn.style.display='none'
      buyBtn.style.display='none'

      getAccount();
      checkNetVersion()
      
  }

  // 监听测试和主网切换钱包
  ethereum.on('chainChanged', (chainId) => {
    console.log("chainChanged", chainId)
    checkNetVersion()
  });

  const showAccount = document.querySelector('.showAccount');
  loginBtn.addEventListener('click', () => {
    getAccount();
  });

  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    buyBtn.style.display='block'
    loginBtn.style.display='none'
  }


  async function checkNetVersion(){
    const net_version = await ethereum.request({ method: 'net_version' });
    if (net_version != desiredNetwork) {
      operaAddr = testAddr
    }else{
      operaAddr = mainAddr
    }

  }

  var hideDialog = function hideDialog() {
    bugDialog.classList.add('fn-hidden');
  };
  buyBtn.addEventListener('click', function () {
    bugDialog.classList.remove('fn-hidden');
  });
  closeBtn.addEventListener('click', hideDialog);
  var mintMinusBtn = document.getElementById('J-mintMinusBtn');
  var mintNumber = document.getElementById('J-mintNumber');
  var mintAddBtn = document.getElementById('J-mintAddBtn');
  var mintPrice = document.getElementById('J-mintPrice');
  var mintTotal = document.getElementById('J-mintTotal');
  var mintBtn = document.getElementById('J-mintBtn');
  var priceForOne = 0.04;
  var number = 1;
  mintPrice.innerText = priceForOne;
  function doCount() {
    mintNumber.innerText = number;
    mintTotal.innerText = number * priceForOne;
  }
  doCount();
  mintMinusBtn.addEventListener('click', function () {
    if (number <= 1) {
      return;
    }
    number--;
    doCount();
  });
  mintAddBtn.addEventListener('click', function () {
    if (number >= 20) {
      return;
    }
    number++;
    doCount();
  });
  mintBtn.addEventListener('click', function () {
    sendTransaction(number)
    hideDialog();
  });


  function sendTransaction(num, callback){
    var value = price * num
    const params = [
      {
        from:ethereum.selectedAddress,
        to:operaAddr,
        value:'0x'+value.toString(16),
        data:abiInterface.encodeFunctionData("mintSell", [num])
      },
    ];
    console.log(params)
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result) => {
        console.log(result)
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        // If the request fails, the Promise will reject with an error.
        console.log(error)
      });
  }




}());