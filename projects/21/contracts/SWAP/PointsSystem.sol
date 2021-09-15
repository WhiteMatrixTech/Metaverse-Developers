// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

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

library EnumerableSet {
    // To implement this library for multiple types with as little code
    // repetition as possible, we write it in terms of a generic Set type with
    // bytes32 values.
    // The Set implementation uses private functions, and user-facing
    // implementations (such as AddressSet) are just wrappers around the
    // underlying Set.
    // This means that we can only create new EnumerableSets for types that fit
    // in bytes32.

    struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping(bytes32 => uint256) _indexes;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) {// Equivalent to contains(set, value)
            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
            // the array, and then remove the last element (sometimes called as 'swap and pop').
            // This modifies the order of the array, as noted in {at}.

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];

            // Move the last value to the index where the value to delete is
            set._values[toDeleteIndex] = lastvalue;
            // Update the index for the moved value
            set._indexes[lastvalue] = toDeleteIndex + 1;
            // All indexes are 1-based

            // Delete the slot where the moved value was stored
            set._values.pop();

            // Delete the index for the deleted slot
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function _contains(Set storage set, bytes32 value) private view returns (bool) {
        return set._indexes[value] != 0;
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
     *
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    // Bytes32Set

    struct Bytes32Set {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _add(set._inner, value);
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(Bytes32Set storage set, bytes32 value) internal returns (bool) {
        return _remove(set._inner, value);
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(Bytes32Set storage set, bytes32 value) internal view returns (bool) {
        return _contains(set._inner, value);
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(Bytes32Set storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
     *
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function at(Bytes32Set storage set, uint256 index) internal view returns (bytes32) {
        return _at(set._inner, index);
    }

    // AddressSet

    struct AddressSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressSet storage set, address value) internal returns (bool) {
        return _add(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(AddressSet storage set, address value) internal returns (bool) {
        return _remove(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return _contains(set._inner, bytes32(uint256(uint160(value))));
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(AddressSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
     *
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        return address(uint160(uint256(_at(set._inner, index))));
    }


    // UintSet

    struct UintSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(UintSet storage set, uint256 value) internal returns (bool) {
        return _add(set._inner, bytes32(value));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(UintSet storage set, uint256 value) internal returns (bool) {
        return _remove(set._inner, bytes32(value));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(UintSet storage set, uint256 value) internal view returns (bool) {
        return _contains(set._inner, bytes32(value));
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function length(UintSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
     *
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function at(UintSet storage set, uint256 index) internal view returns (uint256) {
        return uint256(_at(set._inner, index));
    }
}

library DateUtils {
    uint constant DAY_IN_SECONDS = 86400;
    uint constant YEAR_IN_SECONDS = 31536000;
    uint constant LEAP_YEAR_IN_SECONDS = 31622400;
    uint constant HOUR_IN_SECONDS = 3600;
    uint constant MINUTE_IN_SECONDS = 60;
    uint16 constant ORIGIN_YEAR = 1970;

    function isLeapYear(uint16 year) public pure returns (bool) {
        if (year % 4 != 0) {
            return false;
        }
        if (year % 100 != 0) {
            return true;
        }
        if (year % 400 != 0) {
            return false;
        }
        return true;
    }

    function leapYearsBefore(uint year) public pure returns (uint) {
        year -= 1;
        return year / 4 - year / 100 + year / 400;
    }

    function getDaysInMonth(uint8 month, uint16 year) public pure returns (uint8) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        else if (isLeapYear(year)) {
            return 29;
        }
        else {
            return 28;
        }
    }

    function getYear(uint timestamp) public pure returns (uint16) {
        uint secondsAccountedFor = 0;
        uint16 year;
        uint numLeapYears;

        year = uint16(ORIGIN_YEAR + timestamp / YEAR_IN_SECONDS);
        numLeapYears = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);
        secondsAccountedFor += LEAP_YEAR_IN_SECONDS * numLeapYears;
        secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - numLeapYears);
        while (secondsAccountedFor > timestamp) {
            if (isLeapYear(uint16(year - 1))) {
                secondsAccountedFor -= LEAP_YEAR_IN_SECONDS;
            }
            else {
                secondsAccountedFor -= YEAR_IN_SECONDS;
            }
            year -= 1;
        }
        return year;
    }

    function getDate(uint timestamp) public pure returns (uint) {
        uint secondsAccountedFor = 0;
        uint buf;
        uint8 i;
        uint16 year;
        uint8 month;
        uint8 day;

        // Year
        year = getYear(timestamp);
        buf = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);
        secondsAccountedFor += LEAP_YEAR_IN_SECONDS * buf;
        secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - buf);

        // Month
        uint secondsInMonth;
        for (i = 1; i <= 12; i++) {
            secondsInMonth = DAY_IN_SECONDS * getDaysInMonth(i, year);
            if (secondsInMonth + secondsAccountedFor > timestamp) {
                month = i;
                break;
            }
            secondsAccountedFor += secondsInMonth;
        }

        // Day
        for (i = 1; i <= getDaysInMonth(month, year); i++) {
            if (DAY_IN_SECONDS + secondsAccountedFor > timestamp) {
                day = i;
                break;
            }
            secondsAccountedFor += DAY_IN_SECONDS;
        }
        return uint(year) * 10000 + uint(month) * 100 + day;
    }

    function getWeekday(uint timestamp) public pure returns (uint8) {
        return uint8((timestamp / DAY_IN_SECONDS + 4) % 7);
    }
}

interface ITitanswapRouter {
    function pairFor(address tokenA, address tokenB) external view returns (address pair);
}

interface IOracle {
    function update(address tokenA, address tokenB) external;

    function consult(address tokenIn, uint amountIn, address tokenOut) external view returns (uint amountOut);
}

contract PointsSystem {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.AddressSet;
    EnumerableSet.AddressSet private _whitelist;

    address private contractOwner;
    address public router;
    address public stakeAddr;
    //address public oracle;
    //address public targetToken;
    mapping(address => uint256) public targetTokenMap;

    mapping(address => bool) public pairList;
    mapping(address => UserInfo) public userList;

    constructor(
        address _router,
        address _stakeAddr
    ) public {
        router = _router;
        stakeAddr = _stakeAddr;
        contractOwner = msg.sender;
    }

    struct UserInfo {
        uint256 signInDate;
        uint256 signInContinuous;
        uint256 swapDate;
        uint256 swapQuantity;
        uint256 swapContinuous;
        uint256 liquidityDate;
        uint256 liquidityWeekDay;
        uint256 liquidityQuantity;
        uint256 stakeDate;
        uint256 stakeWeekDay;
        uint256 stakeQuantity;
        uint256 totalPoints;
        bool isUsed;
    }

    modifier onlyOwner() {
        require(contractOwner == msg.sender, "PointsSystem: caller is not the owner");
        _;
    }

    modifier onlyRouter() {
        require(msg.sender == router, "PointsSystem: caller is not the router");
        _;
    }

    function setRouter(address newRouter) public onlyOwner {
        require(newRouter != address(0), "PointsSystem: new router is the zero address");
        router = newRouter;
    }

    modifier onlyStake() {
        require(msg.sender == stakeAddr, "PointsSystem: caller is not the stake");
        _;
    }

    function setStake(address newStake) public onlyOwner {
        require(newStake != address(0), "PointsSystem: new stake is the zero address");
        stakeAddr = newStake;
    }

    function setTargetToken(address _token, uint256 limit) public onlyOwner {
        require(address(_token) != address(0), "PointsSystem: new targetToken is the zero address");
        targetTokenMap[_token] = limit;
    }

    function addPair(address _pair) public onlyOwner {
        require(_pair != address(0), "PointsSystem: _pair is the zero address");
        pairList[_pair] = true;
    }

    function removePair(address _pair) public onlyOwner {
        require(_pair != address(0), "PointsSystem: _pair is the zero address");
        pairList[_pair] = false;
    }

    function checkPair(address _pair) public view returns (bool){
        return pairList[_pair];
    }

    function addWhitelist(address _addToken) public onlyOwner returns (bool) {
        require(_addToken != address(0), "PointsSystem: token is the zero address");
        return EnumerableSet.add(_whitelist, _addToken);
    }

    function delWhitelist(address _delToken) public onlyOwner returns (bool) {
        require(_delToken != address(0), "PointsSystem: token is the zero address");
        return EnumerableSet.remove(_whitelist, _delToken);
    }

    function getWhitelistLength() public view returns (uint256) {
        return EnumerableSet.length(_whitelist);
    }

    function isWhitelist(address _token) public view returns (bool) {
        return EnumerableSet.contains(_whitelist, _token);
    }

    function getWhitelist(uint256 _index) public view returns (address){
        require(_index <= getWhitelistLength() - 1, "PointsSystem: index out of bounds");
        return EnumerableSet.at(_whitelist, _index);
    }

    function signIn() public returns (bool) {
        uint256 currentDate = DateUtils.getDate(block.timestamp);
        if (!userList[msg.sender].isUsed) {
            userList[msg.sender] = UserInfo({
            signInDate : currentDate,
            signInContinuous : 1,
            swapDate : 0,
            swapQuantity : 0,
            swapContinuous : 0,
            liquidityDate : 0,
            liquidityWeekDay : 0,
            liquidityQuantity : 0,
            stakeDate : 0,
            stakeWeekDay : 0,
            stakeQuantity : 0,
            totalPoints : 100,
            isUsed : true
            });
        } else {
            UserInfo storage userInfo = userList[msg.sender];
            require(currentDate > userInfo.signInDate, "PointsSystem: Repeat sign in");
            uint256 signInContinuous = userInfo.signInContinuous;
            if (currentDate.sub(userInfo.signInDate) == 1) {
                signInContinuous = signInContinuous + 1;
            } else {
                signInContinuous = 1;
            }
            userInfo.signInDate = currentDate;
            userInfo.signInContinuous = signInContinuous;
            if (signInContinuous == 1) {
                userInfo.totalPoints = userInfo.totalPoints.add(100);
            } else if (signInContinuous == 2) {
                userInfo.totalPoints = userInfo.totalPoints.add(150);
            } else if (signInContinuous >= 3) {
                userInfo.totalPoints = userInfo.totalPoints.add(200);
            }
        }
        return true;
    }

    function swap(address account, address input, address output, uint256 amount) public onlyRouter returns (bool) {
        require(account != address(0), "PointsSystem: taker swap account is the zero address");
        require(input != address(0), "PointsSystem: taker swap input is the zero address");
        require(output != address(0), "PointsSystem: taker swap output is the zero address");
        address pair = ITitanswapRouter(router).pairFor(input, output);
        if (!checkPair(pair)) {
            return false;
        }
        uint256 quantity = getQuantity(output, amount, targetToken);
        if (quantity <= 0) {
            return false;
        }
        uint256 currentDate = DateUtils.getDate(block.timestamp);
        if (!userList[account].isUsed) {
            uint256 continuous = 0;
            uint256 points = 0;
            if (quantity >= 500) {
                continuous = 1;
                points = 500;
            }
            userList[account] = UserInfo({
            signInDate : 0,
            signInContinuous : 0,
            swapDate : currentDate,
            swapQuantity : quantity,
            swapContinuous : continuous,
            liquidityDate : 0,
            liquidityWeekDay : 0,
            liquidityQuantity : 0,
            stakeDate : 0,
            stakeWeekDay : 0,
            stakeQuantity : 0,
            totalPoints : points,
            isUsed : true
            });
        } else {
            UserInfo storage userInfo = userList[account];
            require(currentDate >= userInfo.swapDate, "PointsSystem: Swap time error");
            uint256 swapContinuous = userInfo.swapContinuous;
            bool accPoint = false;
            if (currentDate == userInfo.swapDate) {
                quantity = quantity.add(userInfo.swapQuantity);
                if (userInfo.swapQuantity < 500 && quantity >= 500) {
                    accPoint = true;
                }
            } else if (currentDate.sub(userInfo.swapDate) == 1 && quantity >= 500) {
                accPoint = true;
                swapContinuous = swapContinuous + 1;
            } else if (currentDate.sub(userInfo.swapDate) > 1 && quantity >= 500) {
                accPoint = true;
                swapContinuous = 1;
            }
            userInfo.swapDate = currentDate;
            userInfo.swapQuantity = quantity;
            userInfo.swapContinuous = swapContinuous;
            if (accPoint) {
                if (swapContinuous == 1) {
                    userInfo.totalPoints = userInfo.totalPoints.add(350);
                } else if (swapContinuous == 2) {
                    userInfo.totalPoints = userInfo.totalPoints.add(400);
                } else if (swapContinuous >= 3) {
                    userInfo.totalPoints = userInfo.totalPoints.add(500);
                }
            }
        }
        return true;
    }

    function addLiquidity(address account, address tokenA, address tokenB, uint amountA, uint amountB) public onlyRouter returns (bool) {
        require(account != address(0), "PointsSystem: account is the zero address");
        require(tokenA != address(0), "PointsSystem: tokenA is the zero address");
        require(tokenB != address(0), "PointsSystem: tokenB is the zero address");
        address pair = ITitanswapRouter(router).pairFor(tokenA, tokenB);
        if (!checkPair(pair)) {
            return false;
        }
        uint256 quantityA = getQuantity(tokenA, amountA, targetToken);
        uint256 quantityB = getQuantity(tokenB, amountB, targetToken);
        if (quantityA <= 0 && quantityB <= 0) {
            return false;
        }
        uint256 quantity = quantityA >= quantityB ? quantityA : quantityB;
        uint256 currentDate = DateUtils.getDate(block.timestamp);
        uint256 weekDay = DateUtils.getWeekday(block.timestamp);
        if (!userList[account].isUsed) {
            uint256 points = 0;
            if (quantity >= 500) {
                points = 750;
            }
            userList[account] = UserInfo({
            signInDate : 0,
            signInContinuous : 0,
            swapDate : 0,
            swapQuantity : 0,
            swapContinuous : 0,
            liquidityDate : currentDate,
            liquidityWeekDay : weekDay,
            liquidityQuantity : quantity,
            stakeDate : 0,
            stakeWeekDay : 0,
            stakeQuantity : 0,
            totalPoints : points,
            isUsed : true
            });
        } else {
            UserInfo storage userInfo = userList[account];
            require(currentDate >= userInfo.liquidityDate, "PointsSystem: Liquidity Time error");
            bool accPoint = false;
            if (currentDate.sub(userInfo.liquidityDate) < 7 && weekDay >= userInfo.liquidityWeekDay) {
                quantity = quantity.add(userInfo.liquidityQuantity);
                if (userInfo.liquidityQuantity < 500 && quantity >= 500) {
                    accPoint = true;
                }
            } else if (quantity >= 500) {
                accPoint = true;
            }
            userInfo.liquidityDate = currentDate;
            userInfo.liquidityWeekDay = weekDay;
            userInfo.liquidityQuantity = quantity;
            if (accPoint) {
                userInfo.totalPoints = userInfo.totalPoints.add(750);
            }
        }
        return true;
    }

    function stake(address account, address token, uint amount) public onlyStake returns (bool) {
        require(account != address(0), "PointsSystem: account is the zero address");
        require(token != address(0), "PointsSystem: token is the zero address");

        uint256 quantity = getQuantity(token, amount, targetToken);
        if (quantity <= 0) {
            return false;
        }
        uint256 currentDate = DateUtils.getDate(block.timestamp);
        uint256 weekDay = DateUtils.getWeekday(block.timestamp);
        if (!userList[account].isUsed) {
            uint256 points = 0;
            if (quantity >= 500) {
                points = 500;
            }
            userList[account] = UserInfo({
            signInDate : 0,
            signInContinuous : 0,
            swapDate : 0,
            swapQuantity : 0,
            swapContinuous : 0,
            liquidityDate : 0,
            liquidityWeekDay : 0,
            liquidityQuantity : 0,
            stakeDate : currentDate,
            stakeWeekDay : weekDay,
            stakeQuantity : quantity,
            totalPoints : points,
            isUsed : true
            });
        } else {
            UserInfo storage userInfo = userList[account];
            require(currentDate >= userInfo.stakeDate, "PointsSystem: Stake Time error");
            bool accPoint = false;
            if (currentDate.sub(userInfo.stakeDate) < 7 && weekDay >= userInfo.stakeWeekDay) {
                quantity = quantity.add(userInfo.stakeQuantity);
                if (userInfo.stakeQuantity < 500 && quantity >= 500) {
                    accPoint = true;
                }
            } else if (quantity >= 500) {
                accPoint = true;
            }
            userInfo.stakeDate = currentDate;
            userInfo.stakeWeekDay = weekDay;
            userInfo.stakeQuantity = quantity;
            if (accPoint) {
                userInfo.totalPoints = userInfo.totalPoints.add(500);
            }
        }
        return true;
    }

    function getQuantity(address outputToken, uint256 outputAmount, address anchorToken) public view returns (uint256) {
        uint256 quantity = 0;
        if (outputToken == anchorToken) {
            quantity = outputAmount;
        } else if (ITitanswapRouter(router).pairFor(outputToken, anchorToken) != address(0)) {
            quantity = IOracle(oracle).consult(outputToken, outputAmount, anchorToken);
        } else {
            uint256 length = getWhitelistLength();
            for (uint256 index = 0; index < length; index++) {
                address intermediate = getWhitelist(index);
                if (ITitanswapRouter(router).pairFor(outputToken, intermediate) != address(0) && ITitanswapRouter(router).pairFor(intermediate, anchorToken) != address(0)) {
                    uint256 interQuantity = IOracle(oracle).consult(outputToken, outputAmount, intermediate);
                    quantity = IOracle(oracle).consult(intermediate, interQuantity, anchorToken);
                    break;
                }
            }
        }
        return quantity;
    }

}
