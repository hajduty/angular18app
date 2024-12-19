import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ErrorComponent {
  errorMessage: string = '';

  constructor(private errorService: ErrorService) {
    effect(() => {
      this.errorMessage = this.errorService.getErrorSignal();
    });
  }
}
