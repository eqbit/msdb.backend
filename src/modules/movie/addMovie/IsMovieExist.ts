import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Movie } from '../../../entity';

@ValidatorConstraint({ async: true })
class uniqueMovie implements ValidatorConstraintInterface {
  validate(name: string) {
    return Movie.findOne({ where: { name } }).then((movie) => !movie);
  }
}

export function IsMovieAlreadyExist(options?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: uniqueMovie
    });
  };
}
