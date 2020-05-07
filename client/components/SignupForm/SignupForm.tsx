import { useState, ChangeEvent, FormEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Error } from 'components'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($input: SignupInput!) {
    signup(input: $input) {
      id
    }
  }
`

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  })

  const [signUp, { error, loading, data }] = useMutation(SIGNUP_MUTATION)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signUp({ variables: { input: formData } })

    // if signup is not successful, it will throw and exit the function
    // we only set state when sign up was successful
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    })
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Signup for an account</h2>
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
        <label htmlFor="firstName">
          First name
          <input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName}
            onChange={handleChange}
            id=""
          />
        </label>
        <label htmlFor="lastName">
          Last name
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName}
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
        <button type="submit">Signup</button>
      </fieldset>
    </form>
  )
}

export default SignupForm
