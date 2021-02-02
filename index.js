import PKG from './package.json';
import Block from './src/blockchain/block'

const{name, version} = PKG;
const{genesis} = Block;

const block1= Block.mine(genesis, 'data-1');
console.log(block1.toString());
