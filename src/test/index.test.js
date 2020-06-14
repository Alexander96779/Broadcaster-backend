import auth from './auth.test';
import dbErrorHandler from './dbErrorHandler.test';
// import verification from './verification.test';
import login from './login.test';
import reset from './reset.test';
import assignRole from './assignRole.test';
import profile from './profile.test';
import incident from './incident.test';

describe('API test', () => {
    describe('Register test', auth);
    describe('Database Error handling test', dbErrorHandler);
    // describe('User Email verification test', verification);
    describe('User login test', login);
    describe('User forgot and reset password test', reset);
    describe('Change user role by admin test', assignRole);
    describe('User update profile tests', profile);
    describe('User create new  incident tests', incident);
    
  });
  