import {
  Directive,
  Field,
  Float,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Client } from '../../shared/client.entity';

export enum AccountType {
  BROKERAGE = 'BROKERAGE',
  RETIREMENT = 'RETIREMENT',
  CASH = 'CASH',
}

registerEnumType(AccountType, {
  name: 'AccountType',
});

@ObjectType({ description: 'An account belonging to a client.' })
@Directive('@key(fields: "id")')
export class Account {
  /**
   * The unique identifier of the account.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The account number.
   */
  number: string;

  /**
   * The type of the account.
   */
  type: AccountType;

  /**
   * The assets under management for the account.
   */
  @Field(() => Float)
  aum: number;

  /**
   * The ID of the client who owns the account.
   */
  @HideField()
  clientId: string;

  /**
   * The client who owns the account.
   */
  client: Client;
}
