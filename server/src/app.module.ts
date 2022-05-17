import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './modules/collection/controllers/api/api.controller';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
