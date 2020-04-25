import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entity';

@ValidatorConstraint({ async: true })
class error implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => !user);
  }
}

export function IsEmailAlreadyExist(options?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: error
    });
  };
}
