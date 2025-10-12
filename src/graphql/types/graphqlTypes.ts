export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AccountNumber: { input: any; output: any };
  BigInt: { input: any; output: any };
  Byte: { input: any; output: any };
  CountryCode: { input: any; output: any };
  CountryName: { input: any; output: any };
  Cuid: { input: any; output: any };
  Currency: { input: any; output: any };
  Cursor: { input: any; output: any };
  DID: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  DateTimeISO: { input: any; output: any };
  DeweyDecimal: { input: any; output: any };
  Duration: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  GUID: { input: any; output: any };
  GeoJSON: { input: any; output: any };
  HSL: { input: any; output: any };
  HSLA: { input: any; output: any };
  HexColorCode: { input: any; output: any };
  Hexadecimal: { input: any; output: any };
  IBAN: { input: any; output: any };
  IP: { input: any; output: any };
  IPCPatent: { input: any; output: any };
  IPv4: { input: any; output: any };
  IPv6: { input: any; output: any };
  ISBN: { input: any; output: any };
  ISO8601Duration: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
  JWT: { input: any; output: any };
  LCCSubclass: { input: any; output: any };
  Latitude: { input: any; output: any };
  LocalDate: { input: any; output: any };
  LocalDateTime: { input: any; output: any };
  LocalEndTime: { input: any; output: any };
  LocalTime: { input: any; output: any };
  Locale: { input: any; output: any };
  Long: { input: any; output: any };
  Longitude: { input: any; output: any };
  MAC: { input: any; output: any };
  NegativeFloat: { input: any; output: any };
  NegativeInt: { input: any; output: any };
  NonEmptyString: { input: any; output: any };
  NonNegativeFloat: { input: any; output: any };
  NonNegativeInt: { input: any; output: any };
  NonPositiveFloat: { input: any; output: any };
  NonPositiveInt: { input: any; output: any };
  ObjectID: { input: any; output: any };
  PhoneNumber: { input: any; output: any };
  Port: { input: any; output: any };
  PositiveFloat: { input: any; output: any };
  PositiveInt: { input: any; output: any };
  PostalCode: { input: any; output: any };
  RGB: { input: any; output: any };
  RGBA: { input: any; output: any };
  RoutingNumber: { input: any; output: any };
  SESSN: { input: any; output: any };
  SafeInt: { input: any; output: any };
  SemVer: { input: any; output: any };
  Time: { input: any; output: any };
  TimeZone: { input: any; output: any };
  Timestamp: { input: any; output: any };
  URL: { input: any; output: any };
  USCurrency: { input: any; output: any };
  UUID: { input: any; output: any };
  UnsignedFloat: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  UtcOffset: { input: any; output: any };
  Void: { input: any; output: any };
};

export type IAuthenticatedUser = {
  __typename: "AuthenticatedUser";
  accessToken: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
};

export enum ICacheControlScope {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export type ICreateCategoryCustomInput = {
  categoryDefaultId: InputMaybe<Scalars["ObjectID"]["input"]>;
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  transactionGroupId: Scalars["ObjectID"]["input"];
  type: ITransactionCategoryTypeEnum;
};

export type ICreateCategoryDefaultInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  type: ITransactionCategoryTypeEnum;
};

export type ICreateTransactionGroupInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
};

export type ICreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type ICreditCard = {
  __typename: "CreditCard";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  transactionGroupId: Scalars["ObjectID"]["output"];
};

