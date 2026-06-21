const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = express.Router({ mergeParams: true });
require('./configs/firebase-config.js');

const indexRoute = require('./routes/index.routes.js');
indexRoute(router);

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.get("/api/health", (req, res) => {
  console.log("Backend is healthy")
    res.send("Backend is healthy")
})
app.use(router);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});