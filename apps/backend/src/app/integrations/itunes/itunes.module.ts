import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItunesService } from './itunes.service';

@Module({
  imports: [HttpModule],
  exports: [ItunesService],
  providers: [ItunesService],
})
export class ItunesModule {}
