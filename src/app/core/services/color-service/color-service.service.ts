import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface colorsDynamic {
  primary: string;

  light_default: string;
  light_primary: string;
  light_secondary: string;
  light_tertiary: string;

  dark_default: string;
  dark_primary: string;
  dark_secondary: string;
  dark_tertiary: string;
}

export const COLORS_DYNAMIC_DEFAULT: colorsDynamic = {
  primary: '#FF7300',
  light_default: '#662E00',
  light_primary: '#A34A00',
  light_secondary: '#D15E00',
  light_tertiary: '#F06C00',
  dark_default: '#FFC799',
  dark_primary: '#FFA55C',
  dark_secondary: '#FF8C2E',
  dark_tertiary: '#FF7B0F',
};

@Injectable({
  providedIn: 'root',
})
export class ColorServiceService {
  private colorsSubject = new BehaviorSubject<colorsDynamic>(
    COLORS_DYNAMIC_DEFAULT
  );
  messages$ = this.colorsSubject.asObservable();

  constructor() {}

  setDynamicColors(color: string) {
    const colors = color.split(',');
    if (colors.length && colors.length === 9) {
      this.colorsSubject.next({
        primary: colors[0],
        light_default: colors[1],
        light_primary: colors[2],
        light_secondary: colors[3],
        light_tertiary: colors[4],
        dark_default: colors[5],
        dark_primary: colors[6],
        dark_secondary: colors[7],
        dark_tertiary: colors[8],
      });
      return;
    }
    this.colorsSubject.next(COLORS_DYNAMIC_DEFAULT);
  }
}
