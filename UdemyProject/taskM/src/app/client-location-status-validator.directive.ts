import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]'
})
export class ClientLocationStatusValidatorDirective implements Validator {
  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let isValid = true;
    if (control.value.ClientLocation == 6 && control.value.Status == "Support") {
      isValid = false; //indicates invalid
    }

    if (isValid == true) {
      return null; //valid
    }
    else {
      return { clientLocationStatus: { valid: false } }; //invalid
    }
  }

}
