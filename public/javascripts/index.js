// Initialise the page objects to interact with
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const showChainId = document.querySelector('.showChainId');
const showNetwork = document.querySelector('.showNetwork');
const showBalance = document.querySelector('.showBalance');

// Initialise the active account and chain id
let activeAccount;
let activeChainId;
let activeNetwork;
let activeAccountBalance;


// Update the account and chain id when user clicks on button
ethereumButton.addEventListener('click', () => {
  getAccount();
  getChainId();
  getNetwork();
  getBalance();
});

// Get the account in the window object

async function getActiveAccount(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== activeAccount) {
      activeAccount = accounts[0];
    }
}

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== activeAccount) {
    activeAccount = accounts[0];
  }
  showAccount.innerHTML = activeAccount;
}

// Get the connected network chainId
async function getChainId() {
    activeChainId = await ethereum.request({ method: 'eth_chainId' });
    showChainId.innerHTML = activeChainId;
}
// Get The network

async function getNetwork() {
    chainIdForActiveNetwork = await ethereum.request({ method: 'eth_chainId' });
    networks = {
        '0x1':"Ethereum Mainnet",
        '0x5':"GoErli Testnet",
        '0xaa36a7':"Sepolia Testnet",
    };
    showNetwork.innerHTML =  networks[chainIdForActiveNetwork];
}
// Get The balance
async function getBalance() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const activeAccountBalance = await ethereum.request({ method: 'eth_getBalance', params: [accounts[0],'latest'] });
    // window.alert(activeAccountBalance);
    let wei = parseInt(activeAccountBalance,16);
    let balance = wei / (10**18);
    showBalance.innerHTML = balance;
}

// Update the selected account and chain id on change
ethereum.on('accountsChanged', getAccount);
ethereum.on('chainChanged', getChainId);