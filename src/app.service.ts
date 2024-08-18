import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { TransactionType, transactionTypes } from './enums/transaction-type';
import { transactionCategories } from './enums/transaction-category';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(data: CreateTransactionDTO) {
    const createdTransaction = await this.prismaService.transaction.create({
      data: {
        title: data.title,
        price: data.price,
        category: transactionCategories[data.category],
        type:
          data.price >= 0
            ? transactionTypes[TransactionType.entry]
            : transactionTypes[TransactionType.outcome],
        updatedAt: new Date().toISOString(),
      },
    });

    return createdTransaction;
  }

  async getTransaction() {
    const transactions = await this.prismaService.transaction.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return transactions;
  }

  async getTransactionById(id: string) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async updateTransaction(id: string, data: UpdateTransactionDTO) {
    const updatedTransaction = await this.prismaService.transaction.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        price: data.price,
        category: transactionCategories[data.category],
        type:
          data.price >= 0
            ? transactionTypes[TransactionType.entry]
            : transactionTypes[TransactionType.outcome],
        updatedAt: new Date().toISOString(),
      },
    });

    return updatedTransaction;
  }

  async deleteTransaction(id: string) {
    const transaction = await this.getTransactionById(id);

    const deletedTransaction = await this.prismaService.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    return deletedTransaction;
  }

  async getDashboard() {
    const transactions = await this.getTransaction();

    const entries = transactions.reduce((group, item) => {
      if (item.type === transactionTypes[TransactionType.entry]) {
        group += item.price;
      }
      return group;
    }, 0);

    const outcomes = transactions.reduce((group, item) => {
      if (item.type === transactionTypes[TransactionType.outcome]) {
        group -= item.price;
      }
      return group;
    }, 0);

    const total = entries - outcomes;

    const dashboard = {
      [TransactionType[TransactionType.entry]]: entries,
      [TransactionType[TransactionType.outcome]]: outcomes,
      [TransactionType[TransactionType.total]]: total,
    };

    return dashboard;
  }
}
