import { gql } from '@apollo/client'

const FETCH_ONE_ITEM_QUERY = gql`
  query FetchOneItemQuery($id: String!) {
    item(id: $id) {
      id
      title
      description
      price
      image
      largeImage
    }
  }
`

export default FETCH_ONE_ITEM_QUERY
