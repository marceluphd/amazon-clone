import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import Item from './Item'

const FETCH_ALL_ITEMS = gql`
  {
    items {
      id
      title
      price
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const StyledItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
`

const ItemsList = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_ITEMS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Center>
      <StyledItemsList>
        {data.items.map((item: any) => (
          <Item key={item.id} item={item} />
        ))}
      </StyledItemsList>
    </Center>
  )
}

export default ItemsList
