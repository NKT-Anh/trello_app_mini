import express from "express";
import cors from 'cors'
// import authRoutes from './routes/auth.routes.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.get("/api/health", (req, res) => {
    res.send("Backend is healthy")
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});