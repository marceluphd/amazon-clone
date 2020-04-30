import { useQuery } from '@apollo/client'
import { FETCH_ONE_ITEM_QUERY } from 'queries'
import {
  FindOneItemQuery,
  FindOneItemQueryVariables,
} from 'generated/FindOneItemQuery'
import { useRouter } from 'next/router'
import { Error } from 'components'
import { formatMoney } from 'utils'
import Head from 'next/head'

const SingleItem = () => {
  const router = useRouter()
  const itemId = router.query.id

  const { loading, error, data } = useQuery<
    FindOneItemQuery,
    FindOneItemQueryVariables
  >(FETCH_ONE_ITEM_QUERY, {
    variables: {
      // @ts-ignore
      id: itemId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  if (!data.item) return <p>No item found for {itemId} </p>

  const { item } = data

  return (
    <div>
      <Head>
        <title>Amazon | {item.title}</title>
      </Head>
      {item.image && <img src={item.image} alt={item.title} />}
      <a>{item.title}</a>
      {formatMoney(item.price)}
      <p>{item.description}</p>
    </div>
  )
}

export default SingleItem
