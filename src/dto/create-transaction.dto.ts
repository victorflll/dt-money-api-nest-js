import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from '../enums/transaction-category';

export class CreateTransactionDTO {
  @ApiProperty({ example: 'Desenvolvimento de site' })
  title: string;
  @ApiProperty({ example: 12000 })
  price: number;
  @ApiProperty({ example: TransactionCategory.sale })
  category: TransactionCategory;
}
