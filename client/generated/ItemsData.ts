/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemsData
// ====================================================

export interface ItemsData_items {
  __typename: "Item";
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  largeImage: string;
}

export interface ItemsData {
  items: ItemsData_items[];
}
