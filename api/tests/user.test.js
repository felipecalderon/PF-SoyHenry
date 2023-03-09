const { expect } = require('chai');
const { agent } = require('../src/app.js');

describe('User Routes', () => {
    it('should get 200 in home', () =>
      agent.get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(({body}) => {
          expect(body.msje).to.equal('en home');
        })
    );
    it('should get 200 in user list', () =>
      agent.get('/user')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(({body}) => {
          expect(body.users[0].name).to.equal('felipe');
        })
    );
    it('should get 200 when find one user', () =>
      agent.get(`/user/?name=felipe`).expect(200)
    );
    it('should get 200 when find the ID user', () =>
      agent.get(`/user/45`).expect(200)
    );
    it('should get 404 when not find the ID', () =>
      agent.get(`/user/455`).expect(404)
    );
  });