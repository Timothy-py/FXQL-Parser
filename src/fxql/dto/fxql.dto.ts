import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFxqlDto {
  @IsString()
  @IsNotEmpty()
  FXQL: string;
}
