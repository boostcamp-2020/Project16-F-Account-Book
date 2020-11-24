import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from './category.entity';
import PaymentEntity from './payment.entity';
import UserEntity from './user.entity';

type ConstructorProps = {
  amount: number,
  tradeAt: Date,
  description: string, 
  isIncome: boolean, 
  category: CategoryEntity,
  user: UserEntity,
  payment: PaymentEntity
}

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

  constructor({
    amount,
    tradeAt,
    description,
    isIncome,
    category,
    user,
    payment }: ConstructorProps) {
    this.amount = amount;
    this.tradeAt = tradeAt;
    this.description = description;
    this.isIncome = isIncome;
    this.category = category;
    this.user = user;
    this.payment = payment;
  }
}