import {Request, Response, Router} from 'express';
import {ErrorType, VideoType} from '../types/types';
import {deleteRouters} from './delete-router';


export const videoRouters = Router()
export const resolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ];
const postVideoValidation = (title: string, author: string, availableResolutions: string[]) => {
    const errors: ErrorType[] = []

    if (!title || !title.trim() || title.length > 40) {
        errors.push({
            message: 'Incorrect title',
            filed: 'title'
        })
    }

    if (!author || !author.trim() || author.length > 40) {
        errors.push({
            message: 'Incorrect author',
            filed: 'author'
        })
    }

    if (availableResolutions) {
        availableResolutions.forEach((el: string) => {
            if (!resolutions.some(el1 => el1 === el)) {
                errors.push({
                    message: 'Incorrect availableResolutions',
                    filed: 'availableResolutions'
                })
            }
        })
    }

    if (errors.length > 0) return errors
    return null
}
const putVideoValidation = (title: string, author: string, availableResolutions: string[], canBeDownloaded: boolean, minAgeRestriction: number,
                            publicationDate: string) => {
    const putErrors: ErrorType[] = []

    if (!title || !title.trim() || title.length > 40) {
        putErrors.push({
            message: 'Incorrect title',
            filed: 'title'
        })
    }

    if (!author || !author.trim() || author.length > 40) {
        putErrors.push({
            message: 'Incorrect author',
            filed: 'author'
        })
    }

    if (availableResolutions) {
        availableResolutions.forEach((el: string) => {
            if (!resolutions.some(el1 => el1 === el)) {
                putErrors.push({
                    message: 'Incorrect availableResolutions',
                    filed: 'availableResolutions'
                })
            }
        })
    }

    if ((typeof canBeDownloaded !== 'boolean')) {
        putErrors.push({
            message: 'Incorrect canBeDownloaded',
            filed: 'canBeDownloaded'
        })
    }

    if (typeof minAgeRestriction !== 'number' || minAgeRestriction > 18 || minAgeRestriction < 1) {
        putErrors.push({
            message: 'Incorrect minAgeRestriction',
            filed: 'minAgeRestriction'
        })
    }

    if (typeof publicationDate !== 'string') {
        putErrors.push({
            message: 'Incorrect publicationDate',
            filed: 'publicationDate'
        })
    }

    if (putErrors.length > 0) return putErrors
    return null
}


export let videos: VideoType[] = []



videoRouters.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

videoRouters.post('/', (req: Request, res: Response) => {
    const errors= postVideoValidation(req.body.title, req.body.author, req.body.availableResolutions)
    if (errors) {
        return res.status(400).send({
            errorsMessages: errors
        })
    }

    const initDate = new Date()
    const getNextDay = new Date(+initDate + (1000 * 60 * 60 * 24))
    const newVideo: VideoType = {
        id: +initDate,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: initDate.toISOString(),
        publicationDate: getNextDay.toISOString(),
        availableResolutions: req.body.availableResolutions
    }

    videos.push(newVideo)
    res.status(201).send(newVideo)
})

videoRouters.get('/:id', (req: Request, res: Response) => {
    const video: VideoType = videos.find(el => el.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
        return
    }
})

videoRouters.put('/:id', (req: Request, res: Response) => {
    const errors = putVideoValidation(req.body.title, req.body.author, req.body.availableResolutions, req.body.canBeDownloaded,
        req.body.minAgeRestriction, req.body.publicationDate)
    if (errors) {
        return res.status(400).send({
            errorsMessages: errors
        })
    }
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        video.title = req.body.title,
        video.author = req.body.author,
        video.availableResolutions = req.body.availableResolutions,
        video.canBeDownloaded = req.body.canBeDownloaded,
        video.minAgeRestriction = +req.body.minAgeRestriction,
        video.publicationDate = req.body.publicationDate

        res.status(204).send(video)
    } else {
        res.sendStatus(404)
    }
})

videoRouters.delete('/:id', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)
    if (!video) return res.sendStatus(404)
    videos = videos.filter(v => v.id !== video.id)
    return res.sendStatus(204)
})

deleteRouters.delete('/', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
})
