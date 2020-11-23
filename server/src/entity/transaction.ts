import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from './category';
import PaymentEntity from './payment.entity';
import UserEntity from './user.entity';

@Entity('Transaction')
export default class TranscationEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  tid!: number;

  @Column({ type: 'int' })
  amount!: number;

  @Column({ type: 'date' })
  tradeAt!: Date;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'boolean' })
  isIncome!: boolean;

  @Column({ type: 'int' })
  uid!: number;

  @Column({ type: 'int' })
  cid!: number;

  @Column({ type: 'int' })
  pid!: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'uid',
    referencedColumnName: 'uid',
  })
  user!: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.transactions, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'cid',
    referencedColumnName: 'cid',
  })
  category!: CategoryEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.transactions, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'pid',
    referencedColumnName: 'pid',
  })
  payment!: PaymentEntity;
}
