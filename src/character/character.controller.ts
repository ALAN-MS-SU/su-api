import { Controller, Get } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from 'src/generated/client';

@Controller('character')
export class CharacterController {
  constructor(private Service: CharacterService) {}
  @Get()
  async GetAll(): Promise<Character[]> {
    const data = await this.Service.GetAll();
    return data;
  }
}
