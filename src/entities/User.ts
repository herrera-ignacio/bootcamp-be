import { IsEmail } from "class-validator";
import { 
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, 
} from "typeorm";
import EntityWithFactoryMethod from "../types/EntityWithFactoryMethod";

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

  @CreateDateColumn()
    createdAt?: string;
  
  @UpdateDateColumn()
    updatedAt?: string;
  
  @Column({ unique: true })
  @IsEmail()
    email: string;

  @Column({ nullable: true })
    firstName?: string;

  @Column({ nullable: true })
    lastName?: string;

  @Column({
    default: UserRole.CONTRACTOR,
  })
    role: UserRole;
}