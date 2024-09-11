import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { VALIDATOR_MESSAGE_DEFAULT } from '@constants';

export const getFormControlError = (formControl: AbstractControl): string => {
  if (!formControl.errors) return '';

  const firstErrorKey = Object.keys(formControl.errors!)[0];

  if (formControl.errors[firstErrorKey] === true) {
    return VALIDATOR_MESSAGE_DEFAULT[firstErrorKey];
  }

  return formControl.errors![firstErrorKey] || '';
};

export class NxValidators {
  static required(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.required(control);
      return error ? { required: this._getMessage('required', message) } : null;
    };
  }
  static email(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailError = Validators.email(control);
      const patternError =
        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);

      if (emailError) {
        return { email: this._getMessage('email', message) };
      }

      if (patternError) {
        return { email: this._getMessage('email', message) };
      }

      return null;
    };
  }
  static min(min: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minFunction = Validators.min(min);
      const error = minFunction(control);

      return error
        ? {
            min: this._getMessage('min', message, [
              {
                min: min,
                current: control?.value || 0,
              },
            ]),
          }
        : null;
    };
  }
  static max(max: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const maxFunction = Validators.max(max);
      const error = maxFunction(control);

      return error
        ? {
            max: this._getMessage('max', message, [
              { max: max, current: control?.value || 0 },
            ]),
          }
        : null;
    };
  }
  static minLength(minLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minLengthFunction = Validators.minLength(minLength);
      const error = minLengthFunction(control);

      return error
        ? {
            minLength: this._getMessage('minLength', message, [
              {
                minLength: minLength,
                current: (control?.value || '0').length,
              },
            ]),
          }
        : null;
    };
  }
  static maxLength(maxLength: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const maxLengthFunction = Validators.maxLength(maxLength);
      const error = maxLengthFunction(control);

      return error
        ? {
            maxLength: this._getMessage('maxLength', message, [
              {
                maxLength: maxLength,
                current: (control?.value || '0').length,
              },
            ]),
          }
        : null;
    };
  }

  public static dateRange(
    startDateField: string,
    endDateField: string,
    message?: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control.parent as FormGroup;
      if (!group) return null;

      const startDate = group.get(startDateField)?.value;
      const endDate = group.get(endDateField)?.value;

      if (!startDate || !endDate) return null;

      return new Date(startDate).getTime() > new Date(endDate).getTime()
        ? {
            dateRange: this._getMessage('dateRange', message, [
              {
                dateRange: endDate,
                current: control?.value || '',
              },
            ]),
          }
        : null;
    };
  }

  static pattern(pattern: string | RegExp, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const patternFunction = Validators.pattern(pattern);
      const error = patternFunction(control);
      return error ? { pattern: this._getMessage('pattern', message) } : null;
    };
  }

  private static _getMessage(
    control: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
    message?: string,
    paramsMessage?: { [key: string]: unknown }[]
  ) {
    if (message) return message;

    let messageControl = VALIDATOR_MESSAGE_DEFAULT[control];
    const existParams = paramsMessage && paramsMessage.length > 0;

    if (existParams) {
      paramsMessage.forEach((params) => {
        Object.keys(params)
          .filter((key) => params[key])
          .forEach((key) => {
            messageControl = messageControl.replace(
              `\${${key}}`,
              params[key]!.toString()
            );
          });
      });

      return messageControl;
    }

    return messageControl;
  }
}
