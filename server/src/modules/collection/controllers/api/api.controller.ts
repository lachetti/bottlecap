import { Body, Controller, Get, Post } from '@nestjs/common';

interface ICap {
  id: number;
  name: string;
  imgLink: string;
  count: number;
}

@Controller('api')
export class ApiController {
  @Get()
  getCollection(): ICap[] {
    return [];
  }

  @Post()
  changeCap(@Body() newCap: ICap): boolean {
    console.log(newCap);

    return true;
  }
}
