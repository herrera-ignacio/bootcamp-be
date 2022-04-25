import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

@Entity()
export default class Slot extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({
    default: true,
  })
    isDisabled: boolean;
}
