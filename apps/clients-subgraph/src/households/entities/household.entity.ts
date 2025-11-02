import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Advisor } from '../../advisors/entities/advisor.entity';
import { Client } from '../../clients/entities/client.entity';

@ObjectType()
export class Household {
  /**
   * The unique identifier of the household.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The name of the household.
   */
  name: string;

  /**
   * The ID of the advisor associated with the household.
   */
  @HideField()
  advisorId: string;

  /**
   * The advisor associated with the household.
   */
  @Field((_type) => Advisor)
  advisor: Advisor;

  /**
   * The members of the household.
   */
  @Field((_type) => [Client])
  members: Client[];
}
