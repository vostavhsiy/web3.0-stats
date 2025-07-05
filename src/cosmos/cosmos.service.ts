import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CosmosBlockDto } from './dto/block.dto';
import { CosmosTransactionDto } from './dto/transaction.dto';

@Injectable()
export class CosmosService {
  private readonly rpcUrl = 'https://sei-m.rpc.n0ok.net';

  async getBlockByHeight(height: number): Promise<CosmosBlockDto> {
    try {
      const response = await axios.get(`${this.rpcUrl}/block?height=${height}`);

      const block = response?.data?.block;
      if (!block) {
        throw new Error('Block not found');
      }

      return {
        height: parseInt(block.header.height),
        time: block.header.time,
        hash: response.data.block_id.hash,
        proposedAddress: block.header.proposer_address,
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

  async getTransactionByHash(hash: string): Promise<CosmosTransactionDto> {
    try {
      const response = await axios.get(`${this.rpcUrl}/tx?hash=${hash}`);

      const tx = response?.data;
      if (!tx || tx.code < 0) {
        throw new Error('Transaction not found');
      }
      return {
        hash: tx.hash,
        height: parseInt(tx.height),
        time: tx.timestamp,
        gasUsed: tx?.tx_result?.gas_used,
        gasWanted: tx?.tx_result?.gas_wanted,
        fee: tx?.tx_result?.fee || '0',
        sender: tx?.tx_result?.evm_tx_info?.senderAddress || null,
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
