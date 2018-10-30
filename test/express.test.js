const { expect } = require('chai');
const nock = require('nock');
const response = require('./response');
const app = require('../server');
let API_KEY = '9AJ46K9IWHWo9UeBLVrD6HGV7sXyNxfP';
const request = require('supertest')(app);

describe('GET images', () => {
  beforeEach(() => {
    nock('https://api.giphy.com')
      .get(`/v1/gifs/search?q=+smile&api_key=${API_KEY}`)
      .reply(200, response);
  });
  it('returns a object with gifs', done => {
    request.get('/api/smile').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });
    done();
  });
});
