import { Connection } from 'typeorm';
import faker from 'faker';
import { testConn } from '../../test-utils/testConn';
import { gCall } from '../../test-utils/gCall';
import { User } from '../../entity';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const loggedQuery = `
{
  logged {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('Register', () => {
  it('logged user', async () => {
    
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();
    
    const response = await gCall({
      source: loggedQuery,
      userId: user.id
    });
  
    expect(response.data).toBeDefined();
    
    expect(response).toMatchObject({
      data: {
        logged: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })
  });
});
