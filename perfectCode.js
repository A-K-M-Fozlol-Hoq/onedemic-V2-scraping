const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.mbamcq.com/accounting-for-managers/';

(async () => {
  let currentQuestion = 1;
  let currentPage = 1;
  let numQuestions = 10;

  while (numQuestions === 10) {
    const url = currentPage === 1 ? BASE_URL : `${BASE_URL}${currentPage}.php`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    numQuestions = 0;
    $('.mx-3 p').each((i, el) => {
        const regex = /^\d+\. /;

        const question = $(el).text().trim().replace(regex, "");
        const options = $(el).next().find('li').map((j, li) => $(li).text().trim()).get();
        const answer = $(el).nextAll('.justify-content-center').first().text().trim();
        const pureAnswer= $(el).nextAll('.justify-content-center').first().text().trim().substring(19).replace(/^[\)\s]+/, '');

        console.log(`Question ${currentQuestion}: ${question}\n`);
        options.map((option,i)=>{
            console.log(`Option ${i+1}: ${option}`)
        })
        // console.log(`Options: ${options.join(', ')}\n`);
        console.log(`Answer: ${answer}`);
        console.log(`Answer: ${pureAnswer}`);
        console.log(`${options.includes(pureAnswer)}\n`, 'cureent page - ', currentPage);
        if(options.includes(pureAnswer)){
            // numQuestions=-100
            currentQuestion++;
        }
        console.log('------------\n');

        
        numQuestions++;
    });

    currentPage++;
  }
})();
