import gql from "graphql-tag";

export default gql`
  query MonthlySpendingByCategory(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    monthlySpendingByCategory(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      transactions {
        transactionGroupId
        description
        amount
        _id
      }
      amount
      reportDate
      category {
        _id
        description
      }
    }
  }
`;
