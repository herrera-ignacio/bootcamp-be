import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

@Entity()
export default class Slot extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    isDisabled: boolean;
}
