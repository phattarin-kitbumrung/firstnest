import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forecast } from './forecast.entity';
import { TvProgram } from './tvprogram.entity';

@Injectable()
export class CatsService {
   cat = [];
    constructor(@InjectRepository(Forecast) private readonly forecastRepository: Repository<Forecast>,
                @InjectRepository(TvProgram) private readonly tvprogramRepository: Repository<TvProgram>) {
    }

    create(data: object) {
        this.cat.push(data);
        console.log(this.cat);
    }

    findAll() {
        return this.cat;
    }

    findOne(id: string) {
        var result =  this.cat.filter(function(findcat) {
            return findcat.id == id;
        });
        return result[0];
    }

    async findAllForecast(): Promise<Forecast[]> {
        return await this.forecastRepository.find();
    }

    async findAllTvProgram(): Promise<TvProgram[]> {
        return await this.tvprogramRepository.find();
    }

    testFunc(){
        return "xxx";
    }
}
