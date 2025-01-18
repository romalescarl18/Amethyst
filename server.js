const express = require('express');
const connectDB = require('./lib/MongoDB'); 

// Import routes
const jokeRoutes = require('./routes/jokes');  
const bibleRoutes = require('./routes/bible'); 
const quoteRoutes = require('./routes/quotes');
const mathROutes = require('./routes/math');
const scienceRoutes = require('./routes/science');
const economyRoutes = require('./routes/economy');
const minecraftRoutes = require('./routes/minecraft');

// express app whatsoever
const app = express();
const port = 3001;
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions'); 

connectDB();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Amethyst API! Amethyst is a simple API project for raspapi. Please refer to the documentation (/docs) for proper usage.');
});

// routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/jokes', jokeRoutes); 
app.use('/api/bible', bibleRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/math', mathROutes);
app.use('/api/science', scienceRoutes);
app.use('/api/minecraft', minecraftRoutes)
app.use('/api/economy', economyRoutes);

// start the server
app.listen(port, () => {
  console.log(`Amethyst API is now running on port ${port}`);
});
