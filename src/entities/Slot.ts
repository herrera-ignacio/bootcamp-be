import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";
import Booking from "./Booking";
import Room from "./Room";

@Entity()
export default class Slot extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({
    default: false,
  })
    isDisabled: boolean;

  @OneToMany(
    () => Booking, (bookings: Booking) => bookings.slot,
  )
    bookings?: Booking[];

  @ManyToOne(
    () => Room, (room: Room) => room.slots,
  )
    room: Room;

}
