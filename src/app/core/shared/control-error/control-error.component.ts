import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [CommonModule],
  template: `@if (error()) {
    <div class="text-brand-red-500 text-xs font-normal">
      <p>{{ error() }}</p>
    </div>
    } `,
  styleUrl: './control-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  error = input.required<string>()
}
