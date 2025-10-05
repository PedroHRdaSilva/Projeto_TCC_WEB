import gql from "graphql-tag";

export default gql`
  query CardCategorySpending(
    $groupId: ObjectID!
    $filterByStartMonth: Date
    $filterByEndMonth: Date
  ) {
    cardCategorySpending(
      groupId: $groupId
      filterByStartMonth: $filterByStartMonth
      filterByEndMonth: $filterByEndMonth
    ) {
      reportDate
      amount
      category {
        _id
        description
        type
        isDefault
      }
      transactions {
        _id
        transactionGroupId
        category {
          _id
          description
          type
          isDefault
        }
        date
        description
        amount
      }
      creditCard {
        _id
        description
      }
    }
  }
`;
