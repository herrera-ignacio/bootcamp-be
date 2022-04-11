import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import Pod from "./Pod";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";


@Entity()
export default class Spot extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column()
   is_Disabled: boolean;

   @ManyToOne(
    () => Pod, (pod: Pod) => Pod.spots,
  )
    pod: Pod;
}