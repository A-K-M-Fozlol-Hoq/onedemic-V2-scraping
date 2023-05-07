const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.mbamcq.com/accounting-for-managers/';
let allQuestions = []
let invalidQuestions = []

async function main () {
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

        let question = $(el).text().trim().replace(regex, "");
        let options = $(el).next().find('li').map((j, li) => $(li).text().trim()).get();
        let answer = $(el).nextAll('.justify-content-center').first().text().trim();
        let pureAnswer= $(el).nextAll('.justify-content-center').first().text().trim().substring(19).replace(/^[\)\s]+/, '');

        
        if(!options.includes(pureAnswer)){
            invalidQuestions.push(currentQuestion)
        }else{
            question ={
                question,
                options,
                answer:pureAnswer
            }
            allQuestions.push(question)
        }

        currentQuestion++;
        numQuestions++;
    });

    currentPage++;
  }
  console.log('ëxecuting line 45')
  allQuestions.map((question,i)=>{
    console.log(`Question ${i=1}: ${question.question}\n`);
    options.map((option,i)=>{
        console.log(`Option ${i+1}: ${option}`)
    })
    // console.log(`Options: ${options.join(', ')}\n`);
    console.log(`Answer: ${answer}`);
    console.log(`Answer: ${pureAnswer}`);
    console.log(`${options.includes(pureAnswer)}\n`);
    console.log('------------\n');
})
}


main()

// allQuestions.map((question,i)=>{
//     console.log(`Question ${i=1}: ${question.question}\n`);
//     options.map((option,i)=>{
//         console.log(`Option ${i+1}: ${option}`)
//     })
//     // console.log(`Options: ${options.join(', ')}\n`);
//     console.log(`Answer: ${answer}`);
//     console.log(`Answer: ${pureAnswer}`);
//     console.log(`${options.includes(pureAnswer)}\n`);
//     console.log('------------\n');
// })