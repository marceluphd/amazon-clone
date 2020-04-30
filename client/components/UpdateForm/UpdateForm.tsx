import { useState, ChangeEvent, FormEvent } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { Error } from 'components'
import Router from 'next/router'
import {
  UpdateItemMutation,
  UpdateItemMutationVariables,
} from 'generated/UpdateItemMutation'
import { FindOneItemQuery_item } from 'generated/FindOneItemQuery'

const StyledForm = styled.form``

const UPDATE_ITEM_MUTATION = gql`
  mutation UpdateItemMutation($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
      title
      description
      price
    }
  }
`

interface UpdateFormProps {
  loadedItem: FindOneItemQuery_item
}

const UpdateForm = (props: UpdateFormProps) => {
  const { loadedItem } = props

  const [updateItemData, setUpdateItemData] = useState({
    title: loadedItem.title,
    description: loadedItem.description,
    image: loadedItem.image,
    largeImage: loadedItem.largeImage,
    price: loadedItem.price,
  })

  const [updateItem, { loading, error, data }] = useMutation<
    UpdateItemMutation,
    UpdateItemMutationVariables
  >(UPDATE_ITEM_MUTATION)
  if (data) {
    Router.push({
      pathname: '/item',
      query: {
        id: data.updateItem.id,
      },
    })
  }

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

    setUpdateItemData((oldItemData) => ({
      ...oldItemData,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value

    setUpdateItemData((oldItemData) => ({
      ...oldItemData,
      [name]: val,
    }))
  }

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    updateItem({
      variables: { input: { id: loadedItem.id, ...updateItemData } },
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
          />
          {updateItemData.image && (
            <img src={updateItemData.image} alt={updateItemData.title} />
          )}
        </label>

        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={updateItemData.title}
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
            value={updateItemData.price}
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
            value={updateItemData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Save changes</button>
      </fieldset>
    </StyledForm>
  )
}

export default UpdateForm
