import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from '../enums/transaction-category';

export class UpdateTransactionDTO {
  @ApiProperty({ example: 'Atualização do desenvolvimento de site' })
  title: string;
  @ApiProperty({ example: -1200 })
  price: number;
  @ApiProperty({ example: TransactionCategory.sale })
  category: TransactionCategory;
}
