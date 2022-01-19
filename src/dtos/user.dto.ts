import { IsString, IsDateString } from "class-validator";

class CreateUserDto {
  @IsString()
  public name: string;
 
  @IsString()
  public surname: string;
 
  @IsDateString()
  public birthday: Date;
}

export default CreateUserDto