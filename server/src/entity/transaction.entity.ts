import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from './category.entity';
import PaymentEntity from './payment.entity';
import UserEntity from './user.entity';

type ConstructorProps = {
  amount: number;
  tradeAt: Date;
  description: string;
  isIncome: boolean;
  category: CategoryEntity;
  user: UserEntity;
  payment: PaymentEntity;
};

@Entity('Transaction')
@Index(['uid', 'tradeAt', 'description'])
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

  constructor(props?: ConstructorProps) {
    if (props) {
      this.amount = props.amount;
      this.tradeAt = props.tradeAt;
      this.description = props.description;
      this.isIncome = props.isIncome;
      this.category = props.category;
      this.user = props.user;
      this.payment = props.payment;
    }
  }
}
