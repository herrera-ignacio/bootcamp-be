import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from "typeorm";
import {  } from "class-validator";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";
import Slot from "./Slot";

@Entity()
export default class Room extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column()
    name: string;

  @Column({ default: false })
    isDisabled: boolean;

  @OneToMany(
    () => Slot, (slot: Slot) => slot.room,
  )
    slots: Slot[];


}
