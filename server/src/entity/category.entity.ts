import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';
import TranscationEntity from './transaction.entity';

type ConsturctorProps = {
  name: string;
  isIncome: boolean;
  user: UserEntity;
};

@Entity('Category')
export default class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  cid!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'boolean' })
  isIncome!: boolean;

  @Column({ type: 'int' })
  uid!: number;

  @OneToMany(() => TranscationEntity, (transaction) => transaction.payment, { cascade: true })
  transactions?: TranscationEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categories, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'uid',
    referencedColumnName: 'uid',
  })
  user!: UserEntity;

  constructor(props?: ConsturctorProps) {
    if (props) {
      this.name = props.name;
      this.isIncome = props.isIncome;
      this.user = props.user;
    }
  }
}
