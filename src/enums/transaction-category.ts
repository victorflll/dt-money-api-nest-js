export enum TransactionCategory {
  sale,
  food,
  home,
  work,
}

export const transactionCategories: { [key in TransactionCategory]: string } = {
  [TransactionCategory.sale]: 'Venda',
  [TransactionCategory.food]: 'Alimentação',
  [TransactionCategory.home]: 'Casa',
  [TransactionCategory.work]: 'Trabalho',
};
