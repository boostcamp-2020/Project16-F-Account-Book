import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity('FixedExpenditure')
export default class FixedExpenditureEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  fid!: number;

  @Column({ type: 'date' })
  tradeAt!: Date;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'int' })
  uid!: number;

  @ManyToOne(() => UserEntity, (user) => user.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'uid',
    referencedColumnName: 'uid',
  })
  user!: UserEntity;
}
