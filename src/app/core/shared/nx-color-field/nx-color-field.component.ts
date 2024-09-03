import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NxFileFieldComponent } from '@shared';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'nx-color-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nx-color-field.component.html',
  styleUrl: './nx-color-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxColorFieldComponent),
      multi: true,
    },
  ],
})
export class NxColorFieldComponent implements OnInit, ControlValueAccessor {
  public id = uuidv4();
  public idColor = uuidv4();
  hexColor: string = '#FF7300';

  public isDisabled: boolean = false;
  public value: string | undefined | null;
  private onChange: (value: string | undefined | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: string | undefined | null): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: string | undefined | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
  }

  ngOnInit(): void {}

  onHexColorChange(value: string): void {
    if (this.isDisabled) return;
    this.onChange(value);
  }
}
