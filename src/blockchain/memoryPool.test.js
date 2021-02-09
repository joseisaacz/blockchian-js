/* eslint-disable no-undef*/
import MemoryPool from './memoryPool';
import Wallet, {Transaction}  from '../wallet';

describe('MemoryPool', ()=>{
    let memoryPool;
    let wallet;
    let transaction;

    beforeEach(()=>{
        memoryPool = new MemoryPool();
        wallet= new Wallet();
        transaction = new Transaction.create(wallet, 'random-4ddr3ss', 5);
        memoryPool.addOrUpdate(transaction);
    });
    it('has one transaction', ()=>{
      expect(memoryPool.transactions.length).toEqual(1);      
    });

    it('adds a transaction to the memoryPool', ()=>{
        const found = memoryPool.transactions.find(({id})=> id === transaction.id);
        expect(found).toEqual(transaction);
    });

    it('updates a transaction in the memoryPool', ()=>{
        const txOld = JSON.stringify(transaction);
        const txNew = transaction.update(wallet, '0th3r-4ddr3ss', 10);
        memoryPool.addOrUpdate(txNew);
        expect(memoryPool.transactions.length).toEqual(1);
        const found = memoryPool.transactions.find(({id})=> id === transaction.id);
        expect(JSON.stringify(found)).not.toEqual(txOld);
        expect(txNew).toEqual(found);
    });
    it('wipes transactions', ()=>{
        memoryPool.wipe();
        expect(memoryPool.transactions.length).toEqual(0);
    });
});