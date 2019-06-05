import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forecast } from './forecast.entity';
import { TvProgram } from './tvprogram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forecast,TvProgram])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
