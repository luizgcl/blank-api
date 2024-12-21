import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn({
        type: 'uuid',
        generated: 'uuid',
    })
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'email' })
    email: string;

    @Column({
        enum: ['SYSADMIN', 'ADMIN', 'EMPLOYEE'],
    })
    role: 'SYSADMIN' | 'ADMIN' | 'EMPLOYEE';

    @CreateDateColumn({ name: 'created_at' })
    creaatedAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
