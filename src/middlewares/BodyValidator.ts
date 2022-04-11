import {
  validate,
  ValidationError,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";

/**
 * Validate interface of req.body
 * @param type - expected interface
 * @param skipMissingProperties - should ignore missing properties from interface
 */
const bodyValidator = (
  type: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  skipMissingProperties = false,
): IRequestHandler => (
  req,
  res,
  next,
) => validate(
  plainToInstance(
    type, req.body,
  ), { skipMissingProperties },
)
  .then((errors: ValidationError[]) => {
    if (errors.length > 0) {
<<<<<<< HEAD
      const message = errors.map((error: ValidationError) =>
        Object.values(error.constraints)).join(", ");
=======
      const message = errors.map((error: ValidationError) => Object.values(error.constraints))
        .join(", ");
>>>>>>> 6f4ef28e4d7be5d9499e05d6b3fb5700aecb8404

      next(new HttpException(
        400, message,
      ));
    } else {
      next();
    }
  });

export default bodyValidator;
