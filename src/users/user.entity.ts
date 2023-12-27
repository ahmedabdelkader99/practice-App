// user.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log('Inserted User');
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User successfly');
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User');
  }
  // Optionally, you can define relationships here using decorators like @OneToMany, @ManyToOne, etc.
}
