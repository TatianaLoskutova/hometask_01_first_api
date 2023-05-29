import {resolutions} from '../router/videos-router';

export type VideoType = {
    id : number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export type ErrorType = {
    message: string,
    filed: string
}