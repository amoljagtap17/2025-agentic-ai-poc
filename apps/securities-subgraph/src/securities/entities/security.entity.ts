import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Price } from '../../prices/entities/price.entity';
import { Position } from './position.entity';

export enum AssetClass {
  EQUITY = 'EQUITY',
  BOND = 'BOND',
  ETF = 'ETF',
  MUTUAL_FUND = 'MUTUAL_FUND',
  CASH = 'CASH',
  OTHER = 'OTHER',
}

registerEnumType(AssetClass, {
  name: 'AssetClass',
});

@ObjectType({ description: 'A financial security, such as a stock or bond.' })
@Directive('@key(fields: "id")')
export class Security {
  /**
   * The unique identifier of the security.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The ticker symbol of the security.
   */
  ticker: string;

  /**
   * The International Securities Identification Number (ISIN) of the security.
   */
  isin: string;

  /**
   * The Committee on Uniform Securities Identification Procedures (CUSIP) of the security.
   */
  cusip: string;

  /**
   * The name of the security.
   */
  name: string;

  /**
   * The asset class of the security.
   */
  assetClass: AssetClass;

  /**
   * The price entries for the security.
   */
  prices: Price[];

  /**
   * The positions held in the security.
   */
  positions: Position[];
}
