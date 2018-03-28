contract Voting{
	//contract for bidding
	struct Bidding{
	// structure of the bidding
	uint deadLine; // denotes the end time for the auction.
	bytes32 bidHash; // the hash which will be sent by the winner of the Bidding for payment release
	address lowestBidder; // current lowest Bidder
	uint lowestBid; // the current amount for the lowest Bid
	address Sender; // the person who will receive money for the lowest bid.
	}

	mapping (uint=>Bidding) BidMap; // A hashmap for BidId to the Bidding Structure.
	uint myGlobalCounter; //keeps count for the number of Bidding Contracts.

	function startBidding(uint timeLimit) returns (uint BiddingID){
	BiddingID= myGlobalCounter++;
	BidMap[BiddingID].deadLine=block.number+timeLimit;
	BidMap[BiddingID].Sender=msg.sender;
	}

	function Bid(uint BiddingID, bytes32 BidderHash, uint BidAmount) returns (address lowestBidder){
	Bidding B = BidMap[BiddingID];
	if (B.lowestBid<BidAmount || B.deadLine<block.number) {
	return B.lowestBidder;
	}
	B.lowestBidder=msg.sender;
	B.lowestBid= BidAmount;
	B.bidHash= BidderHash;
	}

	function BidEnd(uint BiddingID, bytes32 key) returns (address lowestBidder){
	Bidding B = BidMap[BiddingID];
	if (block.number>=B.deadLine && keccak256(key)==B.bidHash){
	B.Sender=B.lowestBidder;
	B.Sender.send(B.lowestBid);
	clean(BiddingID);
	}
	}

	function clean(uint BiddingID) {
	Bidding B = BidMap[BiddingID];
	B.deadLine=0;
	B.bidHash=0;
	B.lowestBidder=0;
	B.lowestBid=0;
	B.Sender=0;
	}

}
