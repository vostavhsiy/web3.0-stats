import { ApiProperty } from '@nestjs/swagger';

export class EvmBlockDto {
  @ApiProperty({ description: 'Block number' })
  height: number;

  @ApiProperty({ description: 'Block hash' })
  hash: string;

  @ApiProperty({ description: 'Parent block hash' })
  parentHash: string;

  @ApiProperty({ description: 'Gas limit for the block' })
  gasLimit: string;

  @ApiProperty({ description: 'Gas used in the block' })
  gasUsed: string;

  @ApiProperty({ description: 'Block size in bytes' })
  size: string;
}
