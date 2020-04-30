import Link from 'next/link'
import styled from 'styled-components'
import DeleteItem from './DeleteItem'

const StyledItemButtons = styled.div``

interface ItemButtonsProps {
  itemId: string
}

const ItemButtons = ({ itemId }: ItemButtonsProps) => (
  <StyledItemButtons>
    <button>
      <Link
        href={{
          pathname: 'update',
          query: { id: itemId },
        }}
      >
        <a>Edit</a>
      </Link>
    </button>

    <DeleteItem itemId={itemId}>Delete</DeleteItem>

    <button>Add to cart</button>
  </StyledItemButtons>
)

export default ItemButtons
