import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
    UpdateDateColumn,
    ManyToOne,
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

    @ManyToOne((type) => User)
    @JoinColumn()
    user!: User;

    @Column()
    userId!: string;

    @OneToMany(() => Subtask, (subtasks) => subtasks.task, { cascade: true })
    subtasks!: Subtask[];
}
