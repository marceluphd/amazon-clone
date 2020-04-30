/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateItemMutation
// ====================================================

export interface UpdateItemMutation_updateItem {
  __typename: "Item";
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface UpdateItemMutation {
  updateItem: UpdateItemMutation_updateItem;
}

export interface UpdateItemMutationVariables {
  input: UpdateItemInput;
}
