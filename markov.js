const { Console } = require('console');
const fs = require('fs');

class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

//   makeChains() {

//     const chains={};
  
//     for (let i = 0; i < this.words.length - 1; i++){
//       let thisWord = this.words[i];
//       let nextWord = this.words[i+1];
      
//       if (thisWord in chains) {
//         if (nextWord in chains[thisWord]) {
          
//         } else {
//           chains[thisWord].push(nextWord);
//         }
        
//       } else {
//         chains[thisWord] = [];
//         chains[thisWord].push(nextWord);
//       }
//   }
//     return chains;
// }

  makeChains() { // with BIGRAMS
    const chains = new Map();

    for (let i = 0; i < this.words.length - 1; i++) {
      let thisBigram = this.words[i]+' '+this.words[i+1];
      let nextWord = this.words[i+2] || null;

      if (chains.has(thisBigram)) {
        if (chains.get(thisBigram).indexOf(nextWord) == -1) chains.get(thisBigram).push(nextWord);
      } else {
        chains.set(thisBigram, [nextWord]);
      }
      this.chains = chains;
    }
  }

  randomElementFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // makeText(numWords = 50) {

    
  //   const chainsKeys = Object.keys(this.chains);
    

  //   const output = [this.randomElementFromArray(chainsKeys)]; //initialize output string with a random key from this.chains

  //   while (output.length < numWords) {
  //   let seedWord = output[output.length-1]
    
  //   const nextWordChoices = this.chains[seedWord];
  //   output.push(this.randomElementFromArray(nextWordChoices));
  //   }

  //   return output.join(' ');
  // }

  makeText(numWords = 50) {
    const keys = Array.from(this.chains.keys());
    let randomKey = this.randomElementFromArray(keys);
    const out = [];

    while (out.length < numWords && randomKey !== null) {
      let [w1, w2] = randomKey.split(' ');
      out.push(w1);
      randomKey = w2+' '+this.randomElementFromArray(this.chains.get(randomKey));
    }
    return out.join(' ');
  }
  
}




module.exports = {MarkovMachine};