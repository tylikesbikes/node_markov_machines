const { Console } = require('console');
const fs = require('fs');

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   * 
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
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


  //     } else {
  //       chains.thisWord = new Set();
  //       chains.thisWord.add(nextWord)
  //     }
  //   }
  //   return chains;
  // }
  /** return random text from chains */

  randomElementFromArray (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  makeText(numWords = 5) {
    // TODO
    
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


const eggs = fs.readFileSync('simpletext.txt','utf8');

const eggsMarkov = new MarkovMachine(eggs);

const newStory = eggsMarkov.makeText(50);

console.log(newStory);

// eggsMarkov.makeText();