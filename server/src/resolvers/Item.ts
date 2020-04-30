import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
  ID,
} from 'type-graphql'
import { Item } from '../entities'
import { getRepository } from 'typeorm'

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

@InputType()
class UpdateItemInput extends CreateItemInput {
  @Field((type) => ID)
  id: number
}

@Resolver()
class ItemResolver {
  @Query((returns) => Item)
  async item(@Arg('id') id: string): Promise<Item> {
    return await Item.findOne(id)
  }

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

  @Mutation((returns) => Item)
  async updateItem(
    @Arg('input') updateItemData: UpdateItemInput
  ): Promise<Item> {
    const id = updateItemData.id
    delete updateItemData.id

    await Item.update(id, updateItemData)
    return await Item.findOne(id)
  }
}

export default ItemResolver
