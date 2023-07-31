import Chance from 'chance';

// fake email maker function
const chance = new Chance();
const fakeEmails = [];
export default function generateFakeEmails(numberOfEmails) {
  for (let i = 0; i < numberOfEmails; i++) {
    const fakeEmail = chance.email();
    fakeEmails.push(fakeEmail);
  }
  return fakeEmails;
}
