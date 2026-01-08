import { Injectable } from '@nestjs/common';
import { DefaultArgs } from '@prisma/client/runtime/wasm-compiler-edge';
import { Character } from 'src/generated/client';
import {
  CharacterInclude,
  CharacterOmit,
  CharacterOrderByWithRelationInput,
  CharacterSelect,
  CharacterWhereInput,
} from 'src/generated/models';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CharacterService {
  constructor(private Prisma: PrismaService) {}
  async GetAll(Filter?: {
    select?: CharacterSelect<DefaultArgs> | null | undefined;
    omit?: CharacterOmit<DefaultArgs> | null | undefined;
    include?: CharacterInclude<DefaultArgs> | null | undefined;
    where?: CharacterWhereInput | undefined;
    orderBy?:
      | CharacterOrderByWithRelationInput
      | CharacterOrderByWithRelationInput[];
  }) {
    const Characters = await this.Prisma.Connection<Character[]>(async () => {
      return await this.Prisma.character.findMany(Filter);
    });
    return Characters;
  }
  async Create({
    Name,
    TypeID,
    WeaponID,
  }: Pick<Character, 'Name' | 'TypeID' | 'WeaponID'>) {
    const Res = await this.Prisma.Connection<boolean>(async () => {
      const Data = await this.Prisma.character.create({
        data: { Name, TypeID, WeaponID },
      });
      if (Data) return true;
      return false;
    });
    return Res;
  }
}
