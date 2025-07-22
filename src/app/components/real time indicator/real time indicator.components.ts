import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-time-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="real-time-indicator" [class.inactive]="!isActive">
      <i class="fas fa-circle"></i> 
      {{ isActive ? 'Real-time Active' : 'Real-time Inactive' }}
    </div>
  `
})
export class RealTimeIndicatorComponent {
  @Input() isActive = false;
}