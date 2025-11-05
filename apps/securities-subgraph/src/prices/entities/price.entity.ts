import { Directive, Field, Float, ObjectType } from '@nestjs/graphql';
import { Security } from '../../securities/entities/security.entity';

@ObjectType({ description: 'A price entry for a financial security.' })
@Directive('@key(fields: "securityId asOf")')
export class Price {
  /**
   * The date and time the price is valid for.
   */
  @Field(() => Date)
  asOf: Date;

  /**
   * The price value of the security.
   */
  @Field(() => Float)
  value: number;

  /**
   * The currency of the price value.
   */
  currency: string;

  /**
   * The ID of the security this price is for.
   */
  securityId: string;

  /**
   * The security this price is for.
   */
  security: Security;
}
