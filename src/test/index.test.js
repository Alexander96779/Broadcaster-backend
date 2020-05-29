import auth from './auth.test';
import dbErrorHandler from './dbErrorHandler.test';
import verification from './verification.test';
import login from './login.test';

describe('API test', () => {
    describe('Register test', auth);
    describe('Database Error handling test', dbErrorHandler);
    describe('User Email verification test', verification);
    describe('User login test', login);
    
  });
  