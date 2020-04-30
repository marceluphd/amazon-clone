import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import UpdateForm from './UpdateForm'
import { Error } from 'components'
import { FindOneItem, FindOneItemVariables } from 'generated/FindOneItem'

const FETCH_ONE_ITEM_QUERY = gql`
  query FindOneItem($id: String!) {
    item(id: $id) {
      id
      title
      description
      price
    }
  }
`

interface UpdateFormLoaderProps {
  itemId: string
}

const UpdateFormLoader = ({ itemId }: UpdateFormLoaderProps) => {
  const { loading, error, data } = useQuery<FindOneItem, FindOneItemVariables>(
    FETCH_ONE_ITEM_QUERY,
    {
      variables: {
        id: itemId,
      },
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />
  if (!data) return <p>No item found for for ID: ${itemId} </p>

  return <UpdateForm loadedItem={data.item} />
}

export default UpdateFormLoader
