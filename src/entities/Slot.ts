import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";
import Booking from "./Booking";

@Entity()
export default class Slot extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column()
    isDisabled: boolean;

  @OneToMany(
    () => Booking, (bookings: Booking) => bookings.slot,
  )
    bookings?: Booking[];
}
