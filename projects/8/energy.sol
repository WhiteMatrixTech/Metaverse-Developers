pragma solidity ^0.4.24;

contract energy {

    uint private _darkComeTime;
    uint private _time;
    uint256 private _totalLight;
    uint256 private _tagetDark;
    mapping(address => uint) private _contributionors;
    address[] public addressIndices;
    mapping(address => uint) private _banances;
    
    constructor(){
        _darkComeTime = getDate() + 86400;
        _tagetDark = 2;
        _totalLight = 0;
    }
    
    function createUser(){
        _contributionors[msg.sender] = 0;
        addressIndices.push(msg.sender);
        _banances[msg.sender] = 0;
    }
    
    function contributLight() public {
        _contributionors[msg.sender] = _contributionors[msg.sender] + 1;
        _totalLight = _totalLight + 1;
    }
    
    function getTotalLight() public returns(uint256){
        return _totalLight;
    }
    
    function getTargetDark() public returns(uint256){
        return _tagetDark;
    }
    
    function getDarkComeTime() public returns(uint){
        return _darkComeTime;
    }
    
    function checkEnergy() public returns(uint){
        uint tim = getDate();
        if(tim == _darkComeTime){
            if(_totalLight < _tagetDark){
                  _darkComeTime = getDate() + 86400;
                  _tagetDark = 2;
                  _totalLight = 0;
                  uint arrayLength = addressIndices.length;
                  for (uint i=0; i<arrayLength; i++) {
                      delete _contributionors[addressIndices[i]];
                      delete _banances[addressIndices[i]];
                  }
                  addressIndices.length = 0;
            }else{
                award();
                calculateNextDark();
            }
        }

        return(tim);
    }
    
    function calculateNextDark(){
        _darkComeTime = _darkComeTime * 2;
        _tagetDark = _tagetDark * _tagetDark;
        uint arrayLength = addressIndices.length;
        for (uint i=0; i<arrayLength; i++) {
            delete _contributionors[addressIndices[i]];
            delete _banances[addressIndices[i]];
        }
        addressIndices.length = 0;
    }

    function award() internal {
        uint256 awardAmount = _totalLight  + (_totalLight - _tagetDark) * 15 / 10;
        uint arrayLength = addressIndices.length;
        for (uint i=0; i<arrayLength; i++) {
            _banances[addressIndices[i]] 
            = awardAmount * (_contributionors[addressIndices[i]] / _totalLight);
        }
        
    }
    
    function getDate() internal returns(uint){
        _time = now/1000;
        return(_time);
    }

}








