import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFxqlDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  FXQL: string;
}
