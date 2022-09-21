import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
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
    console.info(
      `MySequence after handle
    request time =>  ${timeStart.toLocaleTimeString()}
    response time => ${timeTaken} ms
    referer => %s
    user-agent => %s`,
      referer,
      userAgent,
    );
  }
}
