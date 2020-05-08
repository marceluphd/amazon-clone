import { useState, ChangeEvent, FormEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Error } from 'components'
import { FETCH_CURRENT_USER_QUERY } from 'queries'

const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [signIn, { error, loading, data }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [
      {
        query: FETCH_CURRENT_USER_QUERY,
      },
    ],
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
    await signIn({ variables: formData })

    // if signup is not successful, it will throw and exit the function
    // we only set state when sign up was successful
    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        {error && <Error error={error} />}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            id=""
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            id=""
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </form>
  )
}

export default SigninForm
