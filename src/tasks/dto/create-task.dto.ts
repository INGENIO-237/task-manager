import { ApiProperty } from "@nestjs/swagger";

export class createTaskDto{
    @ApiProperty()
    title: string
}