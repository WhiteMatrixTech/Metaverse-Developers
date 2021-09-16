// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this;
        // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, 'ds-math-add-overflow');
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, 'ds-math-sub-underflow');
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, 'ds-math-mul-overflow');
    }
}

library TransferHelper {
    function safeApprove(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'TransferHelper: APPROVE_FAILED');
    }

    function safeTransfer(address token, address to, uint value) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'TransferHelper: TRANSFER_FAILED');
    }

    function safeTransferFrom(address token, address from, address to, uint value) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'TransferHelper: TRANSFER_FROM_FAILED');
    }

    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value : value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }
}

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 * Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the {SafeMath}
 * overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
 * directly accessed.
 */
library Counters {
    using SafeMath for uint256;

    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        // The {SafeMath} overflow check can be skipped here, see the comment at the top
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

interface INFT {
    function mint(address _to, string memory _tokenURI) external returns (uint256);
}

contract AuctionMarket is Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _lotsIds;

    address public receiveToken;
    address public receiveAddress;
    address public nftAddress;
    uint256 public interval;

    mapping(uint256 => LotsInfo) public lotsList;
    mapping(address => uint256) public bidder_price;
    mapping(address => uint256) public bidder_block;
    mapping(address => uint256) public bidder_lid;
    mapping(address => address) _prevBidder;
    mapping(address => address) _nextBidder;
    uint256 public highest_price;
    address public highest_bidder;
    uint256 public listSize;
    uint256 public totalBid;
    address constant GUARD = address(1);

    struct LotsInfo {
        uint256 lid;
        string name;
        string desc;
        string uri;
        uint8 status; //1-auctioning; 2-pass; 3-sold
        uint256 startBlock;
        uint256 startPrice;
        uint256 soldPrice;
    }

    struct BidInfo {
        address bidder;
        uint256 bidPrice;
        uint256 bidBlock;
    }

    constructor (address _receiveToken, address _receiveAddress, uint256 _interval) public {
        receiveToken = _receiveToken;
        receiveAddress = _receiveAddress;
        interval = _interval;
        _nextBidder[GUARD] = GUARD;
    }

    event SetInterval(uint256 _interval);
    event SetNftAddress(address _nftAddress);
    event CreateAuction(uint256 _lid, uint256 _startBlock, uint256 _startPrice);
    event Bid(uint256 _lid, address _bidder, uint256 _price, uint256 _increase);
    event Withdraw(address _token, address _bidder, uint256 _amount);
    event Sold(uint256 _lid, uint256 _tokenId, address _bidder, uint256 _price);
    event Pass(uint256 _lid);

    function setInterval(uint256 _interval) public onlyOwner {
        //require(_interval >= 100, "interval must >= 100");
        interval = _interval;
        emit SetInterval(_interval);
    }

    function setNftAddress(address _nftAddress) public onlyOwner {
        nftAddress = _nftAddress;
        emit SetNftAddress(_nftAddress);
    }

    function getCurrentLotsId() view public returns (uint256){
        return _lotsIds.current();
    }

    function createLots(string memory _name, string memory _desc, string memory _uri, uint256 _startPrice) public onlyOwner {
        require(lotsList[_lotsIds.current()].status != 1, "is auctioning");
        require(_startPrice > 0, "start price must > 0");
        if (lotsList[_lotsIds.current()].status == 3) {
            totalBid = totalBid.sub(highest_price);
            _removeBidder(highest_bidder);
        }
        _lotsIds.increment();
        uint256 _lid = _lotsIds.current();
        uint256 _startBlock = block.number;
        lotsList[_lid] = LotsInfo({
        lid : _lid,
        name : _name,
        desc : _desc,
        uri : _uri,
        startBlock : _startBlock,
        startPrice : _startPrice,
        soldPrice : 0,
        status : 1
        });
        emit CreateAuction(_lid, _startBlock, _startPrice);
    }

    function bid(uint256 _lid, uint256 _bidPrice) public {
        require(lotsList[_lid].status == 1, "no bidding");
        uint256 _startBlock = lotsList[_lid].startBlock;
        require((block.number >= _startBlock && block.number <= _startBlock.add(interval)), "not in auction time");
        if (highest_price > 0) {
            require(_bidPrice >= highest_price.add(10), "At least 10 U more");
        } else {
            require(_bidPrice >= lotsList[_lid].startPrice.add(10), "At least 10 U more");
        }
        uint256 _origin = bidder_price[msg.sender];
        uint256 _increase = _bidPrice;
        if (_origin > 0) {
            _increase = _bidPrice.sub(_origin);
            _increasePrice(msg.sender, _bidPrice);
        } else {
            _addBidder(msg.sender, _bidPrice);
        }
        bidder_lid[msg.sender] = _lid;
        totalBid = totalBid.add(_increase);
        TransferHelper.safeTransferFrom(receiveToken, msg.sender, receiveAddress, _increase.mul(1e18));
        emit Bid(_lid, msg.sender, _bidPrice, _increase);
    }

    function withdraw() public {
        require(bidder_price[msg.sender] > 0, "not involved");
        require(bidder_lid[msg.sender] < _lotsIds.current(), "no allowed withdraw");
        uint256 _amount = bidder_price[msg.sender];
        totalBid = totalBid.sub(_amount);
        TransferHelper.safeTransferFrom(receiveToken, receiveAddress, msg.sender, _amount.mul(1e18));
        _removeBidder(msg.sender);
        emit Withdraw(receiveToken, msg.sender, _amount);
    }

    function sold(uint256 _lid) public onlyOwner {
        LotsInfo storage lots = lotsList[_lid];
        require(lots.status == 1, "lots status must be 1");
        require((block.number > lots.startBlock.add(interval)), "not in sold time");
        if (listSize == 0 || highest_bidder == address(0)) {
            lots.status = 2;
            lots.soldPrice = 0;
            emit Pass(_lid);
        } else {
            lots.status = 3;
            lots.soldPrice = highest_price;
            uint256 _tokenId = INFT(nftAddress).mint(highest_bidder, lots.uri);
            emit Sold(_lid, _tokenId, highest_bidder, highest_price);
        }
    }

    function getTop3() public view returns (BidInfo[] memory) {
        BidInfo[] memory top3 = new BidInfo[](3);
        if (highest_bidder != address(0)) {
            address currentAddress = highest_bidder;
            for (uint256 i = 0; i < 3; ++i) {
                if (currentAddress == address(1)) {
                    break;
                }
                top3[i] = BidInfo({
                bidder : currentAddress,
                bidPrice : bidder_price[currentAddress],
                bidBlock : bidder_block[currentAddress]
                });
                currentAddress = _prevBidder[currentAddress];
            }
        }
        return top3;
    }

    function _addBidder(address _bidder, uint256 _bidPrice) internal {
        require(_nextBidder[_bidder] == address(0), "bidder is existed");
        if (listSize == 0) {
            _prevBidder[_bidder] = GUARD;
            _nextBidder[GUARD] = _bidder;
        } else {
            _prevBidder[_bidder] = highest_bidder;
            _nextBidder[highest_bidder] = _bidder;
        }
        if (bidder_price[_bidder] == 0) {
            listSize++;
        }
        bidder_price[_bidder] = _bidPrice;
        bidder_block[_bidder] = block.number;
        highest_bidder = _bidder;
        highest_price = _bidPrice;
    }

    function _increasePrice(address _bidder, uint256 _newPrice) internal {
        if (_bidder == highest_bidder) {
            highest_price = _newPrice;
            bidder_price[_bidder] = _newPrice;
            bidder_block[_bidder] = block.number;
        } else {
            _removeBidder(_bidder);
            _addBidder(_bidder, _newPrice);
        }
    }

    function _removeBidder(address _bidder) internal {
        address prev = _prevBidder[_bidder];
        address next = _nextBidder[_bidder];
        _prevBidder[next] = prev;
        _nextBidder[prev] = next;
        _prevBidder[_bidder] = address(0);
        _nextBidder[_bidder] = address(0);
        bidder_price[_bidder] = 0;
        bidder_block[_bidder] = 0;
        bidder_lid[_bidder] = 0;
        if (_bidder == highest_bidder) {
            if (prev == address(1)) {
                highest_bidder = address(0);
                highest_price = 0;
            } else {
                highest_bidder = prev;
                highest_price = bidder_price[prev];
            }
        }
        listSize--;
    }
}
