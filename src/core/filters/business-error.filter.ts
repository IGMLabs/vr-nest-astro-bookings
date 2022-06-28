import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class BusinessErrorFilter<Error> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
      // ! http specific
    const httpContext = host.switchToHttp();

    // Express specific
    const response = httpContext.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "👮‍♂️" + (exception as any).message
    });
    
  }
}
