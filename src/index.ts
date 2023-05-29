import express, {Request, Response} from 'express'
import {videosRouter} from './router/videos-router';


// create express app
const app = express()
const port = process.env.PORT || 5000

// create middleware
const parserMiddleware = express.json()

app.use(parserMiddleware)

app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
