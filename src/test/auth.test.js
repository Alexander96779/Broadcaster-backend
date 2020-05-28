import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

it('Should return a token', (done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      userName: 'Alex',
      password: 'Alex1234',
      email: 'alex12345@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
      return done();
    });
});

it('Should return a error email exist already', (done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      userName: 'Alex',
      password: 'Alex123445',
      email: 'alexandre34@gmail.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return an error for invalid user parameters', (done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      userName: 'Alex',
      password: 'Alex',
      email: 'alex@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(422);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should validate using dbHandler', (done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send({
      userName: 'alex',
      password: 'Alex',
      email: 'alex@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(422);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});
