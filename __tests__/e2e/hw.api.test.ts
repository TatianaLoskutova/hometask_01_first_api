import request from 'supertest'
import {app, HTTP_STATUSES} from '../../src';

describe('/videos', () => {
    let createdVideo1: any = null
    it('should  create course with correct input data', async () => {
        const createdResponse = await request(app)
            .post('/videos')
            .send( {title: 'string', author: 'sting', availableResolutions: [ 'P144']} )
            .expect(HTTP_STATUSES.CREATED_201)

        createdVideo1 = createdResponse.body

        expect(createdVideo1).toEqual({
            title: 'string',
            author: 'string',
            availableResolutions:[ 'P144']
        })

        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [createdVideo1])
    })
})

