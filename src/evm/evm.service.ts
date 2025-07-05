import { EvmTransactionDto } from './dto/transaction.dto';
import { EvmBlockDto } from './dto/block.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class EvmService {
  private readonly rpcUrl = 'https://sei-evm-rpc.publicnode.com';

  async getBlockByHeight(height: number): Promise<EvmBlockDto> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [`0x${height.toString(16)}`, false],
        id: 1,
      });

      const block = response?.data?.result;
      if (!block) {
        throw new Error('Block not found');
      }

      return {
        height: parseInt(block.number, 16),
        hash: block.hash,
        parentHash: block.parentHash,
        gasLimit: block.gasLimit,
        gasUsed: block.gasUsed,
        size: block.size,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException('Block not found');
        } else {
          throw new BadRequestException(
            'Get Block Error: ' +
              (error.response?.data || error?.message || 'Unknown error'),
          );
        }
      }
      throw new NotFoundException('Get Block Error');
    }
  }

  async getTransactionByHash(hash: string): Promise<EvmTransactionDto> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [hash],
        id: 1,
      });
      const tx = response?.data?.result;
      if (!tx) {
        throw new Error('Transaction not found');
      }

      return {
        hash: tx.hash,
        to: tx.to,
        from: tx.from,
        value: tx.value,
        input: tx.input,
        maxFeePerGas: tx.maxFeePerGas,
        maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
        gasPrice: tx.gasPrice,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException('Transaction not found');
        } else {
          throw new BadRequestException(
            'Get Transaction Error: ' +
              (error.response?.data || error?.message || 'Unknown error'),
          );
        }
      }
      throw new NotFoundException('Get Transaction Error');
    }
  }
}
