import express from 'express'
import cors from 'cors'


const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))
app.use(express.json())


app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})

