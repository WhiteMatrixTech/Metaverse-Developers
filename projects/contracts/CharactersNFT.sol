pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./interfaces/ITransferCooldownable.sol";
contract CharactersNFT  is Initializable, ERC721Upgradeable, AccessControlUpgradeable{

    using SafeMath for uint16;
    using SafeMath for uint8;

    bytes32 public constant GAME_ADMIN = keccak256("GAME_ADMIN");
    bytes32 public constant NO_OWNED_LIMIT = keccak256("NO_OWNED_LIMIT");

    function initialize () public initializer {
        __ERC721_init("Blade Character", "NBLC");
        __AccessControl_init_unchained();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        characterLimit = 1000;

        _characterPowers[1] = 100;
        _characterPowers[2] = 300;
        _characterPowers[3] = 900;
    }
    //    constructor() public ERC721("Blade Character", "BLC") {
    //
    //        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    //
    //        characterLimit = 1000;
    //
    //        _characterPowers[1] = 100;
    //        _characterPowers[2] = 300;
    //        _characterPowers[3] = 900;
    //
    //    }

    struct Character {
        uint16 xp; // xp to next level
        uint8 level; // up to 256 cap
        uint8 trait; // 2b trait, TBD
        uint64 staminaTimestamp; // standard timestamp in seconds-resolution marking regen start from 0
        uint32 power; // 100, 300, 900
        uint32 pro1;
        uint32 pro2;
        uint32 pro3;
        uint32 pro4;
        uint32 pro5;
        uint32 rare;
    }


    Character[] private tokens;
    uint256 public constant maxStamina = 200;
    uint256 public constant secondsPerStamina = 300; //5 * 60

    uint256 private lastMintedBlock;
    uint256 private firstMintedOfLastBlock;

    uint256 public characterLimit;

    mapping(uint8 => uint32) private _characterPowers;

    event NewCharacter(uint256 indexed character, address indexed minter);
    event Burned(address indexed owner, uint256 indexed burned);

    modifier restricted() {
        _restricted();
        _;
    }

    function _restricted() internal view {
        require(hasRole(GAME_ADMIN, msg.sender), "Not game admin");
    }

    modifier noFreshLookup(uint256 id) {
        _noFreshLookup(id);
        _;
    }

    function _noFreshLookup(uint256 id) internal view {
        require(id < firstMintedOfLastBlock || lastMintedBlock < block.number, "Too fresh for lookup");
    }

    function get(uint256 id) public view noFreshLookup(id) returns (uint16, uint8, uint8, uint64, uint32, uint32, uint32, uint32, uint32, uint32, uint32) {
        Character memory c = tokens[id];
        return (c.xp, c.level, c.trait, c.staminaTimestamp, c.power, c.pro1, c.pro2, c.pro3, c.pro4, c.pro5, c.rare);
    }

    function mint(address minter, uint8 trait,
        uint32 pro1,
        uint32 pro2,
        uint32 pro3,
        uint32 pro4,
        uint32 pro5,
        uint32 rare,
        uint32 power,
        uint16 xp,
        uint8 level) public restricted {
        uint256 tokenID = tokens.length;

        if(block.number != lastMintedBlock)
            firstMintedOfLastBlock = tokenID;
        lastMintedBlock = block.number;

        uint64 staminaTimestamp = uint64(now.sub(getStaminaMaxWait()));

        // tokens.push(Character(xp, level, trait, staminaTimestamp, _characterPowers[trait],
        tokens.push(Character(xp, level, trait, staminaTimestamp, power,
            pro1,
            pro2,
            pro3,
            pro4,
            pro5,
            rare));
        _mint(minter, tokenID);
        emit NewCharacter(tokenID, minter);
    }

    function getStaminaMaxWait() public pure returns (uint64) {
        return uint64(maxStamina * secondsPerStamina);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        if(to != address(0) && to != address(0x000000000000000000000000000000000000dEaD) && !hasRole(NO_OWNED_LIMIT, to)) {
            require(balanceOf(to) < characterLimit, "Recv has too many characters");
        }
    }

    function setCharacterLimit(uint256 max) public restricted {
        characterLimit = max;
    }

    function burn(uint256 burnID) public restricted {
        address burnOwner = ownerOf(burnID);

        _burn(burnID);

        emit Burned(
            burnOwner,
            burnID
        );
    }

    function setBaseURI(string memory  baseURI_) public  restricted{
        _setBaseURI(baseURI_);
    }

    function batchTransfer(address[] memory to,  uint256[] memory tokenIds) public  {
        for(uint i =0;i < to.length;i++) {
            _safeTransfer(msg.sender, to[i], tokenIds[i],"");
        }
     }

    function batchTransferSame(address  to,  uint256[] memory tokenIds) public  {
        for(uint i =0;i < tokenIds.length;i++) {
            _safeTransfer(msg.sender, to ,tokenIds[i],"");
        }
     }

    function version() public view returns(uint256) {
        return 4;
    }
}
