// backend/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

function sha256(data){
  return crypto.createHash('sha256').update(data).digest('hex')
}

app.post('/check-password', (req, res) => {
  const { hub, password } = req.body

  if (!hub || !password) {
    return res.status(400).json({ success: false, message: 'Missing data' })
  }

  if (hub === "mm2") {
    const hash = sha256(password)

    if (hash === process.env.MM2_HASH) {
      return res.json({
        success: true,
        token: Math.random().toString(36).substring(2)
      })
    }
  }

  return res.json({ success: false, message: 'ACCESS DENIED' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})