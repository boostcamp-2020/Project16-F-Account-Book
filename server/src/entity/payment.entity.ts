import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import TranscationEntity from './transaction';
import UserEntity from './user.entity';

@Entity('Payment')
export default class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  pid!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'int' })
  uid!: number;

  @OneToMany(() => TranscationEntity, (transaction) => transaction.payment, { cascade: true })
  transactions?: TranscationEntity[];

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
