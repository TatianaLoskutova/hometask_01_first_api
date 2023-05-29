import express, {Request, Response} from 'express'
import {videosRouter} from './router/videos-router';


// create express app
const app = express()
const port = process.env.PORT || 5000

// create middleware
const jsonBodyMiddleware = express.json()

app.use(jsonBodyMiddleware)

app.use('/videos', videosRouter)

// ++
app.delete('/videos/:id', (req:Request, res:Response) => {
    const id = +req.params.id
    const savedVideo = video.filter(v => v.id !== id);
    if (savedVideo.length < video.length) {
        video = savedVideo
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

//++
app.delete('/testing/all-data', (req:Request, res:Response) => {
    video = [];
    res.sendStatus(204)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
