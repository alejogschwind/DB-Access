import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Course } from "./Course";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  avatar: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(() => Course, course => course.instructors)
  courses: Course[];
}
