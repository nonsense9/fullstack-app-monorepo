import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PrismaModule} from "./module/prisma/prisma.module";
import {AuthModule} from "./module/auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
