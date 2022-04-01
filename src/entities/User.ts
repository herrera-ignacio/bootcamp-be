import { IsEmail } from "class-validator";
import { 
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, 
} from "typeorm";


@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn()
    createdAt?: string;
  
  @UpdateDateColumn()
    updatedAt?: string;
  
  @Column({ type: "varchar", unique: true })
  @IsEmail()
    email: string;
}