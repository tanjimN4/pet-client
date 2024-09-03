// ESM
import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    profiler: faker.image.avatar(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int(40), // Updated
    visits: faker.number.int(1000), // Updated
    progress: faker.number.int(100), // Updated
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 500,
});
