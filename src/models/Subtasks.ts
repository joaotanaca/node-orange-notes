import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity("subtasks")
export class Subtask {
    @PrimaryGeneratedColumn("uuid")
    readonly id?: string;

    @Column()
    title!: string;

    @Column()
    checked!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;

    @ManyToOne(() => Task, (task) => task.subtasks)
    task!: Task;

    @Column()
    taskId!: string;
}
