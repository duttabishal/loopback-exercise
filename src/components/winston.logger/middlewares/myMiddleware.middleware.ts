import {Middleware} from '@loopback/rest';
const jwt = require('jsonwebtoken');
export const myMiddleware: Middleware = async (ctx, next) => {
  const {request} = ctx;
  const cookies = request.headers.cookie;
  const userId = cookies ? cookies.split('user_id=')[1] : null;
  console.log('cookies from middleware => ', cookies);
  if (userId) {
    console.log();
    console.log('userId from  cookies => ', +userId);
    const token = await jwt.sign({userId: +userId}, process.env.SECRET);
    console.log('signed token from  userid => ', token);
    request.headers.authorization = `Bearer ${token}`;
  }
  const result = await next();
  return result;
};
