const { Console } = require('console');
const fs = require('fs');

class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  makeChains() {

    const chains={};
  
    for (let i = 0; i < this.words.length - 1; i++){
      let thisWord = this.words[i];
      let nextWord = this.words[i+1];
      
      if (thisWord in chains) {
        if (nextWord in chains[thisWord]) {
          
        } else {
          chains[thisWord].push(nextWord);
        }
        
      } else {
        chains[thisWord] = [];
        chains[thisWord].push(nextWord);
      }
  }
    return chains;
}

  randomElementFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 50) {

    
    const chainsKeys = Object.keys(this.chains);
    

    const output = [this.randomElementFromArray(chainsKeys)]; //initialize output string with a random key from this.chains

    while (output.length < numWords) {
    let seedWord = output[output.length-1]
    
    const nextWordChoices = this.chains[seedWord];
    output.push(this.randomElementFromArray(nextWordChoices));
    }

    return output.join(' ');
  }
  
}




module.exports = {MarkovMachine}