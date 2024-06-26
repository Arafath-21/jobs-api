// const { StatusCodes } = require('http-status-codes');
// const CustomAPIError = require('./custom-api');

import {StatusCodes} from 'http-status-codes'
import CustomAPIError from './custom-api.js';

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
