const Web3 = require("web3");

const dreamBidFee = '0x7849cB5A5623670c328018d8778a75Da11F47084';
const gameRegistry = '0xA29F1b0a0C3490c190781b33ce640E9a3DaD807E';
const BidGame = '0xd8EC62805717245416e839719181c63a9CE4800B';

const dreamBidFeeABI = require('./ABIs/dreamBidFee.json')
const gameRegistryABI = require('./ABIs/gameRegistry.json')
const BidGameABI = require('./ABIs/BidGame.json')
const ERC20ABI = require('./ABIs/mintToken.json')

const srs = '0x4C42682E654cE6a34B3DC91E3349B1F54b986C45'
const a1 = '0x69F83D29830616D54669E84636079851b547328E'
const a2 = '0x062FBa4B50bD30E9467Ead0dD240f953529B3aCB'
const a3 = '0x97727DB33f97E6fd538FFa1801ff7E0bb00b379f'
const a4 = '0x139af563cdd3612e63c6eC24Db64F2f3AC5f127D'

init = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected");
      } else {
        alert("Metamask not found");
      }

      dreamBidFeeMethods = new web3.eth.Contract(
        dreamBidFeeABI.abi,
        dreamBidFee
      )

      gameRegistryMethods = new web3.eth.Contract(
        gameRegistryABI.abi,
        gameRegistry
      )

      BidGameMethods = new web3.eth.Contract(
        BidGameABI.abi,
        BidGame
      )
      // console.log("dreamBidFeeMethods", dreamBidFeeMethods.methods)
      accounts = await web3.eth.getAccounts();
      console.log("Account", accounts[0]);
}

getTotleCompetitors = async () => {
  const receipt = await gameRegistryMethods.methods.getCompetitorsLimit()
  .call();
  document.getElementById('span3').innerHTML = receipt;
  console.log(receipt);
}
const getCompetitors = document.getElementById("getCompetitors");
getCompetitors.onclick = getTotleCompetitors;

setTotleCompetitors = async () => {
  document.getElementById('span2').innerHTML = 'Processing🔜';
  await gameRegistryMethods.methods.setCompetitorsLimit(
    setCompetitor.value
  ).send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span2').innerHTML = "✅";
  });
}
const setCompetitor = document.getElementById("setCompetitor");
const setCompetitors = document.getElementById("setCompetitors");
setCompetitors.onclick = setTotleCompetitors;

listGame = async () => {
  document.getElementById('span1').innerHTML = 'GameId Processing🔜';
  await gameRegistryMethods.methods.listGame(
    currency.value,
    minPrice.value,
    bidStartTime.value,
    bidEndTime.value,
    addBidders.value,
    TotleCompetitors.value,
    [[competitor1.value],[competitor2.value],[competitor3.value]]
  ).send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
      let data = JSON.stringify(reciept.events.gameListedForFixPrice.returnValues.gameId);
    document.getElementById('span1').innerHTML = data;
  });
console.log("Regesterd!");
}

const currency = document.getElementById("currency");
const minPrice = document.getElementById("minPrice");
const bidStartTime = document.getElementById("bidStartTime");
const bidEndTime = document.getElementById("bidEndTime");
const addBidders = document.getElementById("addBidders");
const TotleCompetitors = document.getElementById("TotleCompetitors");
const competitor1 = document.getElementById("competitor1");
const competitor2 = document.getElementById("competitor2");
const competitor3 = document.getElementById("competitor3");
const Register = document.getElementById("Register");
Register.onclick = listGame;


AddBidders = async () => {
  document.getElementById('span4').innerHTML = 'Processing🔜';
  await gameRegistryMethods.methods.addBidders(gameId1.value,bidderAddress1.value)
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span4').innerHTML = 'Added✅';
  });
console.log("Added!");
}
const gameId1 = document.getElementById("gameId1");
const bidderAddress1 = document.getElementById("bidderAddress1");
const addBidder = document.getElementById("addBidder");
addBidder.onclick = AddBidders

RemoveBidders = async () => {
  document.getElementById('span5').innerHTML = 'Processing🔜';
  await gameRegistryMethods.methods.removeBidder(gameId2.value,bidderAddress2.value)
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span5').innerHTML = 'Removed✅';
  });
console.log("Removed!");
}
const gameId2 = document.getElementById("gameId2");
const bidderAddress2 = document.getElementById("bidderAddress2");
const removeBidder = document.getElementById("removeBidder");
removeBidder.onclick = RemoveBidders

BidderVerification = async () => {
  const receipt = await gameRegistryMethods.methods.bidderVerification(gameId3.value,bidderAddress3.value)
  .call()
  document.getElementById('span6').innerHTML = receipt;
console.log("receipt!", receipt);
}
const gameId3 = document.getElementById("gameId3");
const bidderAddress3 = document.getElementById("bidderAddress3");
const Verification = document.getElementById("Verification");
Verification.onclick = BidderVerification


Approve = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';
  contractERC20 = new web3.eth.Contract(
    ERC20ABI.abi,
    erc20token.value
  );
  await contractERC20.methods
    .approve(BidGame, tokenamount1.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('123').innerHTML = "Approved👍";
}
const erc20token = document.getElementById("erc20token");
const tokenamount1 = document.getElementById("tokenamount1");
const btnApprove = document.getElementById("btnApprove");
btnApprove.onclick = Approve;


BidOnGame = async () => {
  document.getElementById('span7').innerHTML = 'Processing🔜';
  await BidGameMethods.methods.Bid(gameId4.value,competitorIndex.value, getTokenAmount.value)
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span7').innerHTML = 'Done✅';
  });
console.log("Done✅!");
}

const gameId4 = document.getElementById("gameId4");
const competitorIndex = document.getElementById("competitorIndex");
const getTokenAmount = document.getElementById("getTokenAmount");
const btnBid = document.getElementById("btnBid");
btnBid.onclick = BidOnGame;


decideWinner = async () => {
  document.getElementById('span8').innerHTML = 'Processing🔜';
  await gameRegistryMethods.methods.decideWinner(gameId5.value,[competitorIndex1.value])
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span8').innerHTML = 'Winner Decided✅';
  });
console.log("Done✅!");
}

const gameId5 = document.getElementById("gameId5");
const competitorIndex1 = document.getElementById("competitorIndex1");
const decideWinner1 = document.getElementById("decideWinner");
decideWinner1.onclick = decideWinner

claimAmount = async () => {
  document.getElementById('span9').innerHTML = 'Processing🔜';
  await BidGameMethods.methods.withdraw(gameId6.value,competitorIndex2.value, ERC20Address.value, receiver.value)
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span9').innerHTML = 'You Got';
    let data = JSON.stringify(reciept.events.wihdrawSuccess.returnValues.Amount);
    document.getElementById('span9').innerHTML = data;
  });
console.log("Done✅!");
}

const gameId6 = document.getElementById("gameId6");
const competitorIndex2 = document.getElementById("competitorIndex2");
const ERC20Address = document.getElementById("ERC20Address");
const receiver = document.getElementById("receiver");
const withdraw = document.getElementById("withdraw");
withdraw.onclick = claimAmount

init();