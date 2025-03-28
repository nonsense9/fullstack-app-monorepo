import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from "./module/prisma/prisma.module";
import { AuthModule } from "./module/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {
}
