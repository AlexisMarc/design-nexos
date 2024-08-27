import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'nx-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent implements OnInit, ControlValueAccessor {
  @Output() onValue = new EventEmitter<any>();
  @Input() label: string = '';
  @Input() values: any = {
    OneValue: 'si',
    TwoValue: 'no',
  };
  private isDisabled: boolean = false;
  public value: any = '';

  constructor() {}

  ngOnInit(): void {
    this.writeValue(this.values.TwoValue);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    } else {
      this.value = this.values.TwoValue;
    }
    this.onValue.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  public setChecked() {
    if (this.isDisabled) return;
    this.value =
      this.value === this.values.TwoValue
        ? this.values.OneValue
        : this.values.TwoValue;
    this.onChange(this.value);
    this.onTouched();
    this.onValue.emit(this.value);
  }
}
