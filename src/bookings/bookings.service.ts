/* eslint-disable max-lines-per-function */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UtilsService } from "src/core/utils/utils.service";
import { Trip } from "src/trips/entities/trip.entity";
import { Connection, Entity, EntityNotFoundError, Repository } from "typeorm";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { Booking } from "./entities/booking.entity";

@Injectable()
export class BookingsService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
    @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
    private connection: Connection,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const booking: Booking = this.bookingsRepository.create(createBookingDto);

    try {
      await queryRunner.startTransaction();

      const trip: Trip = await this.tripsRepository.findOneBy({ id: createBookingDto.tripId });

      this.bookTripPlaces(trip, createBookingDto, booking);
      await this.tripsRepository.save(trip);
      await this.bookingsRepository.save(booking);
      await queryRunner.commitTransaction();
    } catch (dbError) {
      await queryRunner.rollbackTransaction();
      throw dbError;
    } finally {
      await queryRunner.release();
    }
    return booking;
  }

  private bookTripPlaces(trip: Trip, createBookingDto: CreateBookingDto, booking: Booking) {
    if (!trip)
      throw new EntityNotFoundError(Trip, createBookingDto.tripId);
    if (trip.places <= createBookingDto.passengers)
      throw new Error("BUSINESS: Not enough places");
    trip.places -= createBookingDto.passengers;
    booking.id = this.utilsService.createGUID();
    booking.trip = trip;
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