export type ICreditCardInput = {
  description: Scalars["String"]["input"];
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IIconProperties = {
  __typename: "IconProperties";
  background: Scalars["String"]["output"];
  color: Scalars["String"]["output"];
  icon: Scalars["String"]["output"];
};

export type IIconPropertiesInput = {
  background: Scalars["String"]["input"];
  color: Scalars["String"]["input"];
  icon: Scalars["String"]["input"];
};

export type IInstallments = {
  __typename: "Installments";
  current: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type IMutation = {
  __typename: "Mutation";
  createCategory: ITransactionCategory;
  createCreditCard: ICreditCard;
  createTransaction: Array<ITransaction>;
  createTransactionGroup: ITransactionGroup;
  createUser: Scalars["Boolean"]["output"];
  deleteCategory: Maybe<Scalars["Boolean"]["output"]>;
  deleteCreditCard: Maybe<Scalars["Boolean"]["output"]>;
  deleteTransaction: Scalars["Boolean"]["output"];
  deleteTransactionGroup: Scalars["Boolean"]["output"];
  forgotPassword: Scalars["Boolean"]["output"];
  loginWithCredentials: IAuthenticatedUser;
  now: Maybe<Scalars["BigInt"]["output"]>;
  resetPassword: Scalars["Boolean"]["output"];
  transactionStatus: Scalars["Boolean"]["output"];
  updateCategory: ITransactionCategory;
  updateCreditCard: ICreditCard;
  updateTransaction: Maybe<ITransaction>;
  updateTransactionGroup: ITransactionGroup;
};

export type IMutationCreateCategoryArgs = {
  input: ICreateCategoryCustomInput;
};

export type IMutationCreateCreditCardArgs = {
  input: ICreditCardInput;
};

export type IMutationCreateTransactionArgs = {
  input: ITransactionInput;
};

export type IMutationCreateTransactionGroupArgs = {
  input: ICreateTransactionGroupInput;
};

export type IMutationCreateUserArgs = {
  input: ICreateUserInput;
};

export type IMutationDeleteCategoryArgs = {
  _id: Scalars["ObjectID"]["input"];
  groupId: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteCreditCardArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteTransactionArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteTransactionGroupArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type IMutationLoginWithCredentialsArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type IMutationResetPasswordArgs = {
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type IMutationTransactionStatusArgs = {
  _id: Array<Scalars["ObjectID"]["input"]>;
  status: ITransactionStatus;
};

export type IMutationUpdateCategoryArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: IUpdateCustomInput;
};

export type IMutationUpdateCreditCardArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: ICreditCardInput;
};

export type IMutationUpdateTransactionArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: ITransactionInput;
};

export type IMutationUpdateTransactionGroupArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: IUpdateTransactionGroupInput;
};

