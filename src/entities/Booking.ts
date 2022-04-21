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
    () => Slot, (slot: Slot) => slot.booking,
  )
    slot: Slot;
}
