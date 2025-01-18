const express = require('express');
const connectDB = require('./lib/MongoDB'); 

// Import routes
const jokeRoutes = require('./routes/jokes');  
const bibleRoutes = require('./routes/bible'); 
const quoteRoutes = require('./routes/quotes');
const mathROutes = require('./routes/math');
const scienceRoutes = require('./routes/science');

// express app whatsoever
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions'); 

connectDB();

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/jokes', jokeRoutes); 
app.use('/api/bible', bibleRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/math', mathROutes);
app.use('/api/science', scienceRoutes);

// index page
app.get('/', (req, res) => {
  res.send('Welcome to Amethyst API - A RESTful API for jokes, bible verses, quotes, math and science questions');
});

// start the server
app.listen(port, () => {
  console.log(`Amethyst API is now running on port ${port}`);
});
