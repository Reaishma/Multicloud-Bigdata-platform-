import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { ProcessingTabComponent } from './processing-tab/processing-tab.component';
import { StreamingTabComponent } from './streaming-tab/streaming-tab.component';
import { AnalyticsTabComponent } from './analytics-tab/analytics-tab.component';
import { GovernanceTabComponent } from './governance-tab/governance-tab.component';
import { CloudPlatform, ProcessingEngine } from '../../models/platform.model';

@Component({
  selector: 'app-dashboard-tabs',
  standalone: true,
  imports: [
    CommonModule,
    OverviewTabComponent,
    ProcessingTabComponent,
    StreamingTabComponent,
    AnalyticsTabComponent,
    GovernanceTabComponent
  ],
  template: `
    <div class="tabs">
      <button 
        *ngFor="let tab of tabs"
        class="tab"
        [class.active]="activeTab === tab.id"
        (click)="switchTab(tab.id)">
        {{ tab.name }}
      </button>
    </div>

    <div class="tab-content">
      <app-overview-tab 
        *ngIf="activeTab === 'overview'"
        [currentCloud]="currentCloud"
        [currentEngine]="currentEngine">
      </app-overview-tab>
      
      <app-processing-tab 
        *ngIf="activeTab === 'processing'"
        [currentCloud]="currentCloud"
        [currentEngine]="currentEngine">
      </app-processing-tab>
      
      <app-streaming-tab 
        *ngIf="activeTab === 'streaming'"
        [currentCloud]="currentCloud">
      </app-streaming-tab>
      
      <app-analytics-tab 
        *ngIf="activeTab === 'analytics'"
        [currentCloud]="currentCloud">
      </app-analytics-tab>
      
      <app-governance-tab 
        *ngIf="activeTab === 'governance'"
        [currentCloud]="currentCloud">
      </app-governance-tab>
    </div>
  `,
  styles: [`
    .tabs {
      display: flex;
      border-bottom: 2px solid #ddd;
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 5px;
    }

    .tab {
      padding: 15px 25px;
      cursor: pointer;
      border: none;
      background: none;
      font-weight: bold;
      transition: all 0.3s ease;
      border-radius: 5px 5px 0 0;

      &.active {
        background: #007bff;
        color: white;
      }

      &:hover:not(.active) {
        background: #f8f9fa;
      }
    }

    @media (max-width: 768px) {
      .tab {
        flex: 1;
        min-width: 100px;
        padding: 10px 15px;
        font-size: 0.8rem;
      }
    }
  `]
})
export class DashboardTabsComponent implements OnInit {
  @Input() currentCloud: CloudPlatform = 'aws';
  @Input() currentEngine: ProcessingEngine = 'hadoop';

  activeTab = 'overview';

  tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'processing', name: 'Data Processing' },
    { id: 'streaming', name: 'Real-time Streaming' },
    { id: 'analytics', name: 'Analytics & Reports' },
    { id: 'governance', name: 'Data Governance' }
  ];

  ngOnInit(): void {}

  switchTab(tabId: string): void {
    this.activeTab = tabId;
  }
}