import styled from 'styled-components'
import Link from 'next/link'
import { formatMoney } from 'utils'
import ItemButtons from './ItemButtons'

const StyledItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.grey};
`

const Title = styled.p``

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`

interface ItemProps {
  item: any
}

const Item = (props: ItemProps) => {
  const { item } = props

  return (
    <StyledItem>
      {/* {item.image && <img src={item.image} alt={item.title} />} */}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id },
          }}
        >
          {item.title}
        </Link>
      </Title>
      <Price>{formatMoney(item.price)}</Price>
      <p>{item.description}</p>
    </StyledItem>
  )
}

export default Item
