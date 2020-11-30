import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';

type ConstructorProps = {
  tradeAt: Date;
  amount: number;
  description: string;
  uid: number;
};
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

  constructor(props?: ConstructorProps) {
    if (props) {
      this.tradeAt = props.tradeAt;
      this.amount = props.amount;
      this.description = props.description;
      this.uid = props.uid;
    }
  }
}
