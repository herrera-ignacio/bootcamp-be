import { IsEmail } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";
import Booking from "./Booking";

export enum UserRole {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
  DESIGNER = "DESIGNER",
  PM = "PROJECT MANAGER",
  SM = "SCRUM MASTER",
  HR = "HR",
  CONTRACTOR = "CONTRACTOR",
}

@Entity()
export default class User extends EntityWithFactoryMethod {
  @PrimaryGeneratedColumn()
    id: number;

  @Index({
    unique: true,
    where : "'auth0Id' IS NOT NULL",
  })

  @CreateDateColumn()
    createdAt?: string;

  @UpdateDateColumn()
    updatedAt?: string;

  @Column({ nullable: true })
    auth0Id?: string;

  @Column({ unique: true })
  @IsEmail()
    email: string;

  @Column({ nullable: true })
    firstName?: string;

  @Column({ nullable: true })
    lastName?: string;

  @Column({
    default: UserRole.CONTRACTOR,
    enum   : UserRole,
  })
    role: UserRole;

  @OneToMany(
    () => Booking, (bookings: Booking) => bookings.user,
  )
    bookings?: Booking[];
}
