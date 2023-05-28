import express, {Request, Response} from 'express'


// create express app
const app = express()
const port = process.env.PORT || 5000

// create middleware
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// db

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}
const createdAt: any = new Date().toISOString();
let videos: Array<any> = [{
    id : +new Date(),
    title: 'Test video',
    author: 'Tatiana',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: addDays(createdAt, 1).toISOString(),
    availableResolutions: [ 'P144' ]
}]



app.get('/videos', (req: Request, res: Response) => {
    res.status(200).json(videos)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(v => v.id === +req.params.id);

    if (!foundVideo) {
        res.sendStatus(404)
        return;
    }

    res.sendStatus(200).json(foundVideo)
})

app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string'|| !title.trim() || title.length > 40) {
        res.sendStatus(400).json({
            errorsMessages: [{
                    message: 'incorrect title',
                    filed: 'title'
                }]
        })
        return;
    }
    let author = req.body.author
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        res.sendStatus(400).json({
            errorsMessages: [{
                message: 'incorrect author',
                filed: 'author'
            }]
        })
        return;
    }
    let resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ];
    let availableResolutions = req.body.availableResolutions
    if (!availableResolutions || typeof availableResolutions !== 'string' ||
        !availableResolutions.trim() || availableResolutions !== resolutions.find(r => r.indexOf(availableResolutions as string) > -1)) {
        res.sendStatus(400).json({
            errorsMessages: [{
                message: 'incorrect availableResolutions',
                filed: 'availableResolutions'
            }]
        })
        return;
    }
    const newVideo = {
        title: title,
        author: author,
        availableResolutions: availableResolutions
    }
    videos.push(newVideo);

    res.sendStatus(201).json(newVideo)
});






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
module.exports = app;
module.exports = express()