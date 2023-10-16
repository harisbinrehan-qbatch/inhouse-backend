import jwt from 'jsonwebtoken';

export const GenerateToken = (username) => {
  const token = jwt.sign({ username }, 'secretKey', {
    expiresIn: '10000s',
  });
  return token;
};
