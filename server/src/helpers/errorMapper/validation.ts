import { ValidationResult } from 'fastify';
import { ResponseError, FastifyValidationError } from '../../types';
import getArrayLastElement from '../utils';

export const isValidationError = (error: Error): error is FastifyValidationError => Boolean(
  (error as FastifyValidationError).validation,
);

const getFieldName = (f: ValidationResult) => (f.keyword === 'required' ? f.params.missingProperty as string : getArrayLastElement(f.dataPath.split('.')));

export const mapValidationError = (err: FastifyValidationError): ResponseError => ({
  statusCode: 422,
  code: 'VALIDATION_ERROR',
  message: err.message,
  details: err.validation.map((f) => ({
    field: getFieldName(f),
    message: f.message,
    error: f.keyword,
    dataPath: f.dataPath.slice(1),
    params: f.params,
  })),
});
