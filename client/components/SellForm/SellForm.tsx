import { useState, ChangeEvent, FormEvent } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { Error } from 'components'
import Router from 'next/router'
import { CreateItemMutation } from 'generated/CreateItemMutation'

const StyledForm = styled.form``

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
    }
  }
`

const SellForm = () => {
  const [itemData, setItemData] = useState({
    title: 'Air jordans',
    description: 'A clean pair of sneakers',
    image: 'jordan.jpg',
    largeImage: 'jordan.jpg',
    price: 300,
  })

  const [createItem, { loading, error, data }] = useMutation<
    CreateItemMutation
  >(CREATE_ITEM_MUTATION)

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files![0])
    data.append('upload_preset', 'amazon-clone') // upload_preset required by cloudinary

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/jeffzh4ng/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )

    const file = await res.json()

    setItemData((oldItemData) => ({
      ...oldItemData,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value

    setItemData((oldItemData) => ({
      ...oldItemData,
      [name]: val,
    }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()

    createItem({ variables: { input: itemData } })
  }

  if (data) {
    Router.push({
      pathname: '/item',
      query: {
        id: data.createItem.id,
      },
    })
  }

  return (
    <StyledForm onSubmit={submitForm}>
      <h2>Sell an item</h2>

      {error && <Error error={error} />}

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          File
          <input
            type="file"
            id="file"
            name="file"
            placeholder="Upload an image"
            onChange={uploadFile}
            required
          />
          {itemData.image && <img src={itemData.image} alt={itemData.title} />}
        </label>

        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={itemData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={itemData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="description">
          Description
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={itemData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </StyledForm>
  )
}

export default SellForm
