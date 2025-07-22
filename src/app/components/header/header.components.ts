import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header">
      <h1><i class="fas fa-cloud"></i> Big Data Processing Workflows</h1>
      <p>Multi-Cloud Platform for Hadoop & Spark Analytics</p>
    </div>
  `,
  styles: [`
    /* Styles are already defined in global styles.scss */
  `]
})
export class HeaderComponent {}