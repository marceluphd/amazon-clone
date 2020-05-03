import styled from 'styled-components'
import Link from 'next/link'
import { formatMoney } from 'utils'
import { FetchAllItemsQuery_items } from 'generated/FetchAllItemsQuery'
import ItemButtons from './ItemButtons'

const StyledItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.grey};
`

const StyledImage = styled.img`
  height: 12rem;
`

const Title = styled.p``

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`

interface ItemProps {
  item: FetchAllItemsQuery_items
}

const Item = (props: ItemProps) => {
  const { item } = props

  return (
    <StyledItem>
      {item.image && <StyledImage src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <Price>{formatMoney(item.price)}</Price>

      <ItemButtons itemId={item.id} />
    </StyledItem>
  )
}

export default Item
