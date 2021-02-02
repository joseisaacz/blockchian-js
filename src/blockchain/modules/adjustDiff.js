const MIN_RATE = 3000;
export default (previousBlock, timestamp)=>{
    const {difficulty} = previousBlock;
    return previousBlock.timestamp + MIN_RATE > timestamp
    ? difficulty+1
    : difficulty-1;
}