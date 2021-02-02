/* eslint-disable no-undef */
import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain',()=>{
	let blockchain;
	let blockchainB;
	beforeEach(()=>{
		blockchain= new Blockchain();
		blockchainB= new Blockchain();
	});
	
	it('every blockchain has a genesis block',()=>{
		const [genesisBlock]= blockchain.blocks;
		expect(genesisBlock).toEqual(Block.genesis);
		expect(blockchain.blocks.length).toEqual(1); 
	});

	it('use add block',()=>{
		const data= 'data1';
		blockchain.addBlock(data);
		const [,lastBlock] = blockchain.blocks;
		expect(lastBlock.data).toEqual(data);
		expect(blockchain.blocks.length).toEqual(2);
	});
	it('replaces the chain with a valid chain', ()=> {
		blockchainB.addBlock('bloque1');
		blockchain.replace(blockchainB.blocks);
		expect(blockchain.blocks).toEqual(blockchainB.blocks);
	});

	it('can not replace the chain with one with less blocks', ()=>{
		blockchain.addBlock('block-1');
		expect(()=>{
			blockchain.replace(blockchainB.blocks);
		}).toThrowError('Received chain is not longer tahn the current chain.');
	});

	it('can not replace the chain with one is not valid',()=>{
		blockchainB.addBlock('blocque');
		blockchainB.blocks[1].data ='hacked-block';
		expect(()=>{
			blockchain.replace(blockchainB.blocks);
		}).toThrowError('Received chain is invalid');
	});
});
