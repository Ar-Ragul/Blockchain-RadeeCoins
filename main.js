const SHA256 = require('crypto-js/sha256');

class Transactions{
    constructor(fromAdress, toAdress, amount){
        this.fromAdress = fromAdress;
        this.toAdress = toAdress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestrap, transaction, previousHash = ''){
        this.timestrap = timestrap;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.claculateHash();
        this.nonce =0;
    }
    claculateHash(){
        return SHA256(this.index + this.previousHash + this.timestrap + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.claculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

    
class Blockchain{
    constructor(){
        this.chain = [this.createOrignBlock()];
        this.difficulty = 2;
        this.pendingTransactions =[];
        this.mineReward =50;
    }

    createOrignBlock(){
        return new Block("01/01/2020", "Orign block", "0");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(mineRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block Sucessfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null, mineRewardAddress, this.mineReward)
        ];
    }

    createTransactions(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance =0;

        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAdress === address){
                    balance -=trans.amount;
                }
    
                if(trans.toAdress === address){
                    balance += trans.amount;
                }
            }
            
        }
        return balance;
    }

    isChainValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.claculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let radeeCoin = new Blockchain();
radeeCoin.createTransactions(new Transactions('address1', 'address2', 100));
radeeCoin.createTransactions(new Transactions('address2', 'address1', 100));

console.log('\n Initiating Miner.....');
radeeCoin.minePendingTransactions('ragul-address');

console.log('\n Initiating Miner again.....');
radeeCoin.minePendingTransactions('ragul-address');

console.log('\n Balance of Ragul Raghunath is',radeeCoin.getBalanceOfAddress('ragul-address'));

//console.log(JSON.stringify(radeeCoin, null, 4));