import {
  Component,
  OnInit,
  Input,
  Output,
  forwardRef
} from '@angular/core';

import {
  Validator,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: OopsDatepickerComponent,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OopsDatepickerComponent,
      multi: true
    }],
  selector: 'oops-datepicker',
  templateUrl: './oops-datepicker.component.html',
  styleUrls: ['./oops-datepicker.component.scss']
})
export class OopsDatepickerComponent implements OnInit, ControlValueAccessor {
  public datepickerControl: FormControl; 

  @Input() placeholder?: string;

  constructor() { }

  ngOnInit() {
    this.datepickerControl = new FormControl();
  }

  writeValue(obj: any): void {
    this.datepickerControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.datepickerControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl) {
    return null;
  }

//  setDisabledState?(isDisabled: boolean): void {
//  }

  private selected(event) {
    console.log(event)
    this.datepickerControl.setValue(event);
  }

  private clear(input: HTMLInputElement) {
    this.datepickerControl.setValue('');
  }

}
