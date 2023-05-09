const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const MCQ = require('./MCQ');

const BASE_URL = 'https://www.mbamcq.com/cost-and-managerial-accounting/';

const allQuestions = [];

(async () => {
  let currentQuestion = 1;
  let currentPage = 1;
  let numQuestions = 10;

  // while (numQuestions === 10) {
  while (numQuestions > 0) {
    try {
      const url =
        currentPage === 1 ? BASE_URL : `${BASE_URL}${currentPage}.php`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      numQuestions = 0;
      $('.mx-3 p').each((i, el) => {
        const regex = /^\d+\. /;
        const question = $(el).text().trim().replace(regex, '');
        const options = $(el)
          .next()
          .find('li')
          .map((j, li) => $(li).text().trim())
          .get();
        const answer = $(el)
          .nextAll('.justify-content-center')
          .first()
          .text()
          .trim()
          .substring(19)
          .replace(/^[\)\s]+/, '');
        const newQuestion = {
          question,
          options,
          answer,
          tags: ['cost-and-managerial-accounting', 'accounting'],
        };
        if (options.includes(answer)) {
          allQuestions.push(newQuestion);
          // numQuestions=-100
          currentQuestion++;
        } else {
          console.log(newQuestion);
        }
        numQuestions++;
      });
      currentPage++;
      console.log({ currentPage });
    } catch (e) {
      console.log(e.message);
      numQuestions = 0;
    }
  }
  insertMCQs(
    'mongodb+srv://heyonedemic:KDZw3dz3kM3zHNqP@cluster0.8xde0iy.mongodb.net/onedemic_v2_live_db',
    allQuestions
  );
})();

async function insertMCQs(dbUrl, mcqArray) {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert the MCQs
    const result = await MCQ.insertMany(mcqArray);

    console.log(
      `Successfully inserted ${result.length} MCQs into the database`
    );

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}
