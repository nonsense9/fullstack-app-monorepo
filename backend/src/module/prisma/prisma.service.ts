import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(private configService: ConfigService) {
        const datasourceUrl =
          `postgresql://` +
          `${configService.get('DATABASE_USER')}:` +
          `${configService.get('DATABASE_PASSWORD')}@` +
          `${configService.get('DATABASE_HOST')}:` +
          `${configService.get('DATABASE_PORT')}/` +
          `${configService.get('DATABASE_NAME')}?schema=public`;
        super({datasourceUrl});
    }
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
