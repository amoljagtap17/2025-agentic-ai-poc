import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Position } from './position.entity';

@ObjectType({ description: 'A financial security, such as a stock or bond.' })
@Directive('@key(fields: "id")')
export class Security {
  /**
   * The unique identifier of the security.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * positions associated with the security.
   */
  positions: Position[];
}
