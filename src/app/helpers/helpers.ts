import { FormArray, FormGroup, FormControl, AbstractControl } from "@angular/forms";

export class Helpers {


    static patchValue(formGroup: FormGroup, formValue: any = {}): void {
        for (const c in formGroup.controls) {
          if (formGroup.controls[c] instanceof FormArray) {
            const formArray = formGroup.controls[c] as FormArray;
            this.patchArrayValue(formArray, formValue[c]);
          } else if (formGroup.controls[c] instanceof FormGroup) {
            this.patchValue(formGroup.controls[c] as FormGroup, formValue[c]);
          } else {
            formGroup.controls[c].patchValue(formValue[c]);
          }
        }
      }
      
    static patchArrayValue(formArray: FormArray, formValues: any = []): void {
        const formArrayControl = formArray.at(0);
        for (const formValue of formValues) {
          if (formArrayControl instanceof FormGroup) {
            const newGroup = this.cloneFormControl(formArrayControl) as FormGroup;
            this.patchValue(newGroup, formValue);
            formArray.push(newGroup);
          } else {
            formArray.push(new FormControl(formValue, formArrayControl.validator));
          }
        }
        if (formValues.length) {
          formArray.removeAt(0);
        }
      }
    
      static cloneFormControl(control: AbstractControl) {
        if (control instanceof FormControl) {
          return new FormControl(control.value, control.validator, control.asyncValidator);
        } else if (control instanceof FormGroup) {
          const copy = new FormGroup({}, control.validator, control.asyncValidator);
          Object.keys(control.getRawValue()).forEach(key => {
            copy.addControl(key, this.cloneFormControl(control.controls[key]));
          });
          return copy;
        } else if (control instanceof FormArray) {
          const copy = new FormArray([], control.validator, control.asyncValidator);
          control.controls.forEach(c => {
            copy.push(this.cloneFormControl(c));
          });
          return copy;
        }
      }
}