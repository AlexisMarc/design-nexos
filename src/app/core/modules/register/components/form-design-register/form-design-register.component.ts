import { Component, type OnInit } from '@angular/core';
import { ColorTranslator } from 'colortranslator';

@Component({
  selector: 'app-form-design-register',
  templateUrl: './form-design-register.component.html',
  styleUrl: './form-design-register.component.css',
})
export class FormDesignRegisterComponent implements OnInit {
  color: string = '#FF7300';
  darkerColors: string[] = ['#F06C00', '#D15E00', '#A34A00', '#662E00'];
  lighterColors: string[] = ['#FF7B0F', '#FF8C2E', '#FFA55C', '#FFC799'];

  ngOnInit(): void {}

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
}
