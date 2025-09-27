import type {
  ITransactionGroupByIdQuery,
  ITransactionsByGroupIdQuery,
} from "@/graphql/types/graphqlTypes";

export type TransactionsTypeData = NonNullable<
  ITransactionsByGroupIdQuery["transactions"]
>["nodes"];
export type TransactionsTypeRow = TransactionsTypeData[0];
export type TransactionGroupType = NonNullable<
  ITransactionGroupByIdQuery["transactionGroupById"]
>;
