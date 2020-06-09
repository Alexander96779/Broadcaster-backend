import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { request } = chai;

let token1;

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
