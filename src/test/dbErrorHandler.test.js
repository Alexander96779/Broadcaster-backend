import { expect } from 'chai';
import DbErrorHandler from '../utils/dbErrorHandler';

const error = {
  name: 'SequelizeValidationError',
  errors: [
    { message: 'SequelizeValidationError Message' }
  ],
  parent: { code: '23500' }
};

const error1 = {
  name: 'SequelizeUniqueConstraintError',
  errors: [
    { message: 'SequelizeUniqueConstraintError Message' }
  ]
};

const error2 = {
  name: 'SequelizeDatabaseError',
  errors: [
    { message: 'SequelizeDatabaseError Message' }
  ],
  parent: { code: '23502' }
};

const error3 = {
  name: 'DatabaseError',
  errors: [
    { message: 'SequelizeDatabaseError Message' }
  ],
  parent: { code: '23502' }
};

const res = {
  status: () => ({
    json: ({ st, err }) => ({ st, err })
  })
};

describe('dbErrorHandler Test', () => {
  it('Should validate SequelizeValidationError', (done) => {
    DbErrorHandler.handleSignupError(res, error).then(data => {
      expect(data).to.eq(undefined);
      done();
    });
  });

  it('Should validate SequelizeUniqueConstraintError', (done) => {
    DbErrorHandler.handleSignupError(res, error1).then(data => {
      expect(data).to.eq(undefined);
      done();
    });
  });

  it('Should validate SequelizeDatabaseError', (done) => {
    DbErrorHandler.handleSignupError(res, error2).then(data => {
      expect(data).to.eq(undefined);
      done();
    });
  });

  it('Should validate DatabaseError', (done) => {
    DbErrorHandler.handleSignupError(res, error3).then(data => {
      expect(data).to.eq(undefined);
      done();
    });
  });
});
