// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNFT is ERC721, Ownable {
    uint256 public mintPrice;  //save price
    uint256 public totalSupply; // total supply token
    uint256 public maxSupply;   // total public supply
    uint256 public maxPerWallet; // Maximum tokens per wallet
    bool public isPublicMintEnabled; //Allow Mint to the account owner
    string internal baseTokenUri;  //Storage for photos NFT   
    address payable public withdrawWallet; //Withdrawal of assets entered into the contract
    mapping (address => uint256) public walletMints; //Address of all accounts that Mint


    constructor() payable ERC721('Robo', 'RB'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //set witdhraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_)external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_)public view override returns(string memory){
        require(_exist(tokenId_), 'token dose not exist!');
        return string(abi.encodePacked(baseTokenUri, strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quanitity_) public payable{
        require(isPublicMintEnsble, 'minting not enabe');
        require(msg.value == quanitity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quanitity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quanitity_ <= maxPerWallet, 'exeed max wallet');

        for (uint256 i = 0; i < quanitity_; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safemint(msg.sender, newTokenId);
        }
    }




}
