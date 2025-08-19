export class TestData {
  static generateUserData() {
    const timestamp = Date.now();
    const firstName = `TestUser`;
    const lastName = `LastName`;
    const email = `test.user.${timestamp}@example.com`;
    
    return {
      firstName,
      lastName,
      email,
      password: 'TestPassword123!',
      dateOfBirth: '01/01/1990',
      address: {
        address1: '123 Test Street',
        city: 'Test City',
        state: 'California',
        zipCode: '90210',
        country: 'United States',
        phone: '1234567890'
      }
    };
  }

  static getValidCredentials() {
    return {
      email: 'test.user@example.com',
      password: 'TestPassword123!'
    };
  }

  static getInvalidLoginCredentials() {
    return [
      { email: 'invalid@email.com', password: 'wrongpassword' },
      { email: 'notanemail', password: 'TestPassword123!' },
      { email: '', password: 'TestPassword123!' },
      { email: 'test.user@example.com', password: '' }
    ];
  }
  

    static getInvalidRegistrationCredentials1() {
    return {
      firstName: 'TestUser',
      lastName: 'LastName',
      email: 'invalidemail.com',
      password: 'wrongpassword!',
      dateOfBirth: '01/01/1990',
    };
  }
}