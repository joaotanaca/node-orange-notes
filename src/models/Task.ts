import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    UpdateDateColumn,
} from "typeorm";
import { Subtask } from "./Subtasks";
import { User } from "./User";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column()
    title!: string;

    @Column()
    subtitle!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;

    @OneToOne((type) => User)
    @JoinColumn()
    user!: User;

    @Column()
    userId!: string;

    @OneToMany(() => Subtask, (subtasks) => subtasks.task)
    subtasks!: Subtask[];
}
