/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindOneItemQuery
// ====================================================

export interface FindOneItemQuery_item {
  __typename: "Item";
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  largeImage: string;
}

export interface FindOneItemQuery {
  item: FindOneItemQuery_item;
}

export interface FindOneItemQueryVariables {
  id: string;
}
