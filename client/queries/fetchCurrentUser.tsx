import { gql } from '@apollo/client'

const FETCH_CURRENT_USER_QUERY = gql`
  query FetchCurrentUserQuery {
    me {
      id
      email
      fullName
    }
  }
`

export default FETCH_CURRENT_USER_QUERY
