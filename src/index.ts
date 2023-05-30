import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {testingRouter} from './routers/testing_router';
import {videoRouters} from './routers/video_routers';


const app = express()
const port = process.env.PORT || 5000

// create middleware
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videoRouters)
app.use('/testing', testingRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
