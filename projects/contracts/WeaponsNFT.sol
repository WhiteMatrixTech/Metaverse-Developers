pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./util.sol";

contract WeaponsNFT is Initializable, ERC721Upgradeable, AccessControlUpgradeable {

    //using ABDKMath64x64 for int128;
    //using ABDKMath64x64 for uint16;

    bytes32 public constant GAME_ADMIN = keccak256("GAME_ADMIN");
    bytes32 public constant RECEIVE_DOES_NOT_SET_TRANSFER_TIMESTAMP = keccak256("RECEIVE_DOES_NOT_SET_TRANSFER_TIMESTAMP");
    function initialize () public initializer {
        __ERC721_init("Blade Weapon", "NBLW");
        __AccessControl_init_unchained();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _weaponPowers[1] = 100;
        _weaponPowers[2] = 200;
        _weaponPowers[3] = 400;
    }
    //    constructor() public ERC721("Blade Weapon", "BLW") {
    //        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    //
    //        _weaponPowers[1] = 100;
    //        _weaponPowers[2] = 200;
    //        _weaponPowers[3] = 400;
    //    }

    struct Weapon {
        uint16 properties; // right to left: 3b stars, 2b trait, 7b stat pattern, 4b EMPTY
        // stats (each point refers to .25% improvement)
        uint16 stat1;
        uint16 stat2;
        uint16 stat3;
        uint8 level; // separate from stat1 because stat1 will have a pre-roll
        uint8 kind;
        uint16 bLevel;
        uint32 power;
        uint32 pro1;
        uint32 pro2;
        uint32 rare;
    }

    struct WeaponBurnPoints {
        uint8 lowStarBurnPoints;
        uint8 fourStarBurnPoints;
        uint8 fiveStarBurnPoints;
    }

    Weapon[] private tokens;

    uint256 public constant maxDurability = 20;
    uint256 public constant secondsPerDurability = 3000; //50 * 60
    // UNUSED; KEPT FOR UPGRADEABILITY PROXY COMPATIBILITY
    mapping(uint256 => uint256) public lastTransferTimestamp;

    uint256 private lastMintedBlock;
    uint256 private firstMintedOfLastBlock;

    mapping(uint16 => uint32) private _weaponPowers;

    event NewWeapon(uint256 indexed weapon, address indexed minter);
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

    function getStats(uint256 id) internal view
    returns (uint16 _properties, uint16 _stat1, uint16 _stat2, uint16 _stat3, uint8 _level) {

        Weapon memory w = tokens[id];
        return (w.properties, w.stat1, w.stat2, w.stat3, w.level);
    }
    function getKindLevelPower(uint256 id) internal view
    returns (uint8 _kind,uint16 _blevel,uint32 _power,uint32 pro1,
        uint32 pro2,
        uint32 rare){
        Weapon memory w = tokens[id];
        return (w.kind,w.bLevel,w.power,w.pro1,w.pro2,w.rare);
    }

    function get(uint256 id) public view noFreshLookup(id)
    returns (
        uint16 _properties, uint16 _stat1, uint16 _stat2, uint16 _stat3, uint8 _level,
        uint8 _kind,
        uint16 _bLevel,
        uint32 _power,uint32 pro1,
        uint32 pro2,
        uint32 rare
    ) {
        return _get(id);
    }

    function _get(uint256 id) internal view
    returns (
        uint16 _properties, uint16 _stat1, uint16 _stat2, uint16 _stat3, uint8 _level,
        uint8 _kind,
        uint16 _bLevel,
        uint32 _power,uint32 pro1,
        uint32 pro2,
        uint32 rare
    ) {
        (_properties, _stat1, _stat2, _stat3, _level) = getStats(id);
        (_kind,_bLevel,_power,pro1,
        pro2,
        rare) = getKindLevelPower(id);
    }


    function mint(address minter, uint256 seed, uint8 kind, uint16 bLevel,uint32 pro1,
        uint32 pro2,
        uint32 rare,uint32 power) public restricted returns(uint256) {
        uint256 stars;
        uint256 roll = seed % 100;
        // will need revision, possibly manual configuration if we support more than 5 stars
        if(roll < 1) {
            stars = 4; // 5* at 1%
        }
        else if(roll < 6) { // 4* at 5%
            stars = 3;
        }
        else if(roll < 21) { // 3* at 15%
            stars = 2;
        }
        else if(roll < 56) { // 2* at 35%
            stars = 1;
        }
        else {
            stars = 0; // 1* at 44%
        }

        return mintWeaponWithStars(minter, stars, seed, kind, bLevel,pro1,
            pro2,
            rare,power);
    }

    function mintWeaponWithStars(address minter, uint256 stars, uint256 seed, uint8 kind, uint16 bLevel,uint32 pro1,
        uint32 pro2,
        uint32 rare,uint32 power) public restricted returns(uint256) {
        require(stars < 8, "Stars parameter too high! (max 7)");
        (uint16 stat1, uint16 stat2, uint16 stat3) = getStatRolls(stars, seed);

        return performMintWeapon(minter,
            getRandomProperties(stars, seed),
            stat1,
            stat2,
            stat3,
            kind, bLevel,
            pro1,
            pro2,
            rare,power
        );
    }

    function performMintWeapon(address minter,
        uint16 properties,
        uint16 stat1, uint16 stat2, uint16 stat3,
        uint8 kind,
        uint16 bLevel,
        uint32 pro1,
        uint32 pro2,
        uint32 rare,uint32 power
    ) public restricted returns(uint256) {

        uint256 tokenID = tokens.length;

        if(block.number != lastMintedBlock)
            firstMintedOfLastBlock = tokenID;
        lastMintedBlock = block.number;
        // uint32 power = _weaponPowers[bLevel];

        tokens.push(Weapon(properties, stat1, stat2, stat3, 0, kind, bLevel, power,pro1,
            pro2,
            rare));
        _mint(minter, tokenID);

        emit NewWeapon(tokenID, minter);
        return tokenID;
    }

    function getRandomProperties(uint256 stars, uint256 seed) public pure returns (uint16) {
        return uint16((stars & 0x7) // stars aren't randomized here!
        | ((RandomUtil.randomSeededMinMax(0,3,RandomUtil.combineSeeds(seed,1)) & 0x3) << 3) // trait
            | ((RandomUtil.randomSeededMinMax(0,124,RandomUtil.combineSeeds(seed,2)) & 0x7F) << 5)); // statPattern
    }

    function getStatRolls(uint256 stars, uint256 seed) private pure returns (uint16, uint16, uint16) {
        // each point refers to .25%
        // so 1 * 4 is 1%
        uint16 minRoll = getStatMinRoll(stars);
        uint16 maxRoll = getStatMaxRoll(stars);
        uint8 statCount = getStatCount(stars);

        uint16 stat1 = getRandomStat(minRoll, maxRoll, seed, 5);
        uint16 stat2 = 0;
        uint16 stat3 = 0;
        if(statCount > 1) {
            stat2 = getRandomStat(minRoll, maxRoll, seed, 3);
        }
        if(statCount > 2) {
            stat3 = getRandomStat(minRoll, maxRoll, seed, 4);
        }
        return (stat1, stat2, stat3);
    }

    function getRandomStat(uint16 minRoll, uint16 maxRoll, uint256 seed, uint256 seed2) public pure returns (uint16) {
        return uint16(RandomUtil.randomSeededMinMax(minRoll, maxRoll,RandomUtil.combineSeeds(seed, seed2)));
    }

    function getStatMinRoll(uint256 stars) public pure returns (uint16) {
        // 1 star
        if (stars == 0) return 4;
        // 2 star
        if (stars == 1) return 180;
        // 3 star
        if (stars == 2) return 280;
        // 4 star
        if (stars == 3) return 200;
        // 5+ star
        return 268;
    }
    function getStatMaxRoll(uint256 stars) public pure returns (uint16) {
        // 3+ star
        if (stars > 1) return 400;
        // 2 star
        if (stars > 0) return 300;
        // 1 star
        return 200;
    }

    function getStatCount(uint256 stars) public pure returns (uint8) {
        // 1-2 star
        if (stars < 3) return 1;
        // 3+ star
        return uint8(stars)-1;
    }
    function getDurabilityMaxWait() public pure returns (uint64) {
        return uint64(maxDurability * secondsPerDurability);
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

     function batchTransferSame(address to,  uint256[] memory tokenIds) public  {
         for(uint i =0;i < tokenIds.length;i++) {
              _safeTransfer(msg.sender, to, tokenIds[i],"");
         }
     }

    function version() public view returns(uint256) {
        return 4;
    }
}
