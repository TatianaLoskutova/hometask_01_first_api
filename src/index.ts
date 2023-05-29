import express, {Request, Response} from 'express'


// create express app
export const app = express()
const port = process.env.PORT || 5000

// create middleware
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// Version 2

function addDays(date: Date | string, days: number) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result
}

interface Video {
    id : number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string []
}


let video= [
    {
    id : 0,
    title: 'Test video',
    author: 'Tatiana',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: addDays(new Date().toISOString(), 1).toISOString(),
    availableResolutions: ['P144']
}
]

//++
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).json(video)
})

// под вопросом
app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const foundVideo = video.filter(v => v.id === id);
    if (foundVideo) {
        const found = Object.assign({}, foundVideo)
        res.status(200).json(found)
    } else {
        res.sendStatus(404)
    }
})
// нужно ли чтобы все ошибки
app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).json({
                errorsMessages: [{
                    message: 'incorrect title',
                    filed: 'title'
                }]
            })
    }
    let author = req.body.author
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        res.status(400).send({
            errorsMessages: [{
                message: 'incorrect author',
                filed: 'author'
            }]
        })
    }
    let resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ];
    let availableResolutions = [req.body.availableResolutions].toString()
    if (!availableResolutions || typeof availableResolutions !== 'string' ||
        !availableResolutions.trim() || availableResolutions !== resolutions.find(r => r.indexOf(availableResolutions as string) > -1)) {
        res.status(400).send({
            errorsMessages: [{
                message: 'incorrect availableResolutions',
                filed: 'availableResolutions'
            }]
        })
        return;
    }

    const newVideoInputData = {title, author}
    const newVideo = {
        id : +new Date(),
        ...newVideoInputData,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: addDays(new Date().toISOString(), 1).toISOString(),
        availableResolutions: [req.body.availableResolutions.toString()]
    };

    video.push(newVideo)
    res.status(201).send(newVideo)

});

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
// Version 1

// app.put('/videos/:id', (req:Request, res:Response) => {
//     let title = req.body.title;
//     if (!title || typeof title !== 'string'|| !title.trim() || title.length > 40) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect title',
//                 filed: 'title'
//             }]
//         })
//         return;
//     }
//     let author = req.body.author
//     if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect author',
//                 filed: 'author'
//             }]
//         })
//         return;
//     }
//     let resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ];
//     let availableResolutions = req.body.availableResolutions
//     if (!availableResolutions || typeof availableResolutions !== 'string' ||
//         !availableResolutions.trim() || availableResolutions !== resolutions.find(r => r.indexOf(availableResolutions as string) > -1)) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect availableResolutions',
//                 filed: 'availableResolutions'
//             }]
//         })
//         return;
//     }
//     let canBeDownloaded = true;
//     if (!canBeDownloaded) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect canBeDownloaded',
//                 filed: 'canBeDownloaded'
//             }]
//         })
//         return;
//     }
//
//     let minAgeRestriction = req.body.minAgeRestriction
//     if (!minAgeRestriction || 1 < minAgeRestriction > 18 ) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect minAgeRestriction',
//                 filed: 'minAgeRestriction'
//             }]
//         })
//         return;
//     }
//
//     let publicationDate = addDays(createdAt, 1).toISOString()
//     if (!publicationDate) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: 'incorrect publicationDate',
//                 filed: 'publicationDate'
//             }]
//         })
//         return;
//     }
//
//
//     let newVideo = {
//         id : +new Date(),
//         title: title,
//         author: author,
//         canBeDownloaded: canBeDownloaded,
//         minAgeRestriction: req.body.minAgeRestriction,
//         createdAt: new Date().toISOString(),
//         publicationDate: addDays(createdAt, 1).toISOString(),
//         availableResolutions: req.body.availableResolutions
//     }
//     videos.push(newVideo);
//
//     res.sendStatus(204)
//
// })
//
// app.delete('/videos/:id', (req:Request, res:Response) => {
//     const id = +req.params.id
//     const newVideos = videos.filter(v => v.id !== id)
//     if (newVideos.length < videos.length) {
//         videos = newVideos
//         res.sendStatus(204)
//     } else {
//         res.sendStatus(404)
//     }
// })
//
// app.delete('/videos', (req:Request, res:Response) => {
//     videos = []
//     res.sendStatus(204)
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
