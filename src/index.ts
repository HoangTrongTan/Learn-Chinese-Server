import express from 'express'
const app = express()
import { connectDB } from './db/connect'
import { notFound } from './middleware/not-found'
import { errorHandlerMiddleware } from './middleware/error-handler'
import authRoute from './routes/auth'
import protectedRoutes from './routes/protected'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000;
console.log("process.env.PORT", process.env.PORT);


// middleware
app.use(express.json())

// Routes
app.use('/api/user', authRoute);
app.use('/api/protected', protectedRoutes); // just for example
app.use('/', (req, res) => {
    res.json({ msg: 'Hello World!' })
})
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        console.log("process.env.MONGO_URI", process.env.MONGO_URI);
        await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/test");
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (err) {
        console.log(err);
    }
}

start()