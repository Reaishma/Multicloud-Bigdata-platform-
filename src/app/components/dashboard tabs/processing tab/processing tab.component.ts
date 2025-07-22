import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../../../services/data.service';
import { CloudPlatform, ProcessingEngine, DataSource, JobStatus } from '../../../models/platform.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-processing-tab',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatProgressBarModule
  ],
  template: `
    <div class="dashboard-grid">
      <!-- Job Execution -->
      <div class="card">
        <h3><i class="fas fa-play"></i> Job Execution</h3>
        <div class="progress-container">
          <mat-progress-bar 
            mode="determinate" 
            [value]="jobStatus.progress">
          </mat-progress-bar>
          <div class="progress-info">
            <span>{{ jobStatus.status }}</span>
            <span class="progress-percentage">{{ jobStatus.progress.toFixed(0) }}%</span>
          </div>
        </div>
        <button 
          mat-raised-button 
          color="primary" 
          [disabled]="isJobRunning"
          (click)="startJob()"
          class="start-job-btn">
          <i class="fas fa-play"></i> 
          {{ isJobRunning ? 'Processing...' : 'Start Processing Job' }}
        </button>
      </div>

      <!-- Data Sources Configuration -->
      <div class="card">
        <h3><i class="fas fa-database"></i> Data Sources</h3>
        <div class="data-source-panel">
          <mat-checkbox 
            *ngFor="let source of dataSources"
            [(ngModel)]="source.enabled"
            (change)="updateDataSource(source)"
            class="data-source-checkbox">
            <div class="source-info">
              <div class="source-name">{{ source.name }}</div>
              <div class="source-description">{{ source.description }}</div>
              <div class="source-count">{{ source.recordCount.toLocaleString() }} records</div>
            </div>
          </mat-checkbox>
        </div>
      </div>

      <!-- Processing Log -->
      <div class="card log-card">
        <h3><i class="fas fa-terminal"></i> Processing Log</h3>
        <div class="log-output" #logOutput>
          <div *ngFor="let log of jobStatus.logs" class="log-line">
            {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Recommendations -->
    <div class="performance-recommendations">
      <h4><i class="fas fa-lightbulb"></i> Performance Optimization Recommendations</h4>
      <ul>
        <li *ngFor="let recommendation of recommendations">{{ recommendation }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .progress-container {
      margin: 20px 0;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      font-size: 0.9rem;
    }

    .progress-percentage {
      font-weight: bold;
      color: #007bff;
    }

    .start-job-btn {
      margin-top: 15px;
      width: 100%;
    }

    .data-source-panel {
      max-height: 300px;
      overflow-y: auto;
    }

    .data-source-checkbox {
      display: block;
      margin-bottom: 15px;
      width: 100%;
    }

    .source-info {
      margin-left: 10px;
    }

    .source-name {
      font-weight: 600;
      color: #333;
    }

    .source-description {
      font-size: 0.9rem;
      color: #666;
      margin: 2px 0;
    }

    .source-count {
      font-size: 0.8rem;
      color: #999;
    }

    .log-card {
      grid-column: span 2;
    }

    .log-output {
      background: #1a1a1a;
      color: #00ff00;
      padding: 15px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      height: 200px;
      overflow-y: auto;
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .log-line {
      margin-bottom: 2px;
    }

    .performance-recommendations {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;

      h4 {
        margin: 0 0 15px 0;
        color: #856404;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      ul {
        margin: 0;
        padding-left: 20px;
      }

      li {
        margin-bottom: 8px;
        color: #856404;
      }
    }

    @media (max-width: 768px) {
      .log-card {
        grid-column: span 1;
      }
      
      .log-output {
        height: 150px;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ProcessingTabComponent implements OnInit, OnDestroy {
  @Input() currentCloud: CloudPlatform = 'aws';
  @Input() currentEngine: ProcessingEngine = 'hadoop';

  dataSources: DataSource[] = [];
  jobStatus: JobStatus = {
    progress: 0,
    status: 'Ready to start',
    logs: ['System ready. Select data sources and start processing...']
  };
  isJobRunning = false;
  recommendations: string[] = [];

  private subscriptions = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDataSources();
    this.loadRecommendations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadDataSources(): void {
    this.dataSources = [
      {
        id: 'ecommerce',
        name: 'E-commerce Transactions',
        description: 'Customer purchase data with transaction details',
        enabled: true,
        recordCount: 15000
      },
      {
        id: 'iot',
        name: 'IoT Sensor Data',
        description: 'Temperature, Humidity, Pressure readings',
        enabled: true,
        recordCount: 8500
      },
      {
        id: 'logs',
        name: 'Web Server Logs',
        description: 'Apache/Nginx access and error logs',
        enabled: false,
        recordCount: 12000
      },
      {
        id: 'financial',
        name: 'Financial Market Data',
        description: 'Stock prices, trading volumes, market indices',
        enabled: false,
        recordCount: 6500
      },
      {
        id: 'social',
        name: 'Social Media Sentiment',
        description: 'Twitter/Facebook posts with sentiment analysis',
        enabled: false,
        recordCount: 4200
      }
    ];
  }

  private loadRecommendations(): void {
    const hadoopRecommendations = [
      'Consider increasing cluster size for large datasets',
      'Enable data partitioning for better query performance',
      'Use sequence files for better compression',
      'Implement speculative execution for faster processing',
      'Configure appropriate block size for your data'
    ];

    const sparkRecommendations = [
      'Optimize memory allocation with spark.executor.memory',
      'Use DataFrame API for better optimization',
      'Enable adaptive query execution (AQE)',
      'Consider using Spark streaming for real-time processing',
      'Implement data caching for frequently accessed datasets'
    ];

    this.recommendations = this.currentEngine === 'hadoop' ? hadoopRecommendations : sparkRecommendations;
  }

  updateDataSource(source: DataSource): void {
    // In a real application, this would make an API call
    console.log(`Updated data source ${source.id}: ${source.enabled}`);
  }

  startJob(): void {
    if (this.isJobRunning) return;

    const enabledSources = this.dataSources.filter(s => s.enabled);
    if (enabledSources.length === 0) {
      this.addLog('Error: No data sources selected for processing');
      return;
    }

    this.isJobRunning = true;
    this.jobStatus.progress = 0;
    this.jobStatus.status = 'Initializing...';
    this.jobStatus.logs = [];

    this.addLog('Starting big data processing job...');
    this.addLog(`Selected data sources: ${enabledSources.map(s => s.name).join(', ')}`);
    this.addLog(`Target platform: ${this.currentCloud.toUpperCase()}`);
    this.addLog(`Processing engine: ${this.currentEngine.toUpperCase()}`);

    this.simulateJobProgress();
  }

  private simulateJobProgress(): void {
    const stages = this.getProcessingStages();
    let currentStage = 0;

    const progressInterval = setInterval(() => {
      if (currentStage < stages.length) {
        this.jobStatus.status = stages[currentStage].name;
        this.addLog(`[${new Date().toLocaleTimeString()}] ${stages[currentStage].name}...`);
        
        const stageProgress = 100 / stages.length;
        const targetProgress = (currentStage + 1) * stageProgress;
        
        const stageInterval = setInterval(() => {
          this.jobStatus.progress += 1;
          
          if (this.jobStatus.progress >= targetProgress) {
            clearInterval(stageInterval);
            currentStage++;
            
            if (currentStage >= stages.length) {
              this.jobStatus.status = 'Job completed successfully';
              this.addLog(`[${new Date().toLocaleTimeString()}] Job completed successfully!`);
              this.isJobRunning = false;
              clearInterval(progressInterval);
            }
          }
        }, stages[currentStage].duration / stageProgress);
      }
    }, 500);
  }

  private getProcessingStages(): Array<{name: string, duration: number}> {
    const awsStages = [
      { name: 'Ingesting data via Kinesis Streams', duration: 1000 },
      { name: 'Storing raw data in S3 buckets', duration: 800 },
      { name: 'Lambda triggers EMR cluster start', duration: 1200 },
      { name: `${this.currentEngine.toUpperCase()} processing on EMR`, duration: 3000 },
      { name: 'Loading processed data to Redshift', duration: 1500 },
      { name: 'Running Athena queries for analytics', duration: 1000 },
      { name: 'Generating QuickSight reports', duration: 800 }
    ];

    const gcpStages = [
      { name: 'Streaming data via Pub/Sub', duration: 1000 },
      { name: 'Storing in Cloud Storage buckets', duration: 800 },
      { name: 'Triggering Dataproc cluster', duration: 1200 },
      { name: `${this.currentEngine.toUpperCase()} processing on Dataproc`, duration: 3000 },
      { name: 'Loading data to BigQuery', duration: 1500 },
      { name: 'Running BigQuery analytics', duration: 1000 },
      { name: 'Creating Data Studio reports', duration: 800 }
    ];

    const azureStages = [
      { name: 'Event Hubs data ingestion', duration: 1000 },
      { name: 'Storing in Data Lake Storage', duration: 800 },
      { name: 'Starting HDInsight cluster', duration: 1200 },
      { name: `${this.currentEngine.toUpperCase()} processing on HDInsight`, duration: 3000 },
      { name: 'Loading to Synapse Analytics', duration: 1500 },
      { name: 'Running Synapse queries', duration: 1000 },
      { name: 'Power BI report generation', duration: 800 }
    ];

    switch (this.currentCloud) {
      case 'aws': return awsStages;
      case 'gcp': return gcpStages;
      case 'azure': return azureStages;
      default: return awsStages;
    }
  }

  private addLog(message: string): void {
    this.jobStatus.logs.push(message);
    if (this.jobStatus.logs.length > 50) {
      this.jobStatus.logs.shift();
    }
  }
}