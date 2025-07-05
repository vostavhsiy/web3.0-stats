import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { CosmosBlockDto } from './dto/block.dto';
import { CosmosTransactionDto } from './dto/transaction.dto';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('block/:height')
  async getBlock(
    @Param('height', ParseIntPipe) height: number,
  ): Promise<CosmosBlockDto> {
    return this.cosmosService.getBlockByHeight(height);
  }

  @Get('transactions/:hash')
  async getTransaction(
    @Param('hash') hash: string,
  ): Promise<CosmosTransactionDto> {
    return this.cosmosService.getTransactionByHash(hash);
  }
}
