import {videos} from './index';

export function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result
}



// const videos = [{
//     id : +new Date(),
//     title: 'Test video',
//     author: 'Tatiana',
//     canBeDownloaded: false,
//     minAgeRestriction: null,
//     createdAt: new Date().toISOString(),
//     publicationDate: addDays(new Date().toISOString(), 1).toISOString(),
//     availableResolutions: [ 'P144' ]
// }]

// export async function createVideo(video: CreateVideoInput): Promise<Video> {
//     const  createdAt= new Date().toISOString();
//     const newVideo = {
//         id: +new Date(),
//         canBeDownloaded: false,
//         minAgeRestriction: null,
//         ...video,
//         createdAt,
//         publicationDate: video?.publicationDate || addDays(createdAt, 1).toISOString(),
// };
//     videos.push(newVideo);
//     return newVideo;
