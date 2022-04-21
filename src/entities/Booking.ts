import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Column,
} from "typeorm";

import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

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
}
