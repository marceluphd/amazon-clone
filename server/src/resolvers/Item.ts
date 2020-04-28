import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from 'type-graphql'
import { Item } from '../entities'

@InputType()
class CreateItemInput implements Partial<Item> {
  @Field()
  title: string

  @Field()
  description: string

  @Field((type) => Int)
  price: number

  @Field()
  image: string

  @Field()
  largeImage: string
}

@Resolver()
class ItemResolver {
  @Query((returns) => [Item])
  async items(): Promise<Array<Item>> {
    return await Item.find()
  }

  @Mutation((returns) => Item)
  async createItem(@Arg('input') newItemData: CreateItemInput): Promise<Item> {
    // TODO: check if they're logged in

    const item = await Item.create({
      ...newItemData,
    }).save()

    return item
  }
}

export default ItemResolver
