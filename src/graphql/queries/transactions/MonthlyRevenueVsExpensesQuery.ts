import gql from "graphql-tag";

export default gql`
  query MonthlyRevenueVsExpenses(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    monthlyRevenueVsExpenses(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      transactions {
        description
        category {
          type
          _id
          description
        }
        amount
        _id
      }
      revenue
      expense
      reportDate
    }
  }
`;
