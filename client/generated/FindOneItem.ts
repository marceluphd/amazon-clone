/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindOneItem
// ====================================================

export interface FindOneItem_item {
  __typename: "Item";
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  largeImage: string;
}

export interface FindOneItem {
  item: FindOneItem_item;
}

export interface FindOneItemVariables {
  id: string;
}
