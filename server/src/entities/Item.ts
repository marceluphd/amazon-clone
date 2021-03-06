import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, Float, ID } from 'type-graphql'

@ObjectType()
@Entity()
class Item extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  image: string

  @Field()
  @Column()
  largeImage: string

  @Field((type) => Float)
  @Column()
  price: number

  // @Field()
  // @Column()
  // createdAt: Date

  // @Field()
  // @Column()
  // updatedAt: Date

  // user: User
}

export default Item
