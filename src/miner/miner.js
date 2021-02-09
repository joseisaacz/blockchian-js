import { MESSAGE } from "../service/p2p";
import { blockchainWallet, Transaction } from "../wallet";

class Miner{
constructor(blockchain, p2pService, wallet){
    this.blockchain= blockchain;
    this.p2pService= p2pService;
    this.wallet= wallet;
}

mine(){
    const{blockchain:{memoryPool},
    wallet,
    p2pService
    } = this;

    if(memoryPool.transactions.length ===0) throw Error('There are no unconfirmed transactions');

    /* 
    1. Include the reward to miner in transaction
    2. Create a block with valid transactions in MemPool
    3. Sync new Blockchain with the network
    4. wype transactions from memory pool
    5. broadcasting the wyping
    */
   memoryPool.transactions.push(Transaction.reward(wallet, blockchainWallet));
   const block = this.blockchain.addBlock(memoryPool.transactions);
   p2pService.sync();
   memoryPool.wipe();
   p2pService.broadcast(MESSAGE.WIPE);
   return block;
}
}

export default Miner;