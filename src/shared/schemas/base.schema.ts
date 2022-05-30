import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export abstract class BaseSchema {
  @Transform(({ value }) => value.toHexString())
  @ApiProperty({ type: String })
  _id!: string;

  @ApiProperty()
  createdAt: Date = new Date();

  @ApiProperty()
  updatedAt: Date = new Date();

  deletedAt?: Date;

  deleted?: boolean;
}
