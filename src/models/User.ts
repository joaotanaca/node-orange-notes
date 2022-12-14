import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { Task } from "./Task";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];
}
