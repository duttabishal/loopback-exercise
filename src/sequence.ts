import {inject} from '@loopback/core';
import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import winston from 'winston';

export class MySequence extends MiddlewareSequence {
  @inject('winstonLogger.logger')
  private logger: winston.Logger;
  async handle(context: RequestContext): Promise<void> {
    const {request, response} = context;
    const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN?.split(', ');
    const {origin: referer, 'user-agent': userAgent} = request.headers;
    if (referer) {
      const flag = ALLOWED_ORIGIN?.find(elem => referer?.includes(elem));
      if (!flag) {
        throw new Error('Origin not allowed');
      }
    }
    const timeStart = new Date();
    await super.handle(context);
    const timeEnd = Date.now();
    const timeTaken = Math.round(timeEnd - timeStart.getTime());
    const message = `
    MySequence after handle
    request time =>  ${timeStart.toLocaleTimeString()}
    response time => ${timeTaken} ms
    referer => ${JSON.stringify(referer)}
    user-agent => ${JSON.stringify(userAgent)}
    authorization => ${request.headers.authorization}
    `;
    console.info(message);
    this.logger.info(message);
  }
}
