/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteItemMutation
// ====================================================

export interface DeleteItemMutation_deleteItem {
  __typename: "Item";
  id: string;
}

export interface DeleteItemMutation {
  deleteItem: DeleteItemMutation_deleteItem;
}

export interface DeleteItemMutationVariables {
  id: string;
}
