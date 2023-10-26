import jwt from 'jsonwebtoken';

export const GenerateToken = (email) => {
  const token = jwt.sign({ email }, 'secretKey', {
    expiresIn: '10000s',
  });
  return token;
};
