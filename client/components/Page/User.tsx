import { gql, useQuery } from '@apollo/client'
import { Error } from 'components'

const FETCH_CURRENT_USER_QUERY = gql`
  query FetchCurrentUserQuery {
    me {
      id
      email
      fullName
    }
  }
`

const User = () => {
  const { loading, error, data } = useQuery(FETCH_CURRENT_USER_QUERY)

  if (loading) return <p>Loading user...</p>
  if (error) return <Error error={error} />

  console.log(data)
  if (!data || !data.me) return null

  const { me } = data

  return (
    <div>
      <p>{me.fullName}</p>
    </div>
  )
}

export default User
