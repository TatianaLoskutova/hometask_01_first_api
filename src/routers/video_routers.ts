import {Request, Response, Router} from 'express';

export const videoRouters = Router();

type AvailableResolutions = string[];
type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolutions
};

type ErrorInnerMessageType = {
    message: string;
    field: string
}

const videosDataBase: VideosType[] = [];
const validResolutions = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ];
const currentDate = new Date().toISOString()
const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
const errorOuterObject = { errorsMessages: [] }
const errorAuthorField = {
    message: 'Incorrect author',
    field: 'author'
}
const errorTitleField = {
    message: 'Incorrect title',
    field: 'title'
}
const errorCanBeDownloadedField = {
    message: 'Incorrect canBeDownloadedField',
    field: 'canBeDownloaded'
}
const errorMinAgeRestrictionField = {
    message: 'Incorrect minAgeRestriction',
    field: 'minAgeRestriction'
}
const errorAvailableResolutionsField = {
    message: 'Incorrect availableResolutions',
    field: 'minAgeRestriction'
}
const errorPublicationDateField = {
    message: 'Incorrect publicationDate',
    field: 'publicationDate'
}

const errorsArray: ErrorInnerMessageType[] = errorOuterObject.errorsMessages

const qualityCheck = (arr: string[], arr2: string[]) => {
    return arr.every((res:string) => arr2.includes(res))
};

videoRouters.get('/', (req:Request, res:Response) => {
    res.send(videosDataBase);
});

videoRouters.get('/:id', (req:Request, res:Response) => {
    const video = videosDataBase.find(v => v.id === +req.params.id)
    if(!video) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(video)
});

videoRouters.post('/', (req:Request, res:Response) => {
    const title = req.body.title
    const author = req.body.author
    const minAgeRestriction = req.body.minAgeRestriction
    const availableResolutions = req.body.availableResolutions
    const canBeDownloaded = req.body.canBeDownloaded
    const newVideo: VideosType = {
        id: +new Date(),
        title: title,
        author: author,
        canBeDownloaded: canBeDownloaded || false,
        minAgeRestriction: minAgeRestriction || null,
        createdAt: currentDate,
        publicationDate: tomorrowDate,
        availableResolutions: availableResolutions || ['P1080']
    }


    errorsArray.splice(0, errorsArray.length)

    if (!author || typeof author !== 'string' || author.length > 20 ||!author.trim()) {
        errorsArray.push(errorAuthorField)
    }

    if (!title || typeof title !== 'string' || title.length > 20 ||!title.trim()) {
        errorsArray.push(errorTitleField)
    }

    if (canBeDownloaded && typeof canBeDownloaded === 'boolean') {
        errorsArray.push(errorCanBeDownloadedField)
    }

    if (
        (minAgeRestriction && minAgeRestriction > 18) ||
        (minAgeRestriction && minAgeRestriction < 1) ||
        (minAgeRestriction && typeof minAgeRestriction !== 'number')
    ) {
        errorsArray.push(errorMinAgeRestrictionField)
    }

    if (
        availableResolutions && !qualityCheck(availableResolutions, validResolutions)
    ) {
        errorsArray.push(errorAvailableResolutionsField)
    }

    if (errorsArray.length === 0) {
        videosDataBase.push(newVideo)
        res.status(201).send(newVideo)
        return;
    }

    res.status(400).send(errorOuterObject)
});

videoRouters.put('/:id', (req:Request, res:Response) => {
    const video = videosDataBase.find(v => v.id === +req.params.id)
    if(video) {

        errorsArray.splice(0, errorsArray.length)

        const title = req.body.title
        const author = req.body.author
        const availableResolutions = req.body.availableResolutions
        const canBeDownloaded = req.body.canBeDownloaded
        const minAgeRestriction = req.body.minAgeRestriction
        const publicationDate = req.body.publicationDate

        if (!author || typeof author !== 'string' || author.length > 20 ||!author.trim()) {
            errorsArray.push(errorAuthorField)
        }

        if (!title || typeof title !== 'string' || title.length > 20 ||!title.trim()) {
            errorsArray.push(errorTitleField)
        }

        if (canBeDownloaded && typeof canBeDownloaded !== 'boolean') {
            errorsArray.push(errorCanBeDownloadedField)
        }

        if (
            (minAgeRestriction && minAgeRestriction > 18) ||
            (minAgeRestriction && minAgeRestriction < 1) ||
            (minAgeRestriction && typeof minAgeRestriction !== 'number')
        ) {
            errorsArray.push(errorMinAgeRestrictionField)
        }

        if (
            availableResolutions && !qualityCheck(availableResolutions, validResolutions)
        ) {
            errorsArray.push(errorAvailableResolutionsField)
        }

        if (publicationDate && typeof publicationDate !== 'string'){
            errorsArray.push(errorPublicationDateField)
        }

        if (errorsArray.length === 0) {
            video.title = title
            video.author = author
            video.availableResolutions = availableResolutions || ['P1080']
            video.canBeDownloaded = canBeDownloaded || false
            video.minAgeRestriction = minAgeRestriction || null
            video.publicationDate = publicationDate || tomorrowDate
            res.status(204).send(video)
            return
        }
        res.status(400).send(errorOuterObject)
    }
    res.sendStatus(404)
});

videoRouters.delete('/:id', (req:Request, res:Response) => {
    for (let i = 0; i < videosDataBase.length; i++) {
        if (videosDataBase[i].id === +req.params.id) {
            videosDataBase.splice(i, 1)
            res.status(204)
            return
        }
    }
    res.sendStatus(404)
});

videoRouters.delete('/', (req: Request, res: Response) => {
        videosDataBase.splice(0, videosDataBase.length)
        res.sendStatus(204)
    });