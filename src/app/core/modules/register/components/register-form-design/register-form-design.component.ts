import { Component, inject, input, OnDestroy, output, type OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NxValidators } from '@helpers';
import { AppStore } from '@models';
import { Store } from '@ngrx/store';
import { NxToastService } from '@shared';
import { DataDesign } from '@store';
import { ColorTranslator } from 'colortranslator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'register-form-design',
  templateUrl: './register-form-design.component.html',
  styleUrl: './register-form-design.component.css',
})
export class FormDesignRegisterComponent implements OnInit, OnDestroy {
  onNext = output<boolean>();
  onAfter = output<void>();
  statusProcess = input.required<'pending' | 'create' | 'edit' | 'clone'>();
  color: string = '#FF7300';
  darkerColors: string[] = ['#F06C00', '#D15E00', '#A34A00', '#662E00'];
  lighterColors: string[] = ['#FF7B0F', '#FF8C2E', '#FFA55C', '#FFC799'];

  formDesign = new FormGroup({
    logo: new FormControl(''),
    welcome_message: new FormControl('', [NxValidators.required()]),
  });

  private _subscription = new Subscription();
  private _serviceMessage = inject(NxToastService);
  private _store: Store<AppStore> = inject(Store<AppStore>);

  ngOnInit(): void {
    this.initSubscription();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private initSubscription() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value.design) {
            this.setColors(value.design.color);
            this.formDesign.patchValue({
              ...value.design,
            });
          } else {
            this.setColors('');
            this.formDesign.reset({
              logo: '',
              welcome_message: '',
            });
          }
        },
      })
    );
  }
  generateColor() {
    const colorTranslator1: ColorTranslator = new ColorTranslator(this.color);
    const colorTranslator2: ColorTranslator = new ColorTranslator(this.color);
    const lighterColors: string[] = [];
    for (let i: number = 1; i <= 4; i++) {
      const newLighterColor: ColorTranslator = colorTranslator1.setL(
        colorTranslator1.L + i * 3
      );
      lighterColors.push(newLighterColor.HEX);
    }
    const darkerColors: string[] = [];
    for (let i: number = 1; i <= 4; i++) {
      const newDarkerColor: ColorTranslator = colorTranslator2.setL(
        colorTranslator2.L - i * 3
      );
      darkerColors.push(newDarkerColor.HEX);
    }

    this.lighterColors = [...lighterColors];
    this.darkerColors = [...darkerColors];
  }

  saveForm() {
    if (this.formDesign.invalid) {
      this.formDesign.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor, completar todos los campos requeridos',
      });
      return;
    }

    if (this.color == '' || this.color.includes(' ')) {
      this.formDesign.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'El formato de color no es el correcto',
      });
      return;
    }

    const welcome_message =
      this.formDesign.controls['welcome_message'].getRawValue()!;
    const logo = this.formDesign.controls['logo'].getRawValue()!;
    this._store.dispatch(
      DataDesign({ data: { welcome_message, color: this.getColors(), logo } })
    );
    this.onNext.emit(true);
  }

  private getColors() {
    const colors = `${this.color},${this.lighterColors.join(
      ','
    )},${this.darkerColors.join(',')}`;
    return colors;
  }

  private setColors(color: string) {
    const colors = color.split(',');
    if (colors.length === 9) {
      this.lighterColors = [...colors.slice(1, 5)];
      this.darkerColors = [...colors.slice(5)];
      this.color = colors[0];
    } else {
      this.color = '#FF7300';
      this.darkerColors = ['#F06C00', '#D15E00', '#A34A00', '#662E00'];
      this.lighterColors = ['#FF7B0F', '#FF8C2E', '#FFA55C', '#FFC799'];
    }
  }
}
