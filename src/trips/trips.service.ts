import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { UtilsService } from 'src/core/utils/utils.service';
import { Booking } from 'src/bookings/entities/booking.entity';

@Injectable()
export class TripsService { 
  constructor( @InjectRepository(Trip) private tripRepository : Repository<Trip>,
              @InjectRepository(Booking) private bookingRepository : Repository<Trip>,
                private readonly utilsService : UtilsService){}

 async  create(createTripDto: CreateTripDto) {
    const trip = this.tripRepository.create(createTripDto);
    //trip.id = this.utilsService.createGUID();
    return await this.tripRepository.save(trip);
  }

  async findAll() {
    return await this.tripRepository.find();
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOne({where: {id: id },
      relations: {bookings:true}
    });
    if (!trip) throw new EntityNotFoundError(Trip, id);
    // trip.bookings =  await this.bookingRepository.findOneBy({id: id});
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
