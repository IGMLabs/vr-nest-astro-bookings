import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

import { Response } from 'express';


@Catch()
export class MongodbErrorFilter<MongoError> implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    let status =  HttpStatus.BAD_REQUEST;
     // ! http specific
     const httpContext = host.switchToHttp();

     // Express specific
     const response = httpContext.getResponse<Response>();
    const  MONGO_CONFLICT = 11000;

    const ext:any = exception as any;
    if ((exception as any).code === MONGO_CONFLICT) status = HttpStatus.CONFLICT;
    else if (ext.name === "ValidationError") status = HttpStatus.BAD_REQUEST;
    else if ((ext.message as string).includes ("not found")) status = HttpStatus.NOT_FOUND;

      const responseError =     {
       statusCode: HttpStatus.BAD_REQUEST,
       message: "errorMessge"
     };
     response.status(status).json(responseError);
  }

  getExpressData(host: ArgumentsHost){
    // ! http specific
    const httpContext = host.switchToHttp();

    // Express specific
    const response = httpContext.getResponse<Response>();
    const request = httpContext.getRequest<Request>();
    return { request, response};
  }

}
