import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';

@Module({
  providers: [WeaponService],
  controllers: [WeaponController]
})
export class WeaponModule {}
