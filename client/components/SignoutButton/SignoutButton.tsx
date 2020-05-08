import { gql, useMutation } from '@apollo/client'
import { FETCH_CURRENT_USER_QUERY } from 'queries'

const SIGNOUT_MUTATION = gql`
  mutation SignOutMutation {
    logout
  }
`

const SignoutButton = () => {
  const [logout, { loading, error, data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [
      {
        query: FETCH_CURRENT_USER_QUERY,
      },
    ],
  })
  const handleClick = async () => {
    console.log('going to log out')
    await logout()
    console.log('logged out')
  }

  return <button onClick={handleClick}>Sign Out!</button>
}

export default SignoutButton
