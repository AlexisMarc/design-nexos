import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { basicValue } from '@models';
import { NxFileFieldComponent } from '@shared';
import { debounceTime, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'nx-dropdown-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nx-dropdown-field.component.html',
  styleUrl: './nx-dropdown-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxDropdownFieldComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('{{showTransitionParams}}'),
      ]),
      transition(':leave', [
        animate('{{hideTransitionParams}}', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NxDropdownFieldComponent implements OnInit, OnChanges {
  private _render = inject(Renderer2);
  private _cd = inject(ChangeDetectorRef);

  private inputSubject: Subject<string> = new Subject<string>();
  valueFilter: string = '';

  constructor() {
    this.inputSubject.pipe(debounceTime(300)).subscribe(() => {
      this.filterItems();
    });
  }

  public id = uuidv4();
  public label = input<string>();
  public withFilter = input<boolean>(false);
  items = input.required<basicValue[]>();
  itemsFilter: basicValue[] = [];
  itemsObjet: { [key: string]: { label: string; select: boolean } } = {};

  @ViewChild('dropdown') public dropdown!: ElementRef<HTMLDivElement>;
  @ViewChild('filter') public filterInput!: ElementRef<HTMLInputElement>;

  public isShowBox: boolean = false;
  public positionOption: 'bottom' | 'top' = 'bottom';
  public showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  public hideTransitionOptions: string = '.1s linear';
  public isDisabled: boolean = false;
  public value: string | undefined | null;
  private onChange: (value: string | undefined | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: string | undefined | null): void {
    if (this.items().find((val) => val.value == obj)) {
      this.value = obj;
      return;
    }
    this.value = undefined;
    this.onChange(undefined);
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

  ngOnChanges(_: SimpleChanges): void {
    this.valueFilter = '';
    this.initObjetItems();
    this.filterItems();
  }

  ngOnInit(): void {}

  private initObjetItems() {
    this.itemsObjet = {};
    this.items().forEach((item) => {
      this.itemsObjet[item.value] = { label: item.label, select: false };
    });
  }

  private filterItems(): void {
    if (this.valueFilter === '') {
      this.itemsFilter = [...this.items()];
      return;
    }
    const items = this.items().filter((value) =>
      value.label.toLowerCase().includes(this.valueFilter.toLowerCase())
    );
    this.itemsFilter = [...items];
  }

  onFilterValue(): void {
    this.inputSubject.next('');
  }

  changeChecked(value: string) {
    // this.itemsObjet[value] = {
    //   ...this.itemsObjet[value],
    //   select: !this.itemsObjet[value].select,
    // };
    this.value = value;
    this.onChange(this.value);
    this.isShowBox = false;
    this._cd.markForCheck();
  }

  public showBox(event: MouseEvent): void {
    //console.log('mostrar')
    if (this.isDisabled) return;
    this.verifyHeightContainer(event.y);
  }
  private verifyHeightContainer(height: number): void {
    const heightOption: number = height || 0;
    this.isShowBox = !this.isShowBox;
    if (this.isShowBox) {
      let heightDropdown: number = this.items.length;

      if (heightDropdown >= 5) {
        heightDropdown = 420;
      } else {
        ++heightDropdown;
        heightDropdown *= 84;
      }

      if (window.screen.height - heightOption > heightDropdown) {
        this.positionOption = 'bottom';
      } else {
        this.positionOption = 'top';
      }
    }
    this.onTouched();
  }

  public startAnimation(event: any): void {
    switch (event.toState) {
      case 'visible':
        if (this.filterInput && this.filterInput.nativeElement) {
          this.filterInput.nativeElement.focus();
        }
        this.verifyClickOut();
        break;

      case 'void':
        break;
    }
  }

  public verifyClickOut() {
    const documentTarget = this.dropdown
      ? this.dropdown.nativeElement.ownerDocument
      : 'document';
    this._render.listen(documentTarget, 'click', (event) => {
      if (
        this.dropdown &&
        this.dropdown.nativeElement &&
        !this.dropdown.nativeElement.contains(event.target) &&
        this.isShowBox
      ) {
        this.isShowBox = false;
      }
      this._cd.markForCheck();
    });
  }
}
