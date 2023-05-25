import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {videoRouters} from './router/video-routers';

// create express app
const app = express()
const port = process.env.PORT || 3000

// create middleware
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

// app routers
app.use('/videos', videoRouters)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})