import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudPlatform } from '../../models/platform.model';

@Component({
  selector: 'app-cloud-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cloud-switcher">
      <button 
        *ngFor="let cloud of clouds" 
        class="cloud-btn"
        [class]="cloud.id"
        [class.active]="currentCloud === cloud.id"
        (click)="selectCloud(cloud.id)">
        <i [class]="cloud.icon"></i>
        {{ cloud.name }}
      </button>
    </div>
  `,
  styles: [`
    .cloud-switcher {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .cloud-btn {
      padding: 15px 30px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;

      &.aws { 
        background: var(--aws-orange); 
      }
      
      &.gcp { 
        background: var(--gcp-blue); 
      }
      
      &.azure { 
        background: var(--azure-blue); 
      }
      
      &.active { 
        transform: scale(1.1); 
        box-shadow: 0 10px 20px rgba(0,0,0,0.2); 
      }

      &:hover {
        opacity: 0.9;
      }
    }

    @media (max-width: 768px) {
      .cloud-switcher {
        flex-direction: column;
        gap: 10px;
      }
      
      .cloud-btn {
        padding: 12px 20px;
        font-size: 0.9rem;
        justify-content: center;
      }
    }
  `]
})
export class CloudSwitcherComponent {
  @Input() currentCloud: CloudPlatform = 'aws';
  @Output() cloudChanged = new EventEmitter<CloudPlatform>();

  clouds = [
    { id: 'aws' as CloudPlatform, name: 'AWS', icon: 'fab fa-aws' },
    { id: 'gcp' as CloudPlatform, name: 'GCP', icon: 'fab fa-google' },
    { id: 'azure' as CloudPlatform, name: 'Azure', icon: 'fab fa-microsoft' }
  ];

  selectCloud(cloud: CloudPlatform): void {
    this.cloudChanged.emit(cloud);
  }
}