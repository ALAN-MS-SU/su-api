import { Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionController } from './fusion.controller';

@Module({
  providers: [FusionService],
  controllers: [FusionController]
})
export class FusionModule {}
