/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateItemInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateItemMutation
// ====================================================

export interface CreateItemMutation_createItem {
  __typename: "Item";
  id: string;
}

export interface CreateItemMutation {
  createItem: CreateItemMutation_createItem;
}

export interface CreateItemMutationVariables {
  input: CreateItemInput;
}
