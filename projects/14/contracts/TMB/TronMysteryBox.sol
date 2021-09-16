pragma solidity ^0.5.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "./ERC721Metadata.sol";
import "./IERC20.sol";
import "./SafeMath.sol";
import "./Ownable.sol";

/**
 * @title Full ERC721 Token
 * @dev This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology.
 *
 * See https://eips.ethereum.org/EIPS/eip-721
 */

contract TronMysteryBox is ERC721, ERC721Enumerable, ERC721Metadata, Ownable {
    using SafeMath for uint256;

    //Hex string address of BKEY: Shasta Net for now
    IERC20 public bkey;

    uint256 public constant MAX_NFT_SUPPLY = 10000;
    uint256 public constant MAX_NFT_BUYABLE = 3000;
    uint256 public constant NAME_CHANGE_PRICE = 9 * (10 ** 6);
    uint256 public constant REWARD_PER_NFT = 18 * (10 ** 6);
    uint256 public constant EXCHANGE_PER_NFT = 36 * (10 ** 6);

    uint256 private _nftSold;  // number of nft sold
    // Array with all token ids, used for enumeration
    uint256[] private _allMarketTokens;

    // Mapping from token ID to name
    mapping (uint256 => string) private _tokenName;

    // Mapping if certain name string has already been reserved
    mapping (string => bool) private _nameReserved;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) private _allMarketTokensIndex;

    struct Offer {
        bool isForSale;
        address payable seller;
        uint256 price;
    }

    // ID => Offer
    mapping (uint256 => Offer) public nftsOfferedForSale;

    // events
    event RewardPaid(address indexed user, uint256 reward);
    event NameChange (uint256 indexed tokenId, string newName);
    event OfferNFTForSale(uint256 indexed tokenId, address indexed seller);
    event WithdrawNFTForSale(uint256 indexed tokenId);
    event BuyMarketNFT(uint256 indexed tokenId, address indexed buyer, address indexed seller);

    constructor () public {
        // Hex string address of BKEY
        bkey = IERC20(0x4195ff2e866539cffcb01e89c3f9da3a4874ea7dd6);
    }

    /**
    * presale functions
    **/
    function numberOfNftsSold() public view returns (uint256) {
        return _nftSold;
    }

    function getPrice() public view returns (uint256) {
        // require (totalSupply() < MAX_NFT_BUYABLE, "Sale has already ended. Please STAKE tokens to earn more!")
        require (_nftSold < MAX_NFT_BUYABLE, "Sale has already ended. Please STAKE tokens to earn more!");

        if (_nftSold >= 2997) {
            return 1000000 trx; 
        } else if (_nftSold >= 2900) {
            return 25000 trx; 
        } else if (_nftSold >= 2400) {
            return 12000 trx; 
        } else if (_nftSold >= 1800) {
            return 6000 trx; 
        } else if (_nftSold >= 1000) {
            return 3500 trx; 
        } else if (_nftSold >= 300) {
            return 1800 trx; 
        } else {
            return 600 trx; 
        }
    }

    function buy(uint256 numberOfNfts) public payable {
        require(_nftSold < MAX_NFT_BUYABLE, "Sale has already ended. Please STAKE tokens to earn more!");
        require(numberOfNfts > 0, "numberOfNfts cannot be 0");
        require(numberOfNfts <= 10, "You may not buy more than 10 NFTs at once");
        require(_nftSold.add(numberOfNfts) <= MAX_NFT_BUYABLE, "Exceeds MAX_NFT_BUYABLE");
        require(getPrice().mul(numberOfNfts) == msg.value, "Trx value sent is not correct");

        _nftSold = _nftSold.add(numberOfNfts);  // update

        for (uint i = 0; i < numberOfNfts; i++) {
            uint mintIndex = totalSupply();
            _mint(msg.sender, mintIndex);    // inherited from ERC721Enumerable
        }

        // reward BKEY tokens, 18 BKEYs per NFT bought
        uint256 rewards = numberOfNfts * REWARD_PER_NFT;
        bkey.transfer(msg.sender, rewards);
        emit RewardPaid(msg.sender, rewards);
    }

    function exchange(uint256 numberOfNfts) public returns (bool) {
        require(totalSupply() < MAX_NFT_SUPPLY, "All NFTs have been mined");
        require(numberOfNfts > 0, "numberOfNfts cannot be 0");
        require(numberOfNfts <= 10, "You may not exchange more than 10 NFTs at once");
        require(totalSupply().add(numberOfNfts) <= MAX_NFT_SUPPLY, "Exceeds MAX_NFT_SUPPLY");
        require(bkey.balanceOf(msg.sender) >= (numberOfNfts * EXCHANGE_PER_NFT), "Not enough BKEYs in your account");

        uint256 bkeysPaid = numberOfNfts * EXCHANGE_PER_NFT;
        bkey.transferFrom(msg.sender, address(this), bkeysPaid);

        for (uint i = 0; i < numberOfNfts; i++) {
            uint mintIndex = totalSupply();
            _mint(msg.sender, mintIndex);    // inherited from ERC721Enumerable
        }

        return true;
    }

    function withdrawTRX(address payable toAddress, uint256 value) public onlyOwner {
        toAddress.transfer(value);
    }

    function withdrawBKEY(address toAddress, uint256 amount) public onlyOwner {
        bkey.transfer(toAddress, amount);
    }

    /**
     * @dev Returns name of the NFT at index.
     */
    function tokenNameByIndex(uint256 index) public view returns (string memory) {
        return _tokenName[index];
    }

    /**
     * @dev Returns if the name has been reserved.
     */
    function isNameReserved(string memory nameString) public view returns (bool) {
        return _nameReserved[toLower(nameString)];
    }

    function changeName(uint256 tokenId, string memory newName) public returns (bool) {
        address owner = ownerOf(tokenId);

        require(msg.sender == owner, "ERC721: caller is not the owner");
        require(validateName(newName) == true, "Not a valid new name");
        require(sha256(bytes(newName)) != sha256(bytes(_tokenName[tokenId])), "New name is same as the current one");
        require(isNameReserved(newName) == false, "Name already reserved");

        // bkey.transferFrom(msg.sender, address(this), NAME_CHANGE_PRICE);

        // If already named, dereserve old name
        if (bytes(_tokenName[tokenId]).length > 0) {
            toggleReserveName(_tokenName[tokenId], false);
        }
        toggleReserveName(newName, true);
        _tokenName[tokenId] = newName;

        bkey.burnFrom(owner, NAME_CHANGE_PRICE);
        emit NameChange(tokenId, newName);

        return true;
    }

    /**
     * @dev Reserves the name if isReserve is set to true, de-reserves if set to false
     */
    function toggleReserveName(string memory str, bool isReserve) internal {
        _nameReserved[toLower(str)] = isReserve;
    }

    /**
     * @dev Check if the name string is valid (Alphanumeric and spaces without leading or trailing space)
     */
    function validateName(string memory str) public pure returns (bool){
        bytes memory b = bytes(str);
        if(b.length < 1) return false;
        if(b.length > 25) return false; // Cannot be longer than 25 characters
        if(b[0] == 0x20) return false; // Leading space
        if (b[b.length - 1] == 0x20) return false; // Trailing space

        bytes1 lastChar = b[0];

        for(uint i; i<b.length; i++){
            bytes1 char = b[i];

            if (char == 0x20 && lastChar == 0x20) return false; // Cannot contain continous spaces

            if(
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x20) //space
            )
                return false;

            lastChar = char;
        }

        return true;
    }

    /**
     * @dev Converts the string to lowercase
     */
    function toLower(string memory str) public pure returns (string memory){
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            // Uppercase character
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }


    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _tokensOfOwner(owner);
    }

    function totalMarketSupply() public view returns (uint256) {
        return _allMarketTokens.length;
    }

    function tokensOfMarket() public view returns (uint256[] memory) {
        return _allMarketTokens;
    }

    function offerNFTForSale(uint256 tokenId, uint256 _price) public {
        require(ownerOf(tokenId) == msg.sender, "you are not this token's owner");
        require(!nftsOfferedForSale[tokenId].isForSale, "this NFT has already on market for sale");
        nftsOfferedForSale[tokenId] = Offer(true, msg.sender, _price);
        _addTokenToAllMarketTokens(tokenId);
        emit OfferNFTForSale(tokenId, msg.sender);
    }

    function withdrawNFTForSale(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "you are not the owner");
        require(nftsOfferedForSale[tokenId].isForSale, "this NFT is not for sale");
        nftsOfferedForSale[tokenId] = Offer(false, msg.sender, 0);
        _removeTokenFromAllMarketTokens(tokenId);
        emit WithdrawNFTForSale(tokenId);
    }

    function buyMarketNFT(uint256 tokenId) public payable {
        Offer memory offer = nftsOfferedForSale[tokenId];
        require(offer.isForSale, "this NFT is not for sale");
        require(msg.value >= offer.price, "Don't send enough TRX");
        require(msg.sender != offer.seller, "buyer can not be owner");

        address payable seller = offer.seller;

        _transferFrom(seller, msg.sender, tokenId);

        seller.transfer(msg.value);

        nftsOfferedForSale[tokenId] = Offer(false, msg.sender, 0);
        _removeTokenFromAllMarketTokens(tokenId);

        emit WithdrawNFTForSale(tokenId);
        emit BuyMarketNFT(tokenId, msg.sender, seller);
    }

    function _addTokenToAllMarketTokens(uint256 tokenId) private {
        _allMarketTokensIndex[tokenId] = _allMarketTokens.length;
        _allMarketTokens.push(tokenId);
    }

    function _removeTokenFromAllMarketTokens(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allMarketTokens.length.sub(1);
        uint256 tokenIndex = _allMarketTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allMarketTokens[lastTokenIndex];

        _allMarketTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allMarketTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        _allMarketTokens.length--;
        _allMarketTokensIndex[tokenId] = 0;
    }

}
