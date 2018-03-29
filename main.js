const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.timestamp + this.transactions + JSON.stringify(this.transactions)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    createGenesisBlock() {
        return new Block('03/28/2018', "Genesis Block", "0");
    }

    displayToConsole() {
        for(let i = 0; i < this.chain.length; i++) {
            console.log(this.chain[i]);
            console.log();
        }
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

let blockChain = new BlockChain();
blockChain.addBlock(new Block("03/28/2018", "transaction 1"), blockChain.getLatestBlock.hash);
blockChain.displayToConsole();
console.log("Is chain valid? " + blockChain.isChainValid());
