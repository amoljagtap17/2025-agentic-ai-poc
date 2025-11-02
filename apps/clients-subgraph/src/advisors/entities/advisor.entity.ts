import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Household } from '../../households/entities/household.entity';

@ObjectType({ description: 'An advisor who manages households and clients.' })
@Directive('@key(fields: "id")')
export class Advisor {
  /**
   * The unique identifier of the advisor.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The name of the advisor.
   */
  name: string;

  /**
   * The email address of the advisor.
   */
  email: string;

  /**
   * The households associated with the advisor.
   */
  households: Household[];
}
