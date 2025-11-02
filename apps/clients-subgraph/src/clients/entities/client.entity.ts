import {
  Directive,
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Household } from '../../households/entities/household.entity';

export enum RelationType {
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  PARENT = 'PARENT',
}

registerEnumType(RelationType, {
  name: 'RelationType',
});

@ObjectType({ description: 'A client who is a member of a household.' })
@Directive('@key(fields: "id")')
export class Client {
  /**
   * The unique identifier of the client.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The first name of the client.
   */
  firstName: string;

  /**
   * The last name of the client.
   */
  lastName: string;

  /**
   * The email address of the client.
   */
  email: string | null;

  /**
   * The phone number of the client.
   */
  phone: string | null;

  /**
   * The relation type of the client.
   */
  relationType: RelationType | null;

  /**
   * The ID of the household associated with the client.
   */
  @HideField()
  householdId: string;

  /**
   * The household associated with the client.
   */
  household: Household;
}
