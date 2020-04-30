import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import styled from 'styled-components'

interface ErrorProps {
  error: ApolloError
}

const Error = ({ error }: ErrorProps) => {
  if (!error || !error.message) return null
  if (error.graphQLErrors.length) {
    return (
      <div>
        {error.graphQLErrors.map((error: GraphQLError, i: number) => (
          <p data-test="graphql-error" key={i}>
            <strong>Shoot!</strong>
            {error.message.replace('GraphQL error: ', '')}
          </p>
        ))}
      </div>
    )
  }
  return (
    <p data-test="graphql-error">
      <strong>Shoot!</strong>
      {error.message.replace('GraphQL error: ', '')}
    </p>
  )
}

export default Error
