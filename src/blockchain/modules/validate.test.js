import Blockchain from '../blockchain';
import validate from './validate';

describe('validate', ()=>{
let blockchain;
	beforeEach(()=>{
		blockchain= new Blockchain();
	});

	it('validate a valid chain', ()=>{
		blockchain.addBlock('bloque1');
		

		expect(validate(blockchain.blocks)).toBe(true);
	});

	it('invalidates a chain with a corrupt genesis block',()=>{
		blockchain.blocks[0].data='bad_data';
		expect(()=>{
			validate(blockchain.blocks);
		}).toThrowError('Invalid Genesis Block');
	});
	
	it('invalidates a chain with a corrupt previousHash within a block', () => {
	    blockchain.addBlock('bl4ck-1');
	    blockchain.blocks[1].previousHash = 'h4ck-previoushash';

	    expect(() => {
		          validate(blockchain.blocks);
		        }).toThrowError('Invalid previous hash.');
	  });

	it('invalidates a chain with a corrupt hash within a block', () => {
		blockchain.addBlock('blocque');
		blockchain.blocks[1].hash = 'hacked';
		expect(()=>{
		validate(blockchain.blocks);
		}).toThrowError('Invalid Hash');
		
	});

});

