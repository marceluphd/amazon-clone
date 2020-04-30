import { FunctionComponent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Error } from 'components'
import { FETCH_ALL_ITEMS_QUERY } from 'queries'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: String!) {
    deleteItem(id: $id) {
      id
    }
  }
`

interface DeleteItemProps {
  itemId: string
}

const DeleteItem: FunctionComponent<DeleteItemProps> = ({
  children,
  itemId,
}) => {
  const onItemDelete = (cache: any, { data: { deleteItem } }: any) => {
    const data = cache.readQuery({ query: FETCH_ALL_ITEMS_QUERY })

    const freshItems = data.items.filter(
      (item: any) => item.id != deleteItem.id
    )

    cache.writeQuery({
      query: FETCH_ALL_ITEMS_QUERY,
      data: {
        items: freshItems,
      },
    })
  }

  const [
    deleteItem,
    { loading, error, data },
  ] = useMutation(DELETE_ITEM_MUTATION, { update: onItemDelete })

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this?')) {
          deleteItem({ variables: { id: itemId } })
        }
      }}
    >
      {children}
    </button>
  )
}

export default DeleteItem
