const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

// Settings
app.set('port', process.env.PORT || 7000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('http://backend:5000/api/submit', req.body);
     res.json(response.data);
  } catch (error) {
    console.error('Error submitting form:', error.response?.data || error.message);
    res.status(500).json({ 
      error: error.response?.data?.error || 'Failed to submit form' 
    });
  }
});

// Fetch all submissions for the success page
app.get('/success', async (req, res) => {
  try {
     const response = await axios.get('http://backend:5000/api/submissions');
   res.render('success', { submissions: response.data });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).render('error', { 
      message: 'Failed to load submissions' 
    });
  }
});

// Add a catch-all route for 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${app.get('port')}`);
});