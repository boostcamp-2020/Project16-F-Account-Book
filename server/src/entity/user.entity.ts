import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CategoryEntity from './category';
import FixedExpenditureEntity from './fixedExpenditure.entity';
import PaymentEntity from './payment.entity';
import TranscationEntity from './transaction';

@Entity('User')
export default class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  uid!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar' })
  socialId!: string;

  @Column({ type: 'varchar' })
  socialType!: string;

  @OneToMany(() => CategoryEntity, (category) => category.user, { cascade: true })
  categories?: CategoryEntity[];

  @OneToMany(() => FixedExpenditureEntity, (fixedExpenditure) => fixedExpenditure.user, {
    cascade: true,
  })
  fixedExpenditures?: FixedExpenditureEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user, { cascade: true })
  payments?: PaymentEntity[];

  @OneToMany(() => TranscationEntity, (transaction) => transaction.user, { cascade: true })
  transactions?: TranscationEntity[];
}
