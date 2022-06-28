import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class BusinessErrorFilter<Error> implements ExceptionFilter {
  private readonly logger = new Logger('BusinessErrorFilter');
  catch(exception: Error, host: ArgumentsHost) {
      // ! http specific
    const httpContext = host.switchToHttp();

    // Express specific
    const response = httpContext.getResponse<Response>();
    const errorMessge = "👮‍♂️" + (exception as any).message;
    this.logger.debug(errorMessge);
    response.status(HttpStatus.BAD_REQUEST).json(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message: errorMessge
    });
    
  }
}
