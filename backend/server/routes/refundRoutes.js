const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/predict-refund', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching prediction:', error.message);
    res.status(500).send('Prediction failed.');
  }
});

module.exports = router;
