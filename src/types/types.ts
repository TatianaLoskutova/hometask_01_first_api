export type VideoType = {
    id : number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string []
}

export type Error = {
    message: string,
    filed: string
}