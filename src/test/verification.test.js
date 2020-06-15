import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

const user = {
  userName: 'Eric',
  password: 'Ericeric1234',
  email: 'erickar@gmail.com'
};

let token1;

before((done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(user)
    .end(async (err, res) => {
      const { token } = res.body.data;
      token1 = token;
      done();
    });
});

it('User should exist in the database before confirming', (done) => {
  request(app)
    .post('/api/auth/verification/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzaGFyb251YXNlQGdtYWlsLmNvbSIsImlhdCI6MTU4MDQwNjM0M30.8rC9m7J1E0BJd7NEdlW9rMIBbD6TkDZxiEaVo3iZV8Q')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('User should be able to verify his account', (done) => {
  request(app)
    .post(`/api/auth/verification/${token1}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('message');
      return done();
    });
});

it('User can not verify his account twice', (done) => {
  request(app)
    .post(`/api/auth/verification/${token1}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});
