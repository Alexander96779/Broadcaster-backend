import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;
const logoutUrl = '/api/auth/logout';
let token2;

before((done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      userName: 'Tesi',
      password: 'Fantastic7',
      email: 'tesi1@admin.com'
    })
    .end((err, res) => {
      const { token } = res.body.data;
      token2 = token;
      done();
    });
});
it('should logout a logged in user', (done) => {
  request(app)
    .get(logoutUrl)
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.status).to.eq(200);
      expect(res.body.message).to.eq('You have logged out');
      done();
    });
});
it('should return an error if token is not provided', (done) => {
  request(app)
    .get(logoutUrl)
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.status).to.eq(400);
      expect(res.body.error).to.eq('invalid token');
      done();
    });
});

