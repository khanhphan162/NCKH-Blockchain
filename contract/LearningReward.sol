// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningReward is Ownable {
    LearnToken public erc20;
    LearnCertificate public erc721;

    uint256 public nextTokenId;
    mapping(address => bool) public hasMintedNFT;

    constructor() Ownable(msg.sender) {
        erc20 = new LearnToken(msg.sender);
        erc721 = new LearnCertificate(msg.sender);
    }

    function rewardLesson(address to) external onlyOwner {
        erc20.mint(to, 20 * 1e18);
    }

    function completeCourse(address to, string memory uri) external onlyOwner {
        require(!hasMintedNFT[to], "Already minted NFT");

        uint256 balance = erc20.balanceOf(to);
        require(balance > 0, "No tokens");

        erc20.burnFrom(to, balance);
        erc721.mint(to, nextTokenId, uri);
        hasMintedNFT[to] = true;
        nextTokenId++;
    }
}

contract LearnToken is ERC20Burnable, Ownable {
    constructor(address initialOwner)
        ERC20("LearnToken", "LTK")
        Ownable(initialOwner) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract LearnCertificate is ERC721URIStorage, Ownable {
    constructor(address initialOwner)
        ERC721("LearnCertificate", "LNFT")
        Ownable(initialOwner) {}

    function mint(address to, uint256 tokenId, string memory uri) external onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}
