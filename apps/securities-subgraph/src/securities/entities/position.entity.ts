import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A position held within a financial security.' })
@Directive('@key(fields: "id")')
export class Position {
  /**
   * The unique identifier of the position.
   */
  @Field((_type) => ID)
  id: string;
}
