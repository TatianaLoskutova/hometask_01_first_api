import express, {Request, Response} from 'express'
import {addDays} from './functions';


// create express app
export const app = express()
const port = 3000

// create middleware
 const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// db
export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}
const createdAt: any = new Date().toISOString();
export const videos = [{
    id : +new Date(),
    title: 'Test video',
    author: 'Tatiana',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: addDays(createdAt, 1).toISOString(),
    availableResolutions: [ 'P144' ]
}]


// const resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]
// const createVideoInputSchema

// app.post('/videos', (req: Request, res: Response) => {});
app.get('/videos', (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK_200).json(videos)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(v => v.id === +req.params.id);

    if (!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    res.sendStatus(HTTP_STATUSES.OK_200).json(foundVideo)
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})