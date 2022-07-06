import { Trip } from "src/trips/entities/trip.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("bookings")
export class Booking {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Trip)
    trip : Trip;

    @Column({nullable: false})
    passengerName : string;

    @Column({type: 'timestamp', default: () => 'now()'})    
    date: Date;

    @Column({nullable: true})
    updateAt: Date;

    @Column()
    luggageKilos: number;

}
