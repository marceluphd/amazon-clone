import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'

enum Permission {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ITEMCREATE = 'ITEMCREATE',
  ITEMUPDATE = 'ITEMUPDATE',
  ITEMDELETE = 'ITEMDELETE',
  PERMISSIONUPDATE = 'PERMISSIONUPDATE',
}

registerEnumType(Permission, {
  name: 'Permission',
})

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  fullName: string

  @Field()
  @Column('text', { unique: true })
  email: string

  @Field()
  @Column()
  password: string

  @Column('bool', { default: false })
  confirmed: boolean
}

export default User
