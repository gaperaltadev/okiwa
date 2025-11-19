import { DomainError } from "./Domain.error";

export class ValidationError extends DomainError {
  constructor(message = "Validation error") {
    super(message);
    this.name = "ValidationError";
  }
}
