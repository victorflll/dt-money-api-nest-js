export enum TransactionType {
  entry,
  outcome,
  total,
}

export const transactionTypes: { [key in TransactionType]: string } = {
  [TransactionType.entry]: 'Entrada',
  [TransactionType.outcome]: 'Saída',
  [TransactionType.total]: 'Total',
};
