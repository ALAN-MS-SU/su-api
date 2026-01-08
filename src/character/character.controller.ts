import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character, Range } from 'src/generated/client';
import { TypeService } from 'src/type/type.service';
import { WeaponService } from 'src/weapon/weapon.service';
import express from 'express';
@Controller('character')
export class CharacterController {
  constructor(
    private Service: CharacterService,
    private Types: TypeService,
    private Weapons: WeaponService,
  ) {}
  @Get()
  async GetAll(@Res() res: express.Response) {
    const data = await this.Service.GetAll({
      select: {
        ID: true,
        Name: true,
        Type: true,
        Weapon: true,
      },
    });
    return res.status(200).json(data);
  }
  @Get(':Search')
  async GetSearch(
    @Param('Search') Search: string,
    @Res() res: express.Response,
  ) {
    const data = await this.Service.GetAll({
      select: {
        ID: true,
        Name: true,
        Type: true,
        Weapon: true,
      },
      where: {
        OR: [
          {
            Name: {
              contains: Search,
            },
          },
          {
            Type: {
              Type: {
                contains: Search,
              },
            },
          },
          {
            Weapon: {
              Name: {
                contains: Search,
              },
            },
          },
        ],
      },
    });
    return res.status(200).json(data);
  }
  @Post()
  async Post(
    @Body()
    { Name, TypeID, WeaponID }: Pick<Character, 'Name' | 'TypeID' | 'WeaponID'>,
    @Res() res: express.Response,
  ) {
    let Check: object | null | boolean = await this.Types.Find({
      where: { ID: TypeID },
    });
    if (!Check) return res.status(401).type('text/plain').send('Invalid type');
    if (WeaponID) {
      Check = await this.Weapons.Find({ where: { ID: WeaponID } });
      if (!Check)
        return res.status(401).type('text/plain').send('Invalid weapon');
    }
    Check = await this.Service.Create({ Name, TypeID, WeaponID });
    if (Check)
      return res
        .status(201)
        .type('text/plain')
        .send('Character has been created');
    return res
      .status(500)
      .type('text/plain')
      .send('Failed to create character');
  }
}
