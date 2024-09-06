import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'nx-toggle-switch',
  templateUrl: './nx-toggle-switch.component.html',
  styleUrls: ['./nx-toggle-switch.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class NxToggleSwitchComponent<T = boolean>
  implements OnInit, ControlValueAccessor
{
  public id = uuidv4();
  public onValue = output<T>();
  public viewValues = input<boolean>();
  label = input<string>();
  values = input.required<{
    OneValue: T;
    TwoValue: T;
  }>();
  public checked: boolean = false;
  public isDisabled: boolean = false;
  public value!: T;

  ngOnInit(): void {
    this.writeValue(this.values().TwoValue);
  }

  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: T): void {
    if (obj) {
      this.value = obj;
    } else {
      this.value = this.values().TwoValue;
    }
    this.checked = this.value === this.values().OneValue;
    this.onValue.emit(this.value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  onBlur(): void {
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public setChecked() {
    if (this.isDisabled) return;
    this.value =
      this.value === this.values().TwoValue
        ? this.values().OneValue
        : this.values().TwoValue;
    this.onChange(this.value);
    console.log(this.value)
    this.onTouched();
    this.onValue.emit(this.value);
  }
}
