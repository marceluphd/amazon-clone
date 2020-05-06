import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
  ID,
  Ctx,
} from 'type-graphql'
import { Item } from '../entities'
import { Context } from '../types'

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

@Resolver(Item)
class ItemResolver {
  @Query((returns) => Item, { nullable: true })
  async item(@Arg('id') id: string): Promise<Item | null> {
    return await Item.findOne(id)
  }

  @Query((returns) => [Item])
  async items(@Ctx() ctx: Context): Promise<Array<Item>> {
    console.log(ctx.req.session)
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

  @Mutation((returns) => Item)
  async deleteItem(@Arg('id') id: string): Promise<Item> {
    // 1. find the item
    const item = await Item.findOne(id)

    // 2. check if they have permissions
    // TODO

    // 3. delete
    await Item.delete(id)
    return item
  }
}

export default ItemResolver
