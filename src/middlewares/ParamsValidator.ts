import {
  validate,
  ValidationError,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";
import Log from "../utils/Log";

/**
 * Validate interface of req.params
 * @param type - expected interface
 * @param skipMissingProperties - should ignore missing properties from interface
 */
const paramsValidator = (
  type: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  skipMissingProperties = false,
): IRequestHandler => (
  req,
  res,
  next,
) => validate(
  plainToInstance(
    type, req.params,
  ), { skipMissingProperties },
)
  .then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints))
        .join(", ");

      Log.error(message);
      next(new HttpException(
        400, message,
      ));
    } else {
      next();
    }
  });

export default paramsValidator;
