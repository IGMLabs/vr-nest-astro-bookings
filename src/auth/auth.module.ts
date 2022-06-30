import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CoreModule } from "src/core/core.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwcStrategyService } from './jwc-strategy/jwc-strategy.service';
import { User, UserSchema } from "./models/user.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  CoreModule, JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwcStrategyService],
})
export class AuthModule {}
