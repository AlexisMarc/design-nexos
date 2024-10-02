import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  input,
  viewChild,
  type OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileType } from '@models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'nx-file-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-file-field.component.html',
  styleUrl: './nx-file-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxFileFieldComponent),
      multi: true,
    },
  ],
})
export class NxFileFieldComponent implements OnInit, ControlValueAccessor {
  private inputFile =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  public id = uuidv4();
  private _allowedFileTypes: FileType[] = ['text/csv'];
  public title = input<string>('Cargar archivo');
  public message = input<string>('El archivo no puede superar los');
  public size = input<`${number}${'MB' | 'KB' | 'GB'}`>('4MB');
  @Input()
  get allowedFileTypes(): string {
    if (Array.isArray(this._allowedFileTypes)) {
      return this._allowedFileTypes.join(',');
    } else {
      return this._allowedFileTypes;
    }
  }

  set allowedFileTypes(types: FileType[] | FileType) {
    if (typeof types === 'string') {
      this._allowedFileTypes = [types];
    } else {
      this._allowedFileTypes = types;
    }
  }

  public isDisabled: boolean = false;
  public value: string | string[] | undefined | null;
  private onChange: (value: string | string[] | undefined | null) => void =
    () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: string | string[] | undefined | null): void {
    this.value = obj;
  }

  registerOnChange(
    fn: (value: string | string[] | undefined | null) => void
  ): void {
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

  async changeValue() {
    if (this.isDisabled) return;
    const input = this.inputFile().nativeElement;
    const files: FileList | null = input.files;
    let values: string | string[] | null | undefined;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const base64 = await this.convertFileToBase64(file);
      if (!base64) continue;
      if (!values) {
        values = base64;
      } else if (Array.isArray(values)) {
        values = [...values, base64];
      } else if (typeof values === 'string') {
        values = [values, base64];
      }
    }
    this.value = values;
    this.onChange(values);
    this.onTouched();
  }

  resetValue() {
    this.value = undefined;
    this.inputFile().nativeElement.value = '';
    this.onChange(undefined);
    this.onTouched();
  }

  private convertFileToBase64(file: File) {
    return new Promise<string | null | undefined>((resolver) => {
      const reader = new FileReader();
      let value: string | null | undefined = undefined;
      reader.onload = () => {
        const base64 = reader.result;
        if (typeof base64 === 'string') {
          value = base64;
          resolver(value);
        }
      };

      reader.onerror = (error) => {
        console.error(error);
        resolver(value);
      };

      reader.readAsDataURL(file);
    });
  }
}
