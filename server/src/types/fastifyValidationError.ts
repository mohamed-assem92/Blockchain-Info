import { FastifyError, ValidationResult } from 'fastify';

export interface FastifyValidationError extends FastifyError {
    validation: ValidationResult[]
}
