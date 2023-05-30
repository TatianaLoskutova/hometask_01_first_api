import {Request, Response,Router} from 'express';

export const testingRouter = Router()
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
const videosDataBase: VideosType[] = [];

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videosDataBase.splice(0, videosDataBase.length);
    res.sendStatus(204)
})