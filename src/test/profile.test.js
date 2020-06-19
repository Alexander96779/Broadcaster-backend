import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import UserRepository from '../repositories/userRepository';
import UserProfile from '../controllers/user.profile.controller';

chai.use(chaiHttp);
const { request } = chai;

let token2;
let token3;
const user = {
  userName: 'Espe',
  password: 'Espe1234',
  email: 'epseranceny@gmail.com'
};

const user1 = {
    userName: 'Pazzo',
    password: 'Pazzo1234',
    email: 'patrickish@gmail.com'
};
before((done) => {
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(user)
    .end(async (err, res) => {
      const { token } = await res.body.data;
      token2 = token;
      await UserRepository.verify(user.email, { isVerified: true });
      done();
    });
});

before((done) => {
    request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(user1)
      .end(async (err, res) => {
        const { token } = await res.body.data;
        token3 = token;
        done();
      });
  });

it('Should return user profile data', (done) => {
  request(app)
    .get('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
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

it('Should not return user profile data on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    userData: { email: 'test@gmail.com' }
  };

  UserProfile.getProfile(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should not update user profile on 500 error', (done) => {
  const res = {
    status: () => ({
      json: ({ st, err }) => ({ st, err })
    })
  };
  const smpl = {
    userData: { id: 1, email: 'test@gmail.com' },
    profile: { password: 1 }
  };

  UserProfile.updateUser(smpl, res).then(data => {
    expect(data).to.eq(undefined);
    done();
  });
});

it('Should update user profile', (done) => {
  request(app)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
    .field('firstName', 'Sharon')
    .field('lastName', 'Sharon')
    .field('gender', 'Female')
    .field('address', 'Kigali')
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

it('Should not update user profile for invalid inputs', (done) => {
  request(app)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
    .field('user_name', 1)
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

it('Should not update user profile if his/her account is not verified', (done) => {
  request(app)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token3}`)
    .field('firstName', 'Alexandre')
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

it('Should not update user profile if image format is invalid', (done) => {
  request(app)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
    .field('firstName', 'Esperance')
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

it('Should update user profile if image format is valid', () => {
  chai.request(app)
    .patch('/api/profile')
    .set('Accept', 'application/json')
    .set('token', `${token2}`)
    .field('lastName', 'Nyampinga')
    .attach('image', 'src/test/assets/image.png', 'image.png')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('data');
    })
    .catch((err) => {
      throw err;
    });
});

