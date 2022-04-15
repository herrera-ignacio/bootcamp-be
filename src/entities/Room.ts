import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import {  } from "class-validator";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

@Entity()
export default class Room extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt: string;

  @UpdateDateColumn()
    updatedAt: string;

  @Column()
    name: string;

}
