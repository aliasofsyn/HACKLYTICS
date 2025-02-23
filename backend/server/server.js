const express = require('express');
const refundRoutes = require('./routes/refundRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/predict-refund', refundRoutes);

app.listen(3000, () => console.log('🚀 Node server running on port 3000'));
