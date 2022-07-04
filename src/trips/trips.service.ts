import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { UtilsService } from 'src/core/utils/utils.service';

@Injectable()
export class TripsService { 
  constructor( @InjectRepository(Trip) private tripRepository : Repository<Trip>,
                private readonly utilsService : UtilsService){}

 async  create(createTripDto: CreateTripDto) {
    const trip = this.tripRepository.create(createTripDto);
    trip.id = this.utilsService.createGUID();
    return await this.tripRepository.save(trip);
  }

  async findAll() {
    return await this.tripRepository.find();
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOneBy({ id: id });
    if (!trip) throw new EntityNotFoundError(Trip, id);
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    const updated = {
      ...trip,
      ...updateTripDto,
    };
    return await this.tripRepository.save(updated);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    return await this.tripRepository.remove(trip);
  }
}
