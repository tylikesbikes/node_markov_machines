/** Command-line tool to generate Markov text. */

const {MarkovMachine} = require('./markov');
const process = require('process');
const fs = require('fs');
const {convert} = require('html-to-text');
const axios = require('axios');

try {
let dataSource = process.argv[2];
let path = process.argv[3];

if (dataSource === 'file') {
    fs.readFile(path,'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:\n', err);
            process.exit(1);
        } else {
        const mm = new MarkovMachine(data);
        console.log(mm.makeText());
        }
    });
} else if (dataSource === 'url') {
    const get_url_data = async function (path) {
        try {
        const {data} = await axios.get(path);
        const mm = new MarkovMachine(data);
        console.log(mm.makeText())
        } catch(err) {
            console.log('Error handling URL\n',err);
        }
        
    };
    get_url_data(path);
} else {
    console.log('File source argument not supported');
    process.exit(1);
}
} catch(err) {
    console.log(err);
    process.exit(1);
}





// const eggsMarkov = new MarkovMachine(txt);

// const newStory = eggsMarkov.makeText(50);