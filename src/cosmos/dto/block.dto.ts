import { ApiProperty } from '@nestjs/swagger';

export class CosmosBlockDto {
  @ApiProperty({ description: 'Block height' })
  height: number;

  @ApiProperty({ description: 'Block time' })
  time: string;

  @ApiProperty({ description: 'Block hash' })
  hash: string;

  @ApiProperty({ description: 'Address of the block proposer' })
  proposedAddress: string;
}
