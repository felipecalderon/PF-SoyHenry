const { expect } = require('chai');
const { app } = require('../src/app.js');
const session = require('supertest-session');
const agent = session(app);

describe('User Routes (Rutas con info de usuarios)', () => {
  it('debería responder status 200 en ruta de todos los usuarios', () =>
    agent.get('/user')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(({body}) => {
        expect(body.users[0].name).to.equal('felipe');
      })
  );
  it('debería responder status 200 al buscar 1 usuario por query', () =>
    agent.get(`/user/?name=felipe`).expect(200)
  );
  it('debería responder status 200 al buscar 1 usuario por params (ID)', () =>
    agent.get(`/user/45`).expect(200)
  );
  it('debería responder 404 cuando no encuentre al usuario', () =>
    agent.get(`/user/455`).expect(404)
  );
})