import Link from 'next/link'
import styled from 'styled-components'

const StyledItemButtons = styled.div``

interface ItemButtonsProps {
  itemId: number
}

const ItemButtons = (props: ItemButtonsProps) => (
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
