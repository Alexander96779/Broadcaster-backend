import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

let token1;
let token2;
let token3;

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
        token1 = token;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
          email: 'alexandre34@gmail.com',
          password: 'Kemmy123'
      })
      .end(async (err, res) => {
        const { token } = res.body.data;
        token2 = token;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
          email: 'borarehema@gmail.com',
          password: 'rehema123'
      })
      .end(async (err, res) => {
        const { token } = res.body.data;
        token3 = token;
        done();
      });
  });

  it('Should create new incident', (done) => {
    request(app)
      .post('/api/incident/create')
      .set('Accept', 'application/json')
      .set('token', `${token1}`)
      .field('title', 'Mituelle')
      .field('body', 'Dear government help us and donate mituelle to these families')
      .field('category', 'Intervention')
      .attach('image', 'src/test/assets/image.png', 'image.png')
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

  it('Should not create new incident if inputs are invalid', (done) => {
    request(app)
      .post('/api/incident/create')
      .set('Accept', 'application/json')
      .set('token', `${token1}`)
      .field('title', 'Mituelle')
      .field('body', 'Dear government help us and donate mituelle to these families')
      .field('category', 24)
      .attach('image', 'src/test/assets/image.png', 'image.png')
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

  it('Should not create new incident if image is invalid', (done) => {
    request(app)
      .post('/api/incident/create')
      .set('Accept', 'application/json')
      .set('token', `${token1}`)
      .field('title', 'Corruption')
      .field('body', 'Dear government help us and provide justice to Marie clire')
      .field('category', 'Red flag')
      .attach('image', 'src/test/assets/invalid.pdf', 'invalid.pdf')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(415);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('error');
        return done();
      });
  });
  
  // VIEW ALL INCIDENTS TESTS

  it('Should return all incidents that belong to user', (done) => {
    request(app)
      .get('/api/incident/viewAll')
      .set('Accept', 'application/json')
      .set('token', `${token1}`)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('data');
        return done();
      });
    });

    it('Should return an error message if user does not have incidents records', (done) => {
        request(app)
          .get('/api/incident/viewAll')
          .set('Accept', 'application/json')
          .set('token', `${token3}`)
          .then(res => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('error');
            return done();
          });
        });

        // FIND SPECIFIC INCIDENT TESTS
        it('Should find incident if the user created it', (done) => {
          request(app)
            .get('/api/incident/2')
            .set('Accept', 'application/json')
            .set('token', `${token1}`)
            .then(res => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.a.property('message');
              expect(res.body).to.have.a.property('data');
              return done();
            });
          });

          it('Should not find specific incident if not found', (done) => {
            request(app)
              .get('/api/incident/10')
              .set('Accept', 'application/json')
              .set('token', `${token1}`)
              .then(res => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('error');
                return done();
              });
            });

            it('Should not find specific incident if not created by', (done) => {
              request(app)
                .get('/api/incident/1')
                .set('Accept', 'application/json')
                .set('token', `${token3}`)
                .then(res => {
                  expect(res).to.have.status(404);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.a.property('error');
                  return done();
                });
              });

              it('Should find incident if Administrator', (done) => {
                request(app)
                  .get('/api/incident/3')
                  .set('Accept', 'application/json')
                  .set('token', `${token2}`)
                  .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.a.property('message');
                    expect(res.body).to.have.a.property('data');
                    return done();
                  });
                });

        // DELETE INCIDENTS TESTS
        it('Should delete incident if the user created it', (done) => {
          request(app)
            .delete('/api/incident/2/delete')
            .set('Accept', 'application/json')
            .set('token', `${token1}`)
            .then(res => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.a.property('message');
              return done();
            });
          });

          it('Should not delete if not found', (done) => {
            request(app)
              .delete('/api/incident/10/delete')
              .set('Accept', 'application/json')
              .set('token', `${token1}`)
              .then(res => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('error');
                return done();
              });
            });

            it('Should not delete if not created by', (done) => {
              request(app)
                .delete('/api/incident/1/delete')
                .set('Accept', 'application/json')
                .set('token', `${token3}`)
                .then(res => {
                  expect(res).to.have.status(401);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.a.property('error');
                  return done();
                });
              });

          it('Should delete incident if Administrator', (done) => {
            request(app)
              .delete('/api/incident/3/delete')
              .set('Accept', 'application/json')
              .set('token', `${token2}`)
              .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('message');
                return done();
              });
            });

describe('Admin incident tests', () => {
    it('Should return all incidents', (done) => {
      request(app)
        .get('/api/incident/viewAll')
        .set('Accept', 'application/json')
        .set('token', `${token2}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          return done();
        })
        .catch(err => done(err));
    });
});