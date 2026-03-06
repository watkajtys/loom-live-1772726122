import { ZodIssue } from 'zod';

export class ValidationError extends Error {
  public status: number;
  public errors: ZodIssue[];

  constructor(message: string, errors: ZodIssue[]) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
    this.errors = errors;
  }
}
