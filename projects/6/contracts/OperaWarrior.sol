// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title OperaWarrior
 * OperaWarrior - a contract for my non-fungible token.
 */
contract OperaWarrior is ERC721Tradable
{
    using SafeMath for uint256;
    
    uint256 public MAX_TOKENS;

    // sell
    uint    public constant maxPurchase = 20;
    bool    public saleIsActive         = false;
    uint256 public tokenPrice           = 40000000000000000; //0.01 ETH
    


    constructor(address _proxyRegistryAddress, uint256 maxNftSupply)
        ERC721Tradable("OperaWarrior", "OWT", _proxyRegistryAddress)
    {
        MAX_TOKENS = maxNftSupply;
    }
    
    function baseTokenURI() override public pure returns (string memory) 
    {
        return "https://www.operawarrior.com/api/operawarrior/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://www.operawarrior.com/api/contract/operawarrior";
    }

    function withdraw() external onlyOwner
    {
        uint balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function flipSaleState() public onlyOwner
    {
        saleIsActive = !saleIsActive;
    }

    function mintSell(uint numberOfTokens) public payable 
    {
        require(saleIsActive,                                     "Sale must be active to mint tokens");
        require(tokenPrice.mul(numberOfTokens) <= msg.value,      "Ether value sent is not correct");
        require(numberOfTokens <= maxPurchase,                    "Can only mint 20 tokens at a time");
        require(totalSupply().add(numberOfTokens) <= MAX_TOKENS,  "Purchase would exceed max supply of tokens");

        for(uint i = 0; i < numberOfTokens; i++)
        {
            uint mintIndex = totalSupply();
            if (totalSupply() < MAX_TOKENS)
            {
                _safeMint(_msgSender(), mintIndex);
            }
        }
    }
    
    
}
