import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RelationType {
  SPOUSE = 'SPOUSE',
  CHILD = 'CHILD',
  PARENT = 'PARENT',
}

registerEnumType(RelationType, {
  name: 'RelationType',
});

@ObjectType()
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
}
