import app from './app.js'
import request from 'supertest'

describe("App Test", () => {
    test('GET /', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
        expect(res.body.info).toBeDefined()
        expect(res.body.info).toBe('Journal API')
    })
})

describe("GET /categories", () => {
    let res

    beforeEach(async () => {
        res = await request(app).get('/categories')
    })

    test('Returns JSON content', async () => {
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('json')
    })

    test('Returns an array', async () => {
        expect(res.body).toBeInstanceOf(Array)
    })

    test('Array contains 4 elements', async () => {
        expect(res.body).toHaveLength(4)
    })

    test('Returns an array', async () => {
        expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: "Food" })]))
    })
})