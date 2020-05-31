import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('User reset password test', () => {
  it('should be able to send email if account exists', done => {
    chai.request(app)
      .post('/api/auth/forgotPassword')
      .send({ email: 'tresorc@gmail.com' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Link to reset password is sent to your email');
        done();
      });
  }).timeout(10000);

  it('should not be able to send email if account does not exist', done => {
    chai.request(app)
      .post('/api/auth/forgotPassword')
      .send({ email: 'mpinganzima4@gmail.com' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Looks like there is no account associated with your Email');
        done();
      });
  });
  it('should not be able to send email if validation errors', done => {
    chai.request(app)
      .post('/api/auth/forgotPassword')
      .send({ email: 'niyialexpgmail.com' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should be able to reset password', done => {
    chai.request(app)
      .patch('/api/auth/resetPassword/tresorc@gmail.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Password is updated successfully');
        done();
      });
  });
  it('should not be able to reset password if password do not match', done => {
    chai.request(app)
      .patch('/api/auth/resetPassword/tresorc@gmail.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123456' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'Password do not match!!');
        done();
      });
  });
  it('should not be able to reset password if user does not exist', done => {
    chai.request(app)
      .patch('/api/auth/resetPassword/nivvhjvjv@gmail.com/Bobo12345')
      .send({ password: 'Bobobola123', confirmPassword: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'User with that email is not found');
        done();
      });
  });
  it('should not be able to reset password if there are validation errors', done => {
    chai.request(app)
      .patch('/api/auth/resetPassword/mhj@admin.com/Bobo12345')
      .send({ password: 'Bobobola123' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });

});
