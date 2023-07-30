import Chance from 'chance';

// fake email maker function
const chance = new Chance();
const fakeEmails = [];
const domain = 'hatemate.com';
export default function generateFakeEmails(numberOfEmails) {
  for (let i = 0; i < numberOfEmails; i++) {
    const localPart = chance.word();
    const fakeEmail = `${localPart}@${domain}`;
    fakeEmails.push(fakeEmail);
  }
  return fakeEmails;
}
