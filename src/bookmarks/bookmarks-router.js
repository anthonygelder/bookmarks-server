const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')

const app = express()

const bookmarksRouter = express.Router()
const bodyParser = express.json()

const bookmarks = [{
  title: "Google",
  url: "www.google.com",
  description: "Search Engine",
  rating: 1,
  id: 1
  },
  {
  title: "ESPN",
  url: "www.espn.com",
  description: "Sports",
  rating: 1,
  id: 2
  }
];

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks)
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    if (!title) {
      logger.error(`Title is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
    
    if (!url) {
      logger.error(`Url is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
  
    if (!description) {
      logger.error(`Description is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
    
    if (!rating) {
      logger.error(`Rating is required`);
      return res
        .status(400)
        .send('Invalid data');
    }
  
    const id = uuid();
  
    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    };
  
    bookmarks.push(bookmark);
  
    logger.info(`Bookmark with id ${id} created`);
  
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  })

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    console.log(id)
    const bookmark = bookmarks.find(c => c.id == id);
  
    // make sure we found a bookmark
    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    }
  
    res.json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(c => c.id == id);
  
    if (bookmarkIndex === -1) {
      logger.error(`bookmark with id ${id} not found.`);
      return res
        .status(404)
        .send('Not found');
    }
  
    bookmarks.splice(bookmarkIndex, 1);
  
    logger.info(`bookmark with id ${id} deleted.`);
  
    res
      .status(204)
      .end();
    });
  
  app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } }
    } else {
      console.error(error)
      response = { message: error.message, error }
    }
    res.status(500).json(response)
  })

module.exports = bookmarksRouter