import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Spot from "./Spot";
import IEntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

@Entity()
export default class Pod extends IEntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @OneToMany(
    () => Spot,
    spot => spot.pod,
    {
      nullable: true,
      onDelete: "CASCADE",
    },
  )
    spots?: Spot[];

}
