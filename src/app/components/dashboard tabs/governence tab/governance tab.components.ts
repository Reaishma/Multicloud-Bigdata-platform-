Monitoringl-timel-timeort { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CloudPlatform, DataQualityMetrics } from '../../../models/platform.model';
import { DataService } from '../../../services/data.service';

declare const d3: any;

@Component({
  selector: 'app-governance-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  template: `
    <div class="dashboard-grid">
      <!-- Data Lineage -->
      <div class="card lineage-card">
        <h3><i class="fas fa-project-diagram"></i> Data Lineage</h3>
        <div class="data-lineage" #dataLineage></div>
      </div>

      <!-- API Testing -->
      <div class="card">
        <h3><i class="fas fa-code"></i> API Endpoint Testing</h3>
        <div class="api-testing">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Endpoint URL</mat-label>
            <input matInput [(ngModel)]="apiUrl" placeholder="/api/v1/data/process">
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Method</mat-label>
            <mat-select [(ngModel)]="apiMethod">
              <mat-option value="GET">GET</mat-option>
              <mat-option value="POST">POST</mat-option>
              <mat-option value="PUT">PUT</mat-option>
              <mat-option value="DELETE">DELETE</mat-option>
            </mat-select>
          </mat-form-field>
          
          <button mat-raised-button color="primary" (click)="testAPI()" [disabled]="apiTesting">
            <i class="fas fa-paper-plane"></i>
            {{ apiTesting ? 'Testing...' : 'Test API' }}
          </button>
          
          <div class="api-response" *ngIf="apiResponse">
            <mat-card [class.success-response]="apiResponse.success" 
                     [class.error-response]="!apiResponse.success">
              <mat-card-header>
                <mat-card-title>
                  Response ({{ apiResponse.status }})
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <pre>{{ apiResponse.data | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>

      <!-- Data Quality Metrics -->
      <div class="card">
        <h3><i class="fas fa-shield-alt"></i> Data Quality</h3>
        <div class="quality-metrics">
          <div class="quality-metric" *ngFor="let metric of qualityMetrics">
            <div class="metric-header">
              <span class="metric-name">{{ metric.name }}</span>
              <span class="metric-score" [class]="getQualityClass(metric.value)">
                {{ metric.value }}%
              </span>
            </div>
            <div class="metric-bar">
              <div class="metric-progress" 
                   [style.width.%]="metric.value"
                   [class]="getQualityClass(metric.value)">
              </div>
            </div>
            <div class="metric-description">{{ metric.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Catalog -->
    <div class="data-catalog card">
      <h3><i class="fas fa-book"></i> Data Catalog</h3>
      <div class="catalog-grid">
        <div class="catalog-item" *ngFor="let dataset of dataCatalog">
          <div class="catalog-header">
            <h4>{{ dataset.name }}</h4>
            <span class="dataset-type">{{ dataset.type }}</span>
          </div>
          <div class="catalog-details">
            <div class="detail-item">
              <span class="detail-label">Schema:</span>
              <span class="detail-value">{{ dataset.schema }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Records:</span>
              <span class="detail-value">{{ dataset.records.toLocaleString() }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Updated:</span>
              <span class="detail-value">{{ dataset.lastUpdated | date:'short' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Location:</span>
              <span class="detail-value">{{ dataset.location }}</span>
            </div>
          </div>
          <div class="catalog-tags">
            <span class="tag" *ngFor="let tag of dataset.tags">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Compliance Dashboard -->
    <div class="compliance-dashboard card">
      <h3><i class="fas fa-balance-scale"></i> Compliance & Security</h3>
      <div class="compliance-grid">
        <div class="compliance-item" *ngFor="let item of complianceItems">
          <div class="compliance-icon" [class]="item.status">
            <i [class]="item.icon"></i>
          </div>
          <div class="compliance-content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <span class="compliance-status" [class]="item.status">
              {{ item.statusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lineage-card {
      grid-column: span 2;
    }

    .data-lineage {
      background: white;
      border-radius: 10px;
      padding: 15px;
      min-height: 360px;
      max-height: 380px;
      overflow: hidden;
      border: 1px solid #ddd;
    }

    .api-testing {
      .full-width {
        width: 100%;
        margin-bottom: 15px;
      }

      .api-response {
        margin-top: 20px;

        .success-response {
          border-left: 4px solid #28a745;
        }

        .error-response {
          border-left: 4px solid #dc3545;
        }

        pre {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 0.85rem;
        }
      }
    }

    .quality-metrics {
      .quality-metric {
        margin-bottom: 20px;

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .metric-name {
            font-weight: 500;
            color: #333;
          }

          .metric-score {
            font-weight: bold;
            font-size: 1.1rem;

            &.excellent { color: #28a745; }
            &.good { color: #20c997; }
            &.warning { color: #ffc107; }
            &.poor { color: #dc3545; }
          }
        }

        .metric-bar {
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 5px;

          .metric-progress {
            height: 100%;
            transition: width 0.5s ease;

            &.excellent { background: #28a745; }
            &.good { background: #20c997; }
            &.warning { background: #ffc107; }
            &.poor { background: #dc3545; }
          }
        }

        .metric-description {
          font-size: 0.85rem;
          color: #666;
        }
      }
    }

    .data-catalog {
      margin-top: 20px;

      .catalog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }

      .catalog-item {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;

        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;

          h4 {
            margin: 0;
            color: #333;
          }

          .dataset-type {
            background: #007bff;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
          }
        }

        .catalog-details {
          margin-bottom: 15px;

          .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;

            .detail-label {
              color: #666;
              font-weight: 500;
            }

            .detail-value {
              color: #333;
            }
          }
        }

        .catalog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .tag {
            background: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
          }
        }
      }
    }

    .compliance-dashboard {
      margin-top: 20px;

      .compliance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      .compliance-item {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
        border-left: 4px solid #dee2e6;

        .compliance-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;

          &.compliant {
            background: #28a745;
            color: white;
          }

          &.warning {
            background: #ffc107;
            color: #333;
          }

          &.non-compliant {
            background: #dc3545;
            color: white;
          }
        }

        .compliance-content {
          flex: 1;

          h4 {
            margin: 0 0 8px 0;
            color: #333;
          }

          p {
            margin: 0 0 10px 0;
            font-size: 0.9rem;
            color: #666;
            line-height: 1.4;
          }

          .compliance-status {
            font-size: 0.85rem;
            font-weight: 500;
            padding: 2px 8px;
            border-radius: 4px;

            &.compliant {
              background: #d4edda;
              color: #155724;
            }

            &.warning {
              background: #fff3cd;
              color: #856404;
            }

            &.non-compliant {
              background: #f8d7da;
              color: #721c24;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .lineage-card {
        grid-column: span 1;
      }

      .data-lineage {
        min-height: 200px;
      }

      .catalog-grid,
      .compliance-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GovernanceTabComponent implements OnInit, AfterViewInit {
  @Input() currentCloud: CloudPlatform = 'aws';
  @ViewChild('dataLineage', { static: true }) dataLineageRef!: ElementRef;

  apiUrl = '/api/v1/data/process';
  apiMethod = 'GET';
  apiTesting = false;
  apiResponse: any = null;

  qualityMetrics = [
    {
      name: 'Data Accuracy',
      value: 99.2,
      description: 'Percentage of records with correct values'
    },
    {
      name: 'Completeness',
      value: 96.8,
      description: 'Percentage of non-null values in required fields'
    },
    {
      name: 'Consistency',
      value: 98.5,
      description: 'Data format and value consistency across sources'
    },
    {
      name: 'Timeliness',
      value: 94.1,
      description: 'Data freshness and update frequency compliance'
    }
  ];

  dataCatalog = [
    {
      name: 'Customer Transactions',
      type: 'Structured',
      schema: 'ecommerce.transactions',
      records: 2500000,
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: 's3://data-lake/transactions/',
      tags: ['PII', 'Financial', 'Production']
    },
    {
      name: 'IoT Sensor Readings',
      type: 'Time Series',
      schema: 'iot.sensor_data',
      records: 8900000,
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
      location: 's3://data-lake/iot-sensors/',
      tags: ['Real-time', 'Production', 'Monitoring']
    },
    {
      name: 'User Activity Logs',
      type: 'Semi-structured',
      schema: 'analytics.user_events',
      records: 15000000,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      location: 's3://data-lake/user-logs/',
      tags: ['Analytics', 'PII', 'Production']
    }
  ];

  complianceItems = [
    {
      title: 'GDPR Compliance',
      description: 'Personal data protection and privacy rights compliance',
      status: 'compliant',
      statusText: 'Compliant',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'Data Encryption',
      description: 'Data encrypted at rest and in transit using AES-256',
      status: 'compliant',
      statusText: 'Enabled',
      icon: 'fas fa-lock'
    },
    {
      title: 'Access Control',
      description: 'Role-based access control and audit logging',
      status: 'warning',
      statusText: 'Review Required',
      icon: 'fas fa-user-shield'
    },
    {
      title: 'Data Retention',
      description: 'Automated data lifecycle management policies',
      status: 'compliant',
      statusText: 'Active',
      icon: 'fas fa-calendar-alt'
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeDataLineage();
  }

  private initializeDataLineage(): void {
    if (typeof d3 === 'undefined') {
      console.warn('D3.js not available, skipping data lineage visualization');
      return;
    }

    const container = this.dataLineageRef.nativeElement;
    container.innerHTML = '';

    const width = container.offsetWidth || 600;
    const height = 320;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('border', '1px solid #ddd')
      .style('border-radius', '5px');

    const nodes = this.getLineageNodes();
    const links = this.getLineageLinks();

    // Add arrow marker
    svg.append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 10)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    // Draw links
    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => nodes.find(n => n.id === d.source)?.x + 60)
      .attr('y1', d => nodes.find(n => n.id === d.source)?.y + 15)
      .attr('x2', d => nodes.find(n => n.id === d.target)?.x)
      .attr('y2', d => nodes.find(n => n.id === d.target)?.y + 15)
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Draw nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroups.append('rect')
      .attr('width', 120)
      .attr('height', 30)
      .attr('rx', 5)
      .attr('fill', d => this.getNodeColor(d.type))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodeGroups.append('text')
      .attr('x', 60)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.label);
  }

  private getLineageNodes(): Array<{id: string, label: string, x: number, y: number, type: string}> {
    return [
      { id: 'sources', label: 'Data Sources', x: 30, y: 50, type: 'source' },
      { id: 'stream', label: this.getStreamingService(), x: 30, y: 120, type: 'stream' },
      { id: 'storage_raw', label: 'Raw Storage', x: 200, y: 30, type: 'storage' },
      { id: 'cluster', label: 'Processing', x: 200, y: 90, type: 'process' },
      { id: 'functions', label: 'Functions', x: 200, y: 150, type: 'process' },
      { id: 'storage_processed', label: 'Processed', x: 370, y: 30, type: 'storage' },
      { id: 'warehouse', label: 'Data Warehouse', x: 370, y: 90, type: 'storage' },
      { id: 'query', label: 'Query Engine', x: 370, y: 150, type: 'process' },
      { id: 'visualization', label: 'Dashboards', x: 540, y: 60, type: 'output' },
      { id: 'api', label: 'API Gateway', x: 540, y: 120, type: 'output' },
      { id: 'ml', label: 'ML Models', x: 540, y: 180, type: 'output' }
    ];
  }

  private getLineageLinks(): Array<{source: string, target: string}> {
    return [
      { source: 'sources', target: 'stream' },
      { source: 'sources', target: 'storage_raw' },
      { source: 'stream', target: 'functions' },
      { source: 'storage_raw', target: 'cluster' },
      { source: 'functions', target: 'storage_processed' },
      { source: 'cluster', target: 'storage_processed' },
      { source: 'cluster', target: 'warehouse' },
      { source: 'storage_processed', target: 'query' },
      { source: 'warehouse', target: 'visualization' },
      { source: 'query', target: 'api' },
      { source: 'storage_processed', target: 'ml' }
    ];
  }

  private getNodeColor(type: string): string {
    switch (type) {
      case 'source': return '#28a745';
      case 'process': return '#007bff';
      case 'storage': return '#ffc107';
      case 'stream': return '#17a2b8';
      case 'output': return '#dc3545';
      default: return '#6c757d';
    }
  }

  private getStreamingService(): string {
    switch (this.currentCloud) {
      case 'aws': return 'Kinesis';
      case 'gcp': return 'Pub/Sub';
      case 'azure': return 'Event Hub';
      default: return 'Stream';
    }
  }

  testAPI(): void {
    this.apiTesting = true;
    this.apiResponse = null;

    // Simulate API testing
    setTimeout(() => {
      this.apiResponse = {
        success: Math.random() > 0.2,
        status: Math.random() > 0.2 ? 200 : 404,
        data: {
          message: 'API endpoint is working correctly',
          timestamp: new Date().toISOString(),
          method: this.apiMethod,
          endpoint: this.apiUrl,
          platform: this.currentCloud,
          responseTime: Math.floor(Math.random() * 200) + 50
        }
      };
      this.apiTesting = false;
    }, 1500);
  }

  getQualityClass(value: number): string {
    if (value >= 98) return 'excellent';
    if (value >= 95) return 'good';
    if (value >= 90) return 'warning';
    return 'poor';
  }
}