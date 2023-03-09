const { expect } = require('chai');
const { app } = require('../src/app.js');
const session = require('supertest-session');
const agent = session(app);

describe('Post Routes (Publicaciones de empleo)', () => {
    it('debería responder status 200 en ruta de todos los empleos publicados', () =>
      agent.get('/posts')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(({body}) => {
          expect(body.users[0].empresa).to.equal('Linkedin');
        })
    );
    it('debería responder status 200 al hacer filtro de posts por query', () =>
      agent.get(`/post/?query=react`).expect(200)
    );
    it('debería responder status 200 al buscar 1 post por params (ID)', () =>
      agent.get(`/post/45`).expect(200)
    );
    it('debería responder 404 cuando no encuentre el post', () =>
      agent.get(`/post/455abc`).expect(404)
    );
  });