import gql from "graphql-tag";

export default gql`
  query TransactionsByGroupId(
    $groupId: ObjectID!
    $filterByPeriod: Date!
    $filterByCategoryId: ObjectID
    $filterBySearch: String
    $cursor: Cursor
    $limit: Int
  ) {
    transactions(
      groupId: $groupId
      filterByPeriod: $filterByPeriod
      filterByCategoryId: $filterByCategoryId
      filterBySearch: $filterBySearch
      cursor: $cursor
      limit: $limit
    )
      @connection(
        key: "transactions"
        filter: [
          "groupId"
          "filterByPeriod"
          "filterByCategoryId"
          "filterBySearch"
        ]
      ) {
      nodes {
        _id
        transactionGroupId
        category {
          _id
          description
          iconProperties {
            background
            color
            icon
          }
          type
          isDefault
        }
        status
        date
        description
        amount
        installments {
          total
          current
        }
        isRecurringPayment
        creditCard {
          _id
          transactionGroupId
          description
        }
      }
      pageInfo {
        cursor
        hasNextPage
        totalCount
      }
      totalCount
    }
  }
`;
