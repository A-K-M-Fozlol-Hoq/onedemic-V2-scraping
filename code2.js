const mongoose = require('mongoose');
const MCQ = require('./MCQ');

async function insertMCQs(dbUrl, mcqArray) {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    // Insert the MCQs
    const result = await MCQ.insertMany(mcqArray);

    console.log(`Successfully inserted ${result.length} MCQs into the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}
