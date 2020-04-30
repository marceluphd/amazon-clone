import { gql } from '@apollo/client'

const FETCH_ALL_ITEMS_QUERY = gql`
  query FetchAllItemsQuery {
    items {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`

export default FETCH_ALL_ITEMS_QUERY
