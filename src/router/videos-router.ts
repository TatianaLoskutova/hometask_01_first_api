import {Request, Response, Router} from 'express';
import {Error, VideoType} from '../types/types';


export const videosRouter = Router()

const getNextDay = (date: Date): Date => {
    const nextDay = new Date()
    return new Date(nextDay.setDate(date.getDate() + 1))
}
const initDate = new Date()

const resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

export const videos: VideoType[] = [
    {
        id: 0,
        title: 'string',
        author: 'string',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: initDate.toISOString(),
        publicationDate: getNextDay(initDate).toISOString(),
        availableResolutions: resolutions
    }
]

const validationPostSchema = (title: string, author: string, availableResolutions: string[], minAgeRestriction: number) => {

    let errorsArrayPost: Error[] = []
    if (!title || !typeof (title) === 'string' || !title.trim() || title.length > 40) {
        errorsArrayPost.push({
            message: 'Incorrect title',
            filed: 'title'
        })
    }
    if (!author || !typeof (author) === 'string' || !author.trim() || author.length > 20) {
        errorsArrayPost.push({
            message: 'Incorrect author',
            filed: 'author'
        })
    }
    if(availableResolutions) {
        availableResolutions.forEach(r => {
            if (!resolutions.some(r1 => r1 === r)) {
                errorsArrayPost.push({
                    message: 'Incorrect availableResolutions',
                    filed: 'availableResolutions'
                })
            }
        })
    }
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArrayPost.push({
            message: 'Incorrect minAgeRestriction',
            filed: 'minAgeRestriction'
        })
    }
    return errorsArrayPost
}

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json(videos)
})

videosRouter.post('/', (req: Request, res: Response) => {
    const postDate = new Date()
    const {title, author, availableResolutions, minAgeRestriction} = req.body
    const post = validationPostSchema(title, author, availableResolutions, minAgeRestriction)

    if (post.length > 0) {
        res.status(400).json({errorsMessages: post})
    } else {
        const newVideo: VideoType = {
            id: +postDate,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: postDate.toISOString(),
            publicationDate: getNextDay(postDate).toISOString(),
            availableResolutions: availableResolutions
        }
        videos.push(newVideo)
        res.status(201).json(newVideo)
    }
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const getVideosId = videos.find(v => v.id === +req.params.id)
    if (!getVideosId) {
        res.sendStatus(404)
        return
    }
    res.status(200).json(getVideosId)
})

videosRouter.put('/:id', (req: Request, res: Response) => {
    const errorsArrayPut: Error[] = []
    const videoPut = videos.find(v => v.id === +req.params.id)

    if (!videoPut) {
        res.status(400)
        return
    }
    const {
        title, author, minAgeRestriction, canBeDownloaded,
        availableResolutions, publicationDate
    } = req.body

    if (!title || !typeof (title) === 'string' || !title.trim() || title.length > 40) {
        errorsArrayPut.push({
            message: 'Incorrect title',
            filed: 'title'
        })
    }
    if (!author || !typeof (author) === 'string' || !author.trim() || author.length > 20) {
        errorsArrayPut.push({
            message: 'Incorrect author',
            filed: 'author'
        })
    }
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        errorsArrayPut.push({
            message: 'Incorrect minAgeRestriction',
            filed: 'minAgeRestriction'
        })
    }
    if (availableResolutions) {
        availableResolutions.forEach(r => {
            if (!resolutions.some(r1 => r1 === r)) {
                errorsArrayPut.push({
                    message: 'Incorrect availableResolutions',
                    filed: 'availableResolutions'
                })
            }
        })
    }
    if (!publicationDate || typeof publicationDate === 'number') {
        errorsArrayPut.push({
            message: 'Incorrect publicationDate',
            filed: 'publicationDate'
        })
    }
    if (canBeDownloaded !== 'undefined' && typeof canBeDownloaded !== 'boolean') {
        errorsArrayPut.push({
            message: 'Incorrect canBeDownloaded',
            filed: 'canBeDownloaded'
        })
    }
    if (errorsArrayPut.length > 0) {
        res.status(400).json({errorsMessages: errorsArrayPut})
        return
    }

    videoPut.title = title
    videoPut.author = author
    videoPut.canBeDownloaded = canBeDownloaded
    videoPut.minAgeRestriction = minAgeRestriction
    videoPut.publicationDate = publicationDate
    videoPut.availableResolutions = availableResolutions
    res.sendStatus(204)

})

videosRouter.delete('/', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i] === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})
