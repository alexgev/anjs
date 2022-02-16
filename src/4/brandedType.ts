// type UserEmail = string & {readonly UserEmail: unique symbol};

// const validate = (value: string) => {
//   return value && /^[\d\w\.\-]+@itkachalka.ru$/.test(value);
// }

// const UserEmail = (value: string) => {
//   if (!validate(value)) {
//     throw new Error('Invalid user email');
//   }
//   return value as UserEmail
// }

// type User = {
//   id: string,
//   email: UserEmail
// }

// const user: User = {
//   id: '1',
//   email: UserEmail('gevorkyan.alexey@itkachalka.ru')
// }


// const fu = (id: string, email: UserEmail) => {
//   console.log('success');
// };
// fu(user.id, user.email);


type NotEmptyString = string & { readonly NotEmptyString: unique symbol }
const NotEmptyString = {
  ofString: (value: string) => {
    if (!value.length) throw new Error('Its empty string');
    return value as NotEmptyString
  }
}

type StringWithoutBadWords = NotEmptyString & { readonly StringWithoutBadWords: unique symbol }
const StringWithoutBadWords = {
  ofString: (value: string) => {
    const notEmptyString = NotEmptyString.ofString(value) as StringWithoutBadWords;
    const bannedWords = ['fuck'];
    bannedWords.forEach(bannedWord => {
      if (notEmptyString.includes(bannedWord)) throw new Error('Bad word detected');
    })
    return notEmptyString as StringWithoutBadWords;
  }
}

type Email = StringWithoutBadWords & { readonly Email: unique symbol }
const Email = {
  ofString: (value: string) => {
    if (!value.includes('@')) throw new Error('Its not an email');
    return StringWithoutBadWords.ofString(value) as Email;
  }
}

const a = Email.ofString('hello@hello');
console.log('a', a);
