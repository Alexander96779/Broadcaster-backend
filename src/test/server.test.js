import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

it('Server Should handle the unkown routes for GET request ', (done) => {
  request(app)
    .get('/others')
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for POST request', (done) => {
  request(app)
    .post('/others')
    .send({ id: 3, name: 'Peter' })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for PATCH request ', (done) => {
  request(app)
    .patch('/others')
    .send({ id: 2, name: 'Paul' })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server Should handle the unkown routes for DELETE request ', (done) => {
  request(app)
    .delete('/others')
    .send({ id: 2 })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.status).to.eql(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Server should display homepage', (done) => {
  request(app)
    .get('/')
    .end((err, res) => {
      expect(res.status).to.eql(200);
      done();
    });
});
