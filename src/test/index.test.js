import auth from './auth.test';
import dbErrorHandler from './dbErrorHandler.test';

describe('API test', () => {
    describe('Register test', auth);
    describe('Database Error handling test', dbErrorHandler)
    
  });
  