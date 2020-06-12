import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;

before((done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'alexandre34@gmail.com',
        password: 'Kemmy123'
      })
      .end((err, res) => {
        const { token } = res.body.data;
        token1 = token;
        done();
      });
  });

  before((done) => {
    request(app)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .send({
      email: 'tresorc@gmail.com',
      password: 'Kemmy123'
    })
    .end((err, res) => {
      const { token } = res.body.data;
      token2 = token;
      done();
    });
  });

it('Should return error of not super admin', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .set(
      'token',
      `${token2}`
    )
    .send({
      role: 'administrator',
      email: 'mhjbh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(403);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return object with new role', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .set(
      'token',
      `${token1}`
    )
    .send({
      email: 'anaisecyu@gmail.com',
      role: 'administrator'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
      return done();
    });
});

it('Should return error to provide token', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .send({
      role: 'super-administrator',
      email: 'mhjh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return error about invalid token', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .set(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsImlhdCI6MTU4MDI0MDc1NH0.frkJgunuF3yxtaIqIQYe-yo2nA5SF4WrPUmxuvb5sYs'
    )
    .send({
      role: 'super-administrator',
      email: 'mhjh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return error of invalid inputs', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .set(
      'token',
      `${token1}`
    )
    .send({
      role: 'super-admin',
      email: 'mhjh@admin.com'
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res).to.have.status(422);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('error');
      return done();
    });
});

it('Should return error of not found', (done) => {
  request(app)
    .patch('/api/auth/changeRole')
    .set('Accept', 'application/json')
    .set(
      'token',
      `${token1}`
    )
    .send({
      role: 'administrator',
      email: 'edenhazard@gmail.com'
    })
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
