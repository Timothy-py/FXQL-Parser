import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFxqlDto {
  @IsString()
  @IsNotEmpty()
  fxql: string;
}
