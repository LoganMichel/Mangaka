import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 255 })
  username: string;

  @Column('text', { nullable: false })
  bookRepositoryeUrl: string;
}
