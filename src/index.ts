import express, {Request, Response} from 'express'


// create express app
export const app = express()
const port = process.env.PORT || 5000

// create middleware
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// db

export type ValidationError = {message: string, field: string}


function addDays(date: Date, days: number) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result
}
let createdAt = new Date()
let videos= [{
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

    res.status(200).json(foundVideo)
})

app.post('/videos', (req: Request, res: Response) => {
    const errors: ValidationError[] = []
    let title = req.body.title
    if (!title || typeof title !== 'string'|| !title.trim() || title.length > 40) {
        res.status(400).json({
            errorsMessages: [{
                    message: 'incorrect title',
                    filed: 'title'
                }]
        })
        return;
    }
    let author = req.body.author
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        res.status(400).json({
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
        res.status(400).json({
            errorsMessages: [{
                message: 'incorrect availableResolutions',
                filed: 'availableResolutions'
            }]
        })
        return;
    }
    let newVideo = {
        id : +new Date(),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: addDays(createdAt, 1).toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    videos.push(newVideo);

    res.status(201).json(newVideo)

});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
