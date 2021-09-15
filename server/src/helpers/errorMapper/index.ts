import { FastifyError } from 'fastify';
import { ResponseError } from '../../types';
import CustomError from '../customError';
import {
  isValidationError,
  mapValidationError,
} from './validation';

const isCustomError = (error: FastifyError): error is CustomError => Number(error.statusCode) < 500;

const mapError = (err: FastifyError): ResponseError => {
  let responseError;
  if (isValidationError(err)) {
    responseError = mapValidationError(err);
  } else if (isCustomError(err)) {
    responseError = {
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details || [],
    };
  } else {
    responseError = {
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
      details: [],
    };
  }

  return responseError;
};

export default mapError;
