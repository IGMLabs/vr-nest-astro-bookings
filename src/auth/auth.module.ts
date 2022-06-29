import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CoreModule } from "src/core/core.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwcStrategyService } from './jwc-strategy/jwc-strategy.service';

@Module({
  imports: [CoreModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwcStrategyService],
})
export class AuthModule {}
