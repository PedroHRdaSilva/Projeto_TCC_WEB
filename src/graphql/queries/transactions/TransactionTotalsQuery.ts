import gql from "graphql-tag";

export default gql`
  query TransactionTotals(
    $groupId: ObjectID!
    $filterByPeriod: Date!
    $filterByCategoryId: ObjectID
    $filterBySearch: String
  ) {
    transactionTotals(
      groupId: $groupId
      filterByPeriod: $filterByPeriod
      filterByCategoryId: $filterByCategoryId
      filterBySearch: $filterBySearch
    ) {
      revenue {
        percentageVariation
        total
      }
      expense {
        percentageVariation
        total
      }
      balance {
        percentageVariation
        total
      }
    }
  }
`;
