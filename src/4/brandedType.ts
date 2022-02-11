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