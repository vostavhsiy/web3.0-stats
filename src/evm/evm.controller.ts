import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EvmService } from './evm.service';
import { EvmBlockDto } from './dto/block.dto';
import { EvmTransactionDto } from './dto/transaction.dto';

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get('block/:height')
  async getBlock(
    @Param('height', ParseIntPipe) height: number,
  ): Promise<EvmBlockDto> {
    return this.evmService.getBlockByHeight(height);
  }

  @Get('transactions/:hash')
  async getTransaction(
    @Param('hash') hash: string,
  ): Promise<EvmTransactionDto> {
    return this.evmService.getTransactionByHash(hash);
  }
}
