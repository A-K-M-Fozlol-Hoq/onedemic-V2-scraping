const mcqs = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      tags: ["geography"]
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Neptune"],
      answer: "Jupiter",
      tags: ["science"]
    },
    // ... more MCQ objects
  ];
  
  insertMCQs('mongodb://localhost:27017/mydatabase', mcqs);
  