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
export type MutationKeySpecifier = (
  | "createCategory"
  | "createCreditCard"
  | "createTransactionGroup"
  | "createUser"
  | "deleteCategory"
  | "deleteCreditCard"
  | "deleteTransactionGroup"
  | "forgotPassword"
  | "loginWithCredentials"
  | "now"
  | "resetPassword"
  | "updateCategory"
  | "updateCreditCard"
  | "updateTransactionGroup"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  createCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  createTransactionGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  createUser?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTransactionGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  loginWithCredentials?: FieldPolicy<any> | FieldReadFunction<any>;
  now?: FieldPolicy<any> | FieldReadFunction<any>;
  resetPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCreditCard?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "categoriesByGroupId"
  | "categoryById"
  | "creditCardByGroupId"
  | "creditCardById"
  | "now"
  | "transactionGroupById"
  | "transactionsGroup"
  | "viewer"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  categoriesByGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
  categoryById?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCardByGroupId?: FieldPolicy<any> | FieldReadFunction<any>;
  creditCardById?: FieldPolicy<any> | FieldReadFunction<any>;
  now?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionGroupById?: FieldPolicy<any> | FieldReadFunction<any>;
  transactionsGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  viewer?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type UserKeySpecifier = ("_id" | "email" | "name" | UserKeySpecifier)[];
export type UserFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ViewerKeySpecifier = (
  | "_id"
  | "email"
  | "isAdmin"
  | "name"
  | ViewerKeySpecifier
)[];
export type ViewerFieldPolicy = {
  _id?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  isAdmin?: FieldPolicy<any> | FieldReadFunction<any>;
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
  TransactionCategory?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionCategoryKeySpecifier
      | (() => undefined | TransactionCategoryKeySpecifier);
    fields?: TransactionCategoryFieldPolicy;
  };
  TransactionGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TransactionGroupKeySpecifier
      | (() => undefined | TransactionGroupKeySpecifier);
    fields?: TransactionGroupFieldPolicy;
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
