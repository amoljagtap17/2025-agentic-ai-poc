import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  firstName: string;

  lastName: string;

  email?: string;

  phone?: string;
}