export type IObjectKeyValue = {
  __typename: "ObjectKeyValue";
  key: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type IObjectKeyValueInput = {
  key: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type IPageInfo = {
  __typename: "PageInfo";
  cursor: Maybe<Scalars["Cursor"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type IQuery = {
  __typename: "Query";
  cardCategorySpending: Array<ITransactionsCardCategorySpending>;
  categoriesByGroupId: Array<ITransactionCategory>;
  categoryById: Maybe<ITransactionCategory>;
  creditCardByGroupId: Array<ICreditCard>;
  creditCardById: Maybe<ICreditCard>;
  monthlyRevenueVsExpenses: Array<ITransactionsChart>;
  monthlySpendingByCategory: Array<ITransactionsByCategoryChart>;
  now: Maybe<Scalars["BigInt"]["output"]>;
  transactionById: Maybe<ITransaction>;
  transactionGroupById: Maybe<ITransactionGroup>;
  transactionTotals: Maybe<ITransactionsTotals>;
  transactions: ITransactionDetailsPagination;
  transactionsGroup: Array<ITransactionGroup>;
  viewer: Maybe<IViewer>;
};

export type IQueryCardCategorySpendingArgs = {
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryCategoriesByGroupIdArgs = {
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IQueryCategoryByIdArgs = {
  categoryId: Scalars["ObjectID"]["input"];
};

export type IQueryCreditCardByGroupIdArgs = {
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IQueryCreditCardByIdArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IQueryMonthlyRevenueVsExpensesArgs = {
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryMonthlySpendingByCategoryArgs = {
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionByIdArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionGroupByIdArgs = {
  _id: InputMaybe<Scalars["ObjectID"]["input"]>;
};

export type IQueryTransactionTotalsArgs = {
  filterByCategoryId: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterByPeriod: Scalars["Date"]["input"];
  filterBySearch: InputMaybe<Scalars["String"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionsArgs = {
  cursor: InputMaybe<Scalars["Cursor"]["input"]>;
  filterByCategoryId: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterByPeriod: Scalars["Date"]["input"];
  filterBySearch: InputMaybe<Scalars["String"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type IQueryTransactionsGroupArgs = {
  search: InputMaybe<Scalars["String"]["input"]>;
};

export type ITransaction = {
  __typename: "Transaction";
  _id: Scalars["ObjectID"]["output"];
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  creditCard: Maybe<ICreditCard>;
  date: Scalars["Date"]["output"];
  description: Scalars["String"]["output"];
  installments: Maybe<IInstallments>;
  isRecurringPayment: Scalars["Boolean"]["output"];
  status: Maybe<ITransactionStatus>;
  transactionGroupId: Scalars["ObjectID"]["output"];
};

export type ITransactionCategory = {
  __typename: "TransactionCategory";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  iconProperties: IIconProperties;
  isDefault: Scalars["Boolean"]["output"];
  type: ITransactionCategoryTypeEnum;
};

export enum ITransactionCategoryTypeEnum {
  EARNINGS = "EARNINGS",
  EXPENSES = "EXPENSES",
}

export type ITransactionDetailsPagination = {
  __typename: "TransactionDetailsPagination";
  nodes: Array<ITransaction>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionGroup = {
  __typename: "TransactionGroup";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  iconProperties: IIconProperties;
  owner: IUser;
};

export type ITransactionGrouped = {
  __typename: "TransactionGrouped";
  groupBy: Scalars["ObjectID"]["output"];
  nodes: Array<ITransaction>;
};

export type ITransactionGroupedDetailsPagination = {
  __typename: "TransactionGroupedDetailsPagination";
  groups: Array<ITransactionGrouped>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionInput = {
  amount: Scalars["Float"]["input"];
  categoryId: Scalars["ObjectID"]["input"];
  creditCardId: InputMaybe<Scalars["ObjectID"]["input"]>;
  date: Scalars["Date"]["input"];
  description: Scalars["String"]["input"];
  installmentCount: InputMaybe<Scalars["Int"]["input"]>;
  isRecurringPayment: Scalars["Boolean"]["input"];
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export enum ITransactionStatus {
  PAID = "PAID",
  PENDING = "PENDING",
}

export type ITransactionsByCategoryChart = {
  __typename: "TransactionsByCategoryChart";
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  reportDate: Scalars["Date"]["output"];
  transactions: Maybe<Array<ITransaction>>;
};

export type ITransactionsCardCategorySpending = {
  __typename: "TransactionsCardCategorySpending";
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  creditCard: ICreditCard;
  reportDate: Scalars["Date"]["output"];
  transactions: Maybe<Array<ITransaction>>;
};

export type ITransactionsChart = {
  __typename: "TransactionsChart";
  expense: Scalars["Float"]["output"];
  reportDate: Scalars["Date"]["output"];
  revenue: Scalars["Float"]["output"];
  transactions: Array<ITransaction>;
};

export type ITransactionsGroupedByCategoryPagination = {
  __typename: "TransactionsGroupedByCategoryPagination";
  groupBy: Scalars["ObjectID"]["output"];
  nodes: Array<ITransaction>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionsTotalize = {
  __typename: "TransactionsTotalize";
  percentageVariation: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
};

export type ITransactionsTotals = {
  __typename: "TransactionsTotals";
  balance: ITransactionsTotalize;
  expense: ITransactionsTotalize;
  revenue: ITransactionsTotalize;
};

export type IUpdateCustomInput = {
  categoryDefaultId: InputMaybe<Scalars["ObjectID"]["input"]>;
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  transactionGroupId: Scalars["ObjectID"]["input"];
  type: ITransactionCategoryTypeEnum;
};

export type IUpdateTransactionGroupInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
};

export type IUser = {
  __typename: "User";
  _id: Scalars["ObjectID"]["output"];
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type IViewer = {
  __typename: "Viewer";
  _id: Scalars["ObjectID"]["output"];
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type ICreateCategoryMutationVariables = Exact<{
  input: ICreateCategoryCustomInput;
}>;

export type ICreateCategoryMutation = {
  __typename: "Mutation";
  createCategory: {
    __typename: "TransactionCategory";
    _id: any;
    description: string;
    type: ITransactionCategoryTypeEnum;
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  };
};

export type ICreateCreditCardMutationVariables = Exact<{
  input: ICreditCardInput;
}>;

export type ICreateCreditCardMutation = {
  __typename: "Mutation";
  createCreditCard: {
    __typename: "CreditCard";
    _id: any;
    transactionGroupId: any;
    description: string;
  };
};

export type ICreateTransactionGroupMutationVariables = Exact<{
  input: ICreateTransactionGroupInput;
}>;

export type ICreateTransactionGroupMutation = {
  __typename: "Mutation";
  createTransactionGroup: {
    __typename: "TransactionGroup";
    _id: any;
    description: string;
    owner: { __typename: "User"; name: string };
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  };
};

export type ICreateTransactionMutationVariables = Exact<{
  input: ITransactionInput;
}>;

export type ICreateTransactionMutation = {
  __typename: "Mutation";
  createTransaction: Array<{
    __typename: "Transaction";
    _id: any;
    transactionGroupId: any;
    date: any;
    description: string;
    amount: number;
    category: {
      __typename: "TransactionCategory";
      _id: any;
      description: string;
      type: ITransactionCategoryTypeEnum;
      isDefault: boolean;
      iconProperties: {
        __typename: "IconProperties";
        background: string;
        color: string;
        icon: string;
      };
    };
    installments: {
      __typename: "Installments";
      total: number;
      current: number;
    } | null;
    creditCard: {
      __typename: "CreditCard";
      _id: any;
      transactionGroupId: any;
      description: string;
    } | null;
  }>;
};

export type IDeleteCategoryMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
  groupId: Scalars["ObjectID"]["input"];
}>;

export type IDeleteCategoryMutation = {
  __typename: "Mutation";
  deleteCategory: boolean | null;
};

export type IDeleteCreditCardMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
}>;

export type IDeleteCreditCardMutation = {
  __typename: "Mutation";
  deleteCreditCard: boolean | null;
};

export type IDeleteTransactionGroupMutationVariables = Exact<{
  _id: Scalars["ObjectID"]["input"];
}>;

export type IDeleteTransactionGroupMutation = {
  __typename: "Mutation";
  deleteTransactionGroup: boolean;
};

export type IDeleteTransactionMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
}>;

export type IDeleteTransactionMutation = {
  __typename: "Mutation";
  deleteTransaction: boolean;
};

export type ITransactionStatusMutationVariables = Exact<{
  id: Array<Scalars["ObjectID"]["input"]> | Scalars["ObjectID"]["input"];
  status: ITransactionStatus;
}>;

export type ITransactionStatusMutation = {
  __typename: "Mutation";
  transactionStatus: boolean;
};

export type IUpdateCategoryMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
  input: IUpdateCustomInput;
}>;

export type IUpdateCategoryMutation = {
  __typename: "Mutation";
  updateCategory: {
    __typename: "TransactionCategory";
    _id: any;
    description: string;
    type: ITransactionCategoryTypeEnum;
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  };
};

export type IUpdateCreditCardMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
  input: ICreditCardInput;
}>;

export type IUpdateCreditCardMutation = {
  __typename: "Mutation";
  updateCreditCard: {
    __typename: "CreditCard";
    _id: any;
    transactionGroupId: any;
    description: string;
  };
};

export type IUpdateTransactionGroupMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
  updateTransactionGroup: IUpdateTransactionGroupInput;
}>;

export type IUpdateTransactionGroupMutation = {
  __typename: "Mutation";
  updateTransactionGroup: {
    __typename: "TransactionGroup";
    _id: any;
    description: string;
    owner: { __typename: "User"; name: string };
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  };
};

export type IUpdateTransactionMutationVariables = Exact<{
  id: Scalars["ObjectID"]["input"];
  input: ITransactionInput;
}>;

export type IUpdateTransactionMutation = {
  __typename: "Mutation";
  updateTransaction: {
    __typename: "Transaction";
    _id: any;
    transactionGroupId: any;
    date: any;
    description: string;
    amount: number;
    category: {
      __typename: "TransactionCategory";
      description: string;
      _id: any;
      type: ITransactionCategoryTypeEnum;
      isDefault: boolean;
      iconProperties: {
        __typename: "IconProperties";
        background: string;
        color: string;
        icon: string;
      };
    };
    installments: {
      __typename: "Installments";
      total: number;
      current: number;
    } | null;
    creditCard: {
      __typename: "CreditCard";
      _id: any;
      transactionGroupId: any;
      description: string;
    } | null;
  } | null;
};

export type ICreateUserMutationVariables = Exact<{
  createUserInput: ICreateUserInput;
}>;

export type ICreateUserMutation = {
  __typename: "Mutation";
  createUser: boolean;
};

export type IForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type IForgotPasswordMutation = {
  __typename: "Mutation";
  forgotPassword: boolean;
};

export type ILoginWithCredentialsMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type ILoginWithCredentialsMutation = {
  __typename: "Mutation";
  loginWithCredentials: {
    __typename: "AuthenticatedUser";
    accessToken: string;
    email: string;
  };
};

export type IResetPasswordMutationVariables = Exact<{
  token: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type IResetPasswordMutation = {
  __typename: "Mutation";
  resetPassword: boolean;
};

export type ICardCategorySpendingQueryVariables = Exact<{
  groupId: Scalars["ObjectID"]["input"];
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type ICardCategorySpendingQuery = {
  __typename: "Query";
  cardCategorySpending: Array<{
    __typename: "TransactionsCardCategorySpending";
    reportDate: any;
    amount: number;
    category: {
      __typename: "TransactionCategory";
      _id: any;
      description: string;
      type: ITransactionCategoryTypeEnum;
      isDefault: boolean;
    };
    transactions: Array<{
      __typename: "Transaction";
      _id: any;
      transactionGroupId: any;
      date: any;
      description: string;
      amount: number;
      category: {
        __typename: "TransactionCategory";
        _id: any;
        description: string;
        type: ITransactionCategoryTypeEnum;
        isDefault: boolean;
      };
    }> | null;
    creditCard: { __typename: "CreditCard"; _id: any; description: string };
  }>;
};

export type ICategoriesByGroupIdQueryVariables = Exact<{
  transactionGroupId: Scalars["ObjectID"]["input"];
}>;

export type ICategoriesByGroupIdQuery = {
  __typename: "Query";
  categoriesByGroupId: Array<{
    __typename: "TransactionCategory";
    _id: any;
    description: string;
    type: ITransactionCategoryTypeEnum;
    isDefault: boolean;
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  }>;
};

export type ICategoriesByIdQueryVariables = Exact<{
  categoryId: Scalars["ObjectID"]["input"];
}>;

export type ICategoriesByIdQuery = {
  __typename: "Query";
  categoryById: {
    __typename: "TransactionCategory";
    _id: any;
    description: string;
    type: ITransactionCategoryTypeEnum;
    isDefault: boolean;
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  } | null;
};

export type ICreditCardByGroupIdQueryVariables = Exact<{
  transactionGroupId: Scalars["ObjectID"]["input"];
}>;

export type ICreditCardByGroupIdQuery = {
  __typename: "Query";
  creditCardByGroupId: Array<{
    __typename: "CreditCard";
    _id: any;
    transactionGroupId: any;
    description: string;
  }>;
};

export type IMonthlyRevenueVsExpensesQueryVariables = Exact<{
  groupId: Scalars["ObjectID"]["input"];
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type IMonthlyRevenueVsExpensesQuery = {
  __typename: "Query";
  monthlyRevenueVsExpenses: Array<{
    __typename: "TransactionsChart";
    revenue: number;
    expense: number;
    reportDate: any;
    transactions: Array<{
      __typename: "Transaction";
      description: string;
      amount: number;
      _id: any;
      category: {
        __typename: "TransactionCategory";
        type: ITransactionCategoryTypeEnum;
        _id: any;
        description: string;
      };
    }>;
  }>;
};

export type IMonthlySpendingByCategoryQueryVariables = Exact<{
  groupId: Scalars["ObjectID"]["input"];
  filterByStartMonth: InputMaybe<Scalars["Date"]["input"]>;
  filterByEndMonth: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type IMonthlySpendingByCategoryQuery = {
  __typename: "Query";
  monthlySpendingByCategory: Array<{
    __typename: "TransactionsByCategoryChart";
    amount: number;
    reportDate: any;
    transactions: Array<{
      __typename: "Transaction";
      transactionGroupId: any;
      description: string;
      amount: number;
      _id: any;
    }> | null;
    category: {
      __typename: "TransactionCategory";
      _id: any;
      description: string;
    };
  }>;
};

export type ITransactionGroupByIdQueryVariables = Exact<{
  _id: InputMaybe<Scalars["ObjectID"]["input"]>;
}>;

export type ITransactionGroupByIdQuery = {
  __typename: "Query";
  transactionGroupById: {
    __typename: "TransactionGroup";
    _id: any;
    description: string;
    owner: { __typename: "User"; name: string; _id: any };
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  } | null;
};

export type ITransactionTotalsQueryVariables = Exact<{
  groupId: Scalars["ObjectID"]["input"];
  filterByPeriod: Scalars["Date"]["input"];
  filterByCategoryId: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterBySearch: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ITransactionTotalsQuery = {
  __typename: "Query";
  transactionTotals: {
    __typename: "TransactionsTotals";
    revenue: {
      __typename: "TransactionsTotalize";
      percentageVariation: number;
      total: number;
    };
    expense: {
      __typename: "TransactionsTotalize";
      percentageVariation: number;
      total: number;
    };
    balance: {
      __typename: "TransactionsTotalize";
      percentageVariation: number;
      total: number;
    };
  } | null;
};

export type ITransactionsByGroupIdQueryVariables = Exact<{
  groupId: Scalars["ObjectID"]["input"];
  filterByPeriod: Scalars["Date"]["input"];
  filterByCategoryId: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterBySearch: InputMaybe<Scalars["String"]["input"]>;
  cursor: InputMaybe<Scalars["Cursor"]["input"]>;
  limit: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type ITransactionsByGroupIdQuery = {
  __typename: "Query";
  transactions: {
    __typename: "TransactionDetailsPagination";
    totalCount: number;
    nodes: Array<{
      __typename: "Transaction";
      _id: any;
      transactionGroupId: any;
      status: ITransactionStatus | null;
      date: any;
      description: string;
      amount: number;
      isRecurringPayment: boolean;
      category: {
        __typename: "TransactionCategory";
        _id: any;
        description: string;
        type: ITransactionCategoryTypeEnum;
        isDefault: boolean;
        iconProperties: {
          __typename: "IconProperties";
          background: string;
          color: string;
          icon: string;
        };
      };
      installments: {
        __typename: "Installments";
        total: number;
        current: number;
      } | null;
      creditCard: {
        __typename: "CreditCard";
        _id: any;
        transactionGroupId: any;
        description: string;
      } | null;
    }>;
    pageInfo: {
      __typename: "PageInfo";
      cursor: any | null;
      hasNextPage: boolean;
      totalCount: number;
    };
  };
};

export type ITransactionsGroupQueryVariables = Exact<{
  search: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ITransactionsGroupQuery = {
  __typename: "Query";
  transactionsGroup: Array<{
    __typename: "TransactionGroup";
    _id: any;
    description: string;
    owner: { __typename: "User"; name: string; _id: any };
    iconProperties: {
      __typename: "IconProperties";
      background: string;
      color: string;
      icon: string;
    };
  }>;
};

export type IViewerQueryVariables = Exact<{ [key: string]: never }>;

export type IViewerQuery = {
  __typename: "Query";
  viewer: {
    __typename: "Viewer";
    _id: any;
    email: string;
    name: string;
  } | null;
};
