const bookmarks = require('../src/store')
const app = require('../src/app')

describe('Unauthorized requests', () => {
  it('responds 401 Unauthorized for GET /bookmarks', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(401, { error: "Unauthorized request" })
  })

  it('responds 401 Unauthorized for GET /bookmarks/:id', () => {
    return supertest(app)
      .get(`/bookmarks/${bookmarks[1].id}`)
      .expect(401, { error: "Unauthorized request" })
  })

  it('responds 401 Unauthorized for POST /bookmarks', () => {
    return supertest(app)
      .post(`/bookmarks`)
      .send({
        id: 100,
        title: 'title',
        url: 'www.test.com',
        description: 'test website',
        rating: 1
      })
      .expect(401, { error: "Unauthorized request" })
  })
})


describe('GET /bookmarks', () => {
  it('gets the bookmarks from the store', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, bookmarks)
  })
})

describe('GET /bookmarks/:id', () => {
  it('get bookmark from the store by id', () => {
    return supertest(app)
      .get(`/bookmarks/${bookmarks[1].id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, bookmarks[1])
  })
})

describe('POST /bookmarks', () => {
  it('responds 201 Created for POST /bookmarks', () => {
    const bookmark = {
      title: 'title',
      url: 'www.test.com',
      description: 'test website',
      rating: 1
    }
    return supertest(app)
      .post(`/bookmarks`)
      .send(bookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(201, bookmark)
  })
})