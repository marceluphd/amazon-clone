// import { ApolloServer } from 'apollo-server'
// import { buildSchema, Resolver, Query } from 'type-graphql'
// @Resolver()
// class HelloResolver {
//   @Query(() => [String])
//   async hello() {
//     return 'hello world'
//   }
// }
// const main = async () => {
//   const schema = await buildSchema({
//     resolvers: [HelloResolver],
//   })
//   const server = new ApolloServer({ schema })
//   server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`)
//   })
// }
// main()
var message = 'hello';
console.log(message);
