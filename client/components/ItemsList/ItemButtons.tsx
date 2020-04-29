import Link from 'next/link'
import styled from 'styled-components'

const StyledItemButtons = styled.div``

interface Props {
  itemId: number
}

const ItemButtons = (props: Props) => (
  <StyledItemButtons>
    <Link
      href={{
        pathname: 'update',
        query: { id: props.itemId },
      }}
    >
      <a>Edit</a>
    </Link>

    <button>Add to cart</button>
    <button>Delete</button>
  </StyledItemButtons>
)

export default ItemButtons
