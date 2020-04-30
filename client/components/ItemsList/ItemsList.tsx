import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Item from './Item'
import {
  FetchAllItemsQuery,
  FetchAllItemsQuery_items,
} from 'generated/FetchAllItemsQuery'
import { FETCH_ALL_ITEMS_QUERY } from 'queries'

const Center = styled.div`
  text-align: center;
`

const StyledItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 60px;
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
`

const ItemsList = () => {
  const { loading, error, data } = useQuery<FetchAllItemsQuery>(
    FETCH_ALL_ITEMS_QUERY
  )

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Center>
      <StyledItemsList>
        {data.items.map((item: FetchAllItemsQuery_items) => (
          <Item key={item.id} item={item} />
        ))}
      </StyledItemsList>
    </Center>
  )
}

export default ItemsList
