import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TranscationEntity from './transaction.entity';
import UserEntity from './user.entity';

type ConstructorProps = {
  name: string;
  user: UserEntity;
};

@Entity('Payment')
export default class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  pid!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'int' })
  uid!: number;

  @DeleteDateColumn()
  deletedDate?: Date;

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

  constructor(props?: ConstructorProps) {
    if (props) {
      this.name = props.name;
      this.user = props.user;
    }
  }
}
