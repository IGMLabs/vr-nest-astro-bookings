import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { MonitorMiddleware } from './middlewares/monitor.middleware';
import { UtilsService } from './utils/utils.service';

// const mongoUser = "";
// const mongoPass = "";
// const mongoHost = "localhost:27017";
// const mongoDB = "";
const mongoUri = `mongodb://@localhost:27017`;

// const mongoUri = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}/${mongoDB}?authSource=admin`;

@Module({
    imports: [ThrottlerModule.forRoot({ttl:60, limit:10}),
        MongooseModule.forRoot(mongoUri)],
  providers: [
    UtilsService,
    {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    },
    {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }
],
  exports:[UtilsService]
})
export class CoreModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(helmet()).forRoutes("*");
        consumer.apply(MonitorMiddleware).forRoutes("*");
    }    
}
