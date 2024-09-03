import { CommonModule } from '@angular/common';
import { Component, input, output, type OnInit } from '@angular/core';
import { itemsProgressBar } from '@models';

@Component({
  selector: 'nx-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nx-progress-bar.component.html',
  styleUrl: './nx-progress-bar.component.css',
})
export class NxProgressBarComponent implements OnInit {
  items = input.required<itemsProgressBar[]>();

  public emitSelect = output<number>();

  ngOnInit(): void {}
}
