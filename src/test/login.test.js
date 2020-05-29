import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import impDB from './loginTestData';
import app from '../app';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('Login Tests', () => {
  it('all users should not be able to login when email field is empty', (done) => {
    router()
      .post('/api/auth/login')
      .send(impDB[0])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('error');
        done(error);
      });
  });
  it('all users should not be able to login when password field is empty', (done) => {
    router()
      .post('/api/auth/login')
      .send(impDB[1])
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('error');
        done(error);
      });
  });
  it('all users should not be able to login when email is invalid', (done) => {
    router()
      .post('/api/auth/login')
      .send(impDB[5])
      .end((error, response) => {
        expect(response).to.have.status([404]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  it('all users should not be able to login when password is invalid', (done) => {
    router()
      .post('/api/auth/login')
      .send(impDB[4])
      .end((error, response) => {
        expect(response).to.have.status([404]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  it('all users should not be able to login when not found', (done) => {
    router()
      .post('/api/auth/login')
      .send(impDB[5])
      .end((error, response) => {
        expect(response).to.have.status([404]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(404);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  it('all users should be successful able to login when all inserted data are correct', (done) => {
    router()
      .post('/api/auth/login')
      .send({
        email: 'alexandre34@gmail.com',
        password: 'Kemmy123'
      })
      .end((error, response) => {
        expect(response).to.have.status([200]);
        expect(response.body.status).to.be.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(200);
        expect(response.body).to.have.property('message');
        done(error);
      });
  });
});
