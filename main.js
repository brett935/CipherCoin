const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
    }

    calculateHash() {
        return SHA256(this.timestamp + this.transactions + JSON.stringify(this.transactions)).toString;
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block('03/28/2018', "Genesis Block", "0");
    }

    displayToConsole() {
        for(let i = 0; i < this.chain.length; i++) {
            console.log(this.chain[i]);
        }
    }
}

let blockChain = new BlockChain();
blockChain.displayToConsole();