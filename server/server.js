// server.js
const express = require('express');
const cors = require('cors');
const { fetchData } = require('./connect.cjs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    // Extract role and email from query parameters
    const { role, email } = req.query;
    const filters = { role: role ? role.toLowerCase() : null, email };
    const data = await fetchData(filters);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});