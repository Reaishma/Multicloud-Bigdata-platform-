import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DataService } from '../../../services/data.service';
import { CloudPlatform, StreamMetrics } from '../../../models/platform.model';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-streaming-tab',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatButtonModule],
  template: `
    <div class="dashboard-grid">
      <!-- Stream Monitoring -->
      <div class="card">
        <h3><i class="fas fa-stream"></i> Real-time Data Stream</h3>
        <div class="data-stream" [class.stream-active]="isStreaming">
          <div class="streaming-animation" *ngIf="isStreaming">
            <div class="data-point" 
                 *ngFor="let point of dataPoints; trackBy: trackByIndex"
                 [style.left.px]="point.x"
                 [style.top.px]="point.y"
                 [style.background-color]="point.color">
            </div>
          </div>
          <div class="stream-status" [class.active]="isStreaming">
            <i class="fas fa-wifi fa-3x"></i>
            <p>{{ isStreaming ? 'Data streaming in real-time' : 'Stream inactive' }}</p>
          </div>
        </div>
        <button 
          mat-raised-button 
          [color]="isStreaming ? 'warn' : 'primary'"
          (click)="toggleStreaming()">
          <i [class]="isStreaming ? 'fas fa-stop' : 'fas fa-play'"></i>
          {{ isStreaming ? 'Stop Streaming' : 'Start Streaming' }}
        </button>
      </div>

      <!-- Stream Analytics -->
      <div class="card">
        <h3><i class="fas fa-chart-area"></i> Stream Analytics</h3>
        <div class="chart-container">
          <canvas 
            baseChart
            [data]="streamChartData"
            [options]="streamChartOptions"
            [type]="streamChartType">
          </canvas>
        </div>
      </div>

      <!-- Real-time Metrics -->
      <div class="card">
        <h3><i class="fas fa-tachometer-alt"></i> Real-time Metrics</h3>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">{{ streamMetrics.throughput.toLocaleString() }}</div>
            <div class="metric-label">Events/sec</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ streamMetrics.latency }}ms</div>
            <div class="metric-label">Latency</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ streamMetrics.totalEvents.toLocaleString() }}</div>
            <div class="metric-label">Total Events</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Streaming Configuration -->
    <div class="streaming-config card">
      <h3><i class="fas fa-cogs"></i> Streaming Configuration</h3>
      <div class="config-grid">
        <div class="config-item">
          <label>{{ getStreamingService() }} Topic/Stream</label>
          <div class="config-value">{{ getTopicName() }}</div>
        </div>
        <div class="config-item">
          <label>Partitions/Shards</label>
          <div class="config-value">{{ getPartitionCount() }}</div>
        </div>
        <div class="config-item">
          <label>Consumer Group</label>
          <div class="config-value">bigdata-processors</div>
        </div>
        <div class="config-item">
          <label>Retention</label>
          <div class="config-value">7 days</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .data-stream {
      height: 200px;
      border: 2px dashed #ccc;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      margin: 15px 0;
      background: linear-gradient(45deg, #f8f9fa, #e9ecef);

      &.stream-active {
        border-color: #007bff;
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0%, 100% { border-color: #007bff; }
      50% { border-color: #0056b3; }
    }

    .streaming-animation {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .data-point {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: stream 3s linear infinite;
    }

    @keyframes stream {
      0% { 
        left: -10px; 
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% { 
        left: calc(100% + 10px); 
        opacity: 0;
      }
    }

    .stream-status {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #6c757d;
      
      &.active {
        color: #007bff;
      }

      p {
        margin: 10px 0 0 0;
        font-size: 0.9rem;
      }
    }

    .chart-container {
      height: 250px;
      position: relative;
    }

    .streaming-config {
      margin-top: 20px;
    }

    .config-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 15px;
    }

    .config-item {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;

      label {
        display: block;
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 5px;
        font-weight: 500;
      }

      .config-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
      }
    }

    @media (max-width: 768px) {
      .data-stream {
        height: 150px;
      }
      
      .chart-container {
        height: 200px;
      }
      
      .config-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
  `]
})
export class StreamingTabComponent implements OnInit, OnDestroy {
  @Input() currentCloud: CloudPlatform = 'aws';

  isStreaming = false;
  streamMetrics: StreamMetrics = {
    throughput: 0,
    latency: 0,
    totalEvents: 0
  };
  dataPoints: Array<{x: number, y: number, color: string}> = [];
  
  private subscriptions = new Subscription();
  private animationInterval?: number;

  // Chart configuration
  streamChartType: ChartType = 'line';
  streamChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      label: 'Events per second',
      data: [],
      borderColor: '#e25a1c',
      backgroundColor: 'rgba(226, 90, 28, 0.1)',
      fill: true
    }]
  };

  streamChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      x: {
        display: false
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Events/sec'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.getStreamMetrics().subscribe(metrics => {
        this.streamMetrics = metrics;
        this.updateStreamChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  toggleStreaming(): void {
    this.isStreaming = !this.isStreaming;
    this.dataService.toggleStreaming();
    
    if (this.isStreaming) {
      this.startStreamingAnimation();
    } else {
      this.stopStreamingAnimation();
    }
  }

  private startStreamingAnimation(): void {
    this.animationInterval = window.setInterval(() => {
      this.addDataPoint();
    }, 500);
  }

  private stopStreamingAnimation(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    this.dataPoints = [];
  }

  private addDataPoint(): void {
    const colors = ['#00ff00', '#0088ff', '#ff8800', '#ff0088', '#8800ff'];
    const point = {
      x: -10,
      y: Math.random() * 180 + 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    this.dataPoints.push(point);
    
    // Remove old points to prevent memory leaks
    if (this.dataPoints.length > 20) {
      this.dataPoints.shift();
    }
  }

  private updateStreamChart(): void {
    const chart = this.streamChartData;
    const now = new Date();
    
    if (chart.labels && chart.datasets[0].data) {
      chart.labels.push(now.toLocaleTimeString());
      chart.datasets[0].data.push(this.streamMetrics.throughput);
      
      if (chart.labels.length > 20) {
        chart.labels.shift();
        chart.datasets[0].data.shift();
      }
    }
  }

  getStreamingService(): string {
    switch (this.currentCloud) {
      case 'aws': return 'Kinesis';
      case 'gcp': return 'Pub/Sub';
      case 'azure': return 'Event Hubs';
      default: return 'Kinesis';
    }
  }

  getTopicName(): string {
    switch (this.currentCloud) {
      case 'aws': return 'bigdata-stream';
      case 'gcp': return 'projects/bigdata/topics/stream';
      case 'azure': return 'bigdata-eventhub';
      default: return 'bigdata-stream';
    }
  }

  getPartitionCount(): number {
    switch (this.currentCloud) {
      case 'aws': return 3;
      case 'gcp': return 5;
      case 'azure': return 4;
      default: return 3;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}