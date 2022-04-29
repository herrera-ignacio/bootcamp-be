import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from "typeorm";

import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";
import Slot from "./Slot";
import User from "./User";

@Entity()
export default class Booking extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({ nullable: false })
    startDate: string;

  @Column({ nullable: false })
    endDate: string;

  @ManyToOne(
    () => Slot, (slot: Slot) => slot.bookings,
  )
    slot: Slot;

  @ManyToOne(
    () => User, (user: User) => user.bookings,
  )
    user: User;
}
