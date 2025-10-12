import type {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from "@apollo/client/cache";
export type AuthenticatedUserKeySpecifier = (
  | "accessToken"
  | "email"
  | AuthenticatedUserKeySpecifier
)[];
export type AuthenticatedUserFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreditCardKeySpecifier = (
  | "_id"
  | "description"
  | "transactionGroupId"
  | CreditCardKeySpecifier
)[];
export type CreditCardFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IconPropertiesKeySpecifier = (
  | "background"
  | "color"
  | "icon"
  | IconPropertiesKeySpecifier
)[];
export type IconPropertiesFieldPolicy = {
  background?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  icon?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InstallmentsKeySpecifier = (
  | "current"
  | "total"
  | InstallmentsKeySpecifier
)[];
export type InstallmentsFieldPolicy = {
  current?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "createCategory"
  | "createCreditCard"
  | "createTransaction"
  | "createTransactionGroup"
  | "createUser"
  | "deleteCategory"
  | "deleteCreditCard"
  | "deleteTransaction"
  | "deleteTransactionGroup"
  | "forgotPassword"
  | "loginWithCredentials"
  | "now"
  | "resetPassword"
  | "transactionStatus"
  | "updateCategory"
  | "updateCreditCard"
  | "updateTransaction"
  | "updateTransactionGroup"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  createCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  createTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  createTransactionGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  createUser?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTransactionGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  loginWithCredentials?: FieldPolicy<any> | FieldReadFunction<any>;
  now?: FieldPolicy<any> | FieldReadFunction<any>;
  resetPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  updateTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  updateTransactionGroup?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ObjectKeyValueKeySpecifier = (
  | "key"
  | "value"
  | ObjectKeyValueKeySpecifier
)[];
export type ObjectKeyValueFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = (
  | "cursor"
  | "hasNextPage"
  | "totalCount"
  | PageInfoKeySpecifier
)[];
export type PageInfoFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "cardCategorySpending"
  | "categoriesByGroupId"
  | "categoryById"
  | "creditCardByGroupId"
  | "creditCardById"
  | "monthlyRevenueVsExpenses"
  | "monthlySpendingByCategory"
  | "now"
  | "transactionById"
  | "transactionGroupById"
  | "transactionTotals"
  | "transactions"
  | "transactionsGroup"
  | "viewer"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  cardCategorySpending?: FieldPolicy<any> | FieldReadFunction<any>;
  categoriesByGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
  categoryById?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCardByGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCardById?: FieldPolicy<any> | FieldReadFunction<any>;
  monthlyRevenueVsExpenses?: FieldPolicy<any> | FieldReadFunction<any>;
  monthlySpendingByCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  now?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionById?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionGroupById?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionTotals?: FieldPolicy<any> | FieldReadFunction<any>;
  transactions?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionsGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  viewer?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionKeySpecifier = (
  | "_id"
  | "amount"
  | "category"
  | "creditCard"
  | "date"
  | "description"
  | "installments"
  | "isRecurringPayment"
  | "status"
  | "transactionGroupId"
  | TransactionKeySpecifier
)[];
export type TransactionFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  date?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  installments?: FieldPolicy<any> | FieldReadFunction<any>;
  isRecurringPayment?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionCategoryKeySpecifier = (
  | "_id"
  | "description"
  | "iconProperties"
  | "isDefault"
  | "type"
  | TransactionCategoryKeySpecifier
)[];
export type TransactionCategoryFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  iconProperties?: FieldPolicy<any> | FieldReadFunction<any>;
  isDefault?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionDetailsPaginationKeySpecifier = (
  | "nodes"
  | "pageInfo"
  | "totalCount"
  | TransactionDetailsPaginationKeySpecifier
)[];
export type TransactionDetailsPaginationFieldPolicy = {
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionGroupKeySpecifier = (
  | "_id"
  | "description"
  | "iconProperties"
  | "owner"
  | TransactionGroupKeySpecifier
)[];
export type TransactionGroupFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  iconProperties?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionGroupedKeySpecifier = (
  | "groupBy"
  | "nodes"
  | TransactionGroupedKeySpecifier
)[];
export type TransactionGroupedFieldPolicy = {
  groupBy?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionGroupedDetailsPaginationKeySpecifier = (
  | "groups"
  | "pageInfo"
  | "totalCount"
  | TransactionGroupedDetailsPaginationKeySpecifier
)[];
export type TransactionGroupedDetailsPaginationFieldPolicy = {
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsByCategoryChartKeySpecifier = (
  | "amount"
  | "category"
  | "reportDate"
  | "transactions"
  | TransactionsByCategoryChartKeySpecifier
)[];
export type TransactionsByCategoryChartFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  reportDate?: FieldPolicy<any> | FieldReadFunction<any>;
  transactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsCardCategorySpendingKeySpecifier = (
  | "amount"
  | "category"
  | "creditCard"
  | "reportDate"
  | "transactions"
  | TransactionsCardCategorySpendingKeySpecifier
)[];
export type TransactionsCardCategorySpendingFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  reportDate?: FieldPolicy<any> | FieldReadFunction<any>;
  transactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsChartKeySpecifier = (
  | "expense"
  | "reportDate"
  | "revenue"
  | "transactions"
  | TransactionsChartKeySpecifier
)[];
export type TransactionsChartFieldPolicy = {
  expense?: FieldPolicy<any> | FieldReadFunction<any>;
  reportDate?: FieldPolicy<any> | FieldReadFunction<any>;
  revenue?: FieldPolicy<any> | FieldReadFunction<any>;
  transactions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsGroupedByCategoryPaginationKeySpecifier = (
  | "groupBy"
  | "nodes"
  | "pageInfo"
  | "totalCount"
  | TransactionsGroupedByCategoryPaginationKeySpecifier
)[];
export type TransactionsGroupedByCategoryPaginationFieldPolicy = {
  groupBy?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsTotalizeKeySpecifier = (
  | "percentageVariation"
  | "total"
  | TransactionsTotalizeKeySpecifier
)[];
export type TransactionsTotalizeFieldPolicy = {
  percentageVariation?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionsTotalsKeySpecifier = (
  | "balance"
  | "expense"
  | "revenue"
  | TransactionsTotalsKeySpecifier
)[];
export type TransactionsTotalsFieldPolicy = {
  balance?: FieldPolicy<any> | FieldReadFunction<any>;
  expense?: FieldPolicy<any> | FieldReadFunction<any>;
  revenue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ("_id" | "email" | "name" | UserKeySpecifier)[];
export type UserFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ViewerKeySpecifier = (
  | "_id"
  | "email"
  | "name"
  | ViewerKeySpecifier
)[];
export type ViewerFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  AuthenticatedUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuthenticatedUserKeySpecifier
      | (() => undefined | AuthenticatedUserKeySpecifier);
    fields?: AuthenticatedUserFieldPolicy;
  };
  CreditCard?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CreditCardKeySpecifier
      | (() => undefined | CreditCardKeySpecifier);
    fields?: CreditCardFieldPolicy;
  };
  IconProperties?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | IconPropertiesKeySpecifier
      | (() => undefined | IconPropertiesKeySpecifier);
    fields?: IconPropertiesFieldPolicy;
  };
  Installments?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InstallmentsKeySpecifier
      | (() => undefined | InstallmentsKeySpecifier);
    fields?: InstallmentsFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  ObjectKeyValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ObjectKeyValueKeySpecifier
      | (() => undefined | ObjectKeyValueKeySpecifier);
    fields?: ObjectKeyValueFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PageInfoKeySpecifier
      | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Transaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionKeySpecifier
      | (() => undefined | TransactionKeySpecifier);
    fields?: TransactionFieldPolicy;
  };
  TransactionCategory?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionCategoryKeySpecifier
      | (() => undefined | TransactionCategoryKeySpecifier);
    fields?: TransactionCategoryFieldPolicy;
  };
  TransactionDetailsPagination?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionDetailsPaginationKeySpecifier
      | (() => undefined | TransactionDetailsPaginationKeySpecifier);
    fields?: TransactionDetailsPaginationFieldPolicy;
  };
  TransactionGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionGroupKeySpecifier
      | (() => undefined | TransactionGroupKeySpecifier);
    fields?: TransactionGroupFieldPolicy;
  };
  TransactionGrouped?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionGroupedKeySpecifier
      | (() => undefined | TransactionGroupedKeySpecifier);
    fields?: TransactionGroupedFieldPolicy;
  };
  TransactionGroupedDetailsPagination?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | TransactionGroupedDetailsPaginationKeySpecifier
      | (() => undefined | TransactionGroupedDetailsPaginationKeySpecifier);
    fields?: TransactionGroupedDetailsPaginationFieldPolicy;
  };
  TransactionsByCategoryChart?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionsByCategoryChartKeySpecifier
      | (() => undefined | TransactionsByCategoryChartKeySpecifier);
    fields?: TransactionsByCategoryChartFieldPolicy;
  };
  TransactionsCardCategorySpending?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | TransactionsCardCategorySpendingKeySpecifier
      | (() => undefined | TransactionsCardCategorySpendingKeySpecifier);
    fields?: TransactionsCardCategorySpendingFieldPolicy;
  };
  TransactionsChart?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionsChartKeySpecifier
      | (() => undefined | TransactionsChartKeySpecifier);
    fields?: TransactionsChartFieldPolicy;
  };
  TransactionsGroupedByCategoryPagination?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | TransactionsGroupedByCategoryPaginationKeySpecifier
      | (() => undefined | TransactionsGroupedByCategoryPaginationKeySpecifier);
    fields?: TransactionsGroupedByCategoryPaginationFieldPolicy;
  };
  TransactionsTotalize?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionsTotalizeKeySpecifier
      | (() => undefined | TransactionsTotalizeKeySpecifier);
    fields?: TransactionsTotalizeFieldPolicy;
  };
  TransactionsTotals?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionsTotalsKeySpecifier
      | (() => undefined | TransactionsTotalsKeySpecifier);
    fields?: TransactionsTotalsFieldPolicy;
  };
  User?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  Viewer?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ViewerKeySpecifier
      | (() => undefined | ViewerKeySpecifier);
    fields?: ViewerFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
