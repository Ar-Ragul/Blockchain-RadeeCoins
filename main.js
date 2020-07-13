const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestrap, data, previousHash = ''){
        this.index = index;
        this.timestrap = timestrap;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    claculateHash(){
        return SHA256(this.index + this.previousHash + this.timestrap + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createOrignBlock()];
    }

    createOrignBlock(){
        return new Block(0, "01/01/2020", "Orign block", "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.claculateHash();
        this.chain.push(newBlock);
    }
}

let radeeCoin = new Blockchain();
radeeCoin.addBlock(new Block(1, "09/07/2020", {amount: 100}));
radeeCoin.addBlock(new Block(2, "10/07/2020", {amount: 50}));
radeeCoin.addBlock(new Block(3, "12/07/2020", {amount: 500}));
radeeCoin.addBlock(new Block(4, "19/07/2020", {amount: 40}));
radeeCoin.addBlock(new Block(5, "21/07/2020", {amount: 400}));
radeeCoin.addBlock(new Block(6, "12/07/2020", {amount: 9}));

console.log(JSON.stringify(radeeCoin, null, 4));
