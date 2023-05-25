import {Request, Response, Router} from 'express';

export const videoRouters = Router({})

// data
const video = {}
const videoBody = {
    id: +(new Date()),
    title: 'string',
    author: 'Tatiana L',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
}

videoRouters.post('/', (req:Request, res: Response)=> {

    let resolution = videoBody.availableResolutions.filter(r => r.indexOf(req.body.availableResolutions as string) > -1)

        const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'Tatiana L',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: resolution
    }
    res.sendStatus(201).send(newVideo)

})
