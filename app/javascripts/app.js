import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

window.startBidding = function() {
  let timeLimit=$("#timeLimit").val();
  $("#msg").html("The contarct is being deployed")
  $("#timeLimit").val("");
  Voting.deployed().then(function(contractInstance) {contractInstance.startBidding(timeLimit).then(function(v) {console.log(v)})});
}

window.Bid = function() {
  let BiddingID=$("#BiddingID").val();
  let BidHash=$("#BidHash").val();
  let BidAmount=$("#BidAmount").val();
  $("#msg").html("The Bid is being deployed")
  $("#timeLimit").val("");
  Voting.deployed().then(function(contractInstance) {contractInstance.Bid(BiddingID,BidHash, BidAmount).then(function(v) {console.log(v)})});
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Voting.setProvider(web3.currentProvider);
  console.log(BiddingID);
});

Voting.deployed().then(function(contractInstance){contractInstance.Bid(1,'0x1dac30c17fbfbe0c09285635b1c43ba526b65ed8')});
