import { ChannelService } from '@/channel/channel.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';

@Module({
  imports: [PrismaModule],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
