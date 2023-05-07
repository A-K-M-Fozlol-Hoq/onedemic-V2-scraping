const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  const response = await axios.get('https://www.mbamcq.com/accounting-for-managers/');
  const $ = cheerio.load(response.data);

  let currentQuestion = 1;
  $('.mx-3 p').each((i, el) => {
    // if (i % 2 === 0) {
      const question = $(el).text().trim();
      const options = $(el).next().find('li').map((j, li) => $(li).text().trim()).get();
      const answer = $(el).nextAll('.justify-content-center').first().text().trim();

      console.log(`Question ${currentQuestion}: ${question}\n`);
      console.log(`Options: ${options.join(', ')}\n`);
      console.log(`Answer: ${answer}\n`);
      console.log('------------\n');

      currentQuestion++;
    // }
  });
})();
