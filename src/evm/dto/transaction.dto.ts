import { ApiProperty } from '@nestjs/swagger';

export class EvmTransactionDto {
  @ApiProperty({ description: 'Transaction hash' })
  hash: string;

  @ApiProperty({ description: 'Recipient address' })
  to: string;

  @ApiProperty({ description: 'Sender address' })
  from: string;

  @ApiProperty({ description: 'Value transferred in wei' })
  value: string;

  @ApiProperty({ description: 'Input data' })
  input: string;

  @ApiProperty({ description: 'Maximum fee per gas' })
  maxFeePerGas: string;

  @ApiProperty({ description: 'Maximum priority fee per gas' })
  maxPriorityFeePerGas: string;

  @ApiProperty({ description: 'Gas price' })
  gasPrice: string;
}
