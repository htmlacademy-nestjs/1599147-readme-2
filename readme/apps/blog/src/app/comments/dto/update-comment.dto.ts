import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {

  @ApiProperty({
    description: 'Comments text',
    example: 'The great comment!'
  })
  @Expose()
  public text: string;

}
