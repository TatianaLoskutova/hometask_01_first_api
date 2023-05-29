import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {videoRouters} from './router/videos-router';


// create express app
const app = express()
const port = process.env.PORT || 5000

// create middleware
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videoRouters)






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
