import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CloudPlatform } from '../../../models/platform.model';
import { DataService } from '../../../services/data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-tab',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatButtonModule],
  template: `
    <div class="dashboard-grid">
      <!-- Data Distribution -->
      <div class="card">
        <h3><i class="fas fa-chart-pie"></i> Data Distribution</h3>
        <div class="chart-container">
          <canvas 
            baseChart
            [data]="pieChartData"
            [options]="pieChartOptions"
            [type]="pieChartType">
          </canvas>
        </div>
      </div>

      <!-- Time Series Analysis -->
      <div class="card">
        <h3><i class="fas fa-chart-line"></i> Time Series Analysis</h3>
        <div class="chart-container">
          <canvas 
            baseChart
            [data]="timeSeriesData"
            [options]="timeSeriesOptions"
            [type]="timeSeriesType">
          </canvas>
        </div>
      </div>

      <!-- Platform Comparison -->
      <div class="card">
        <h3><i class="fas fa-balance-scale"></i> Platform Comparison</h3>
        <div class="chart-container">
          <canvas 
            baseChart
            [data]="comparisonData"
            [options]="comparisonOptions"
            [type]="comparisonType">
          </canvas>
        </div>
      </div>

      <!-- Processing Volume Trends -->
      <div class="card">
        <h3><i class="fas fa-trending-up"></i> Processing Volume Trends</h3>
        <div class="chart-container">
          <canvas 
            baseChart
            [data]="volumeTrendData"
            [options]="volumeTrendOptions"
            [type]="volumeTrendType">
          </canvas>
        </div>
      </div>
    </div>

    <!-- Export Controls -->
    <div class="export-section">
      <h3><i class="fas fa-download"></i> Export Analytics</h3>
      <div class="export-controls">
        <button mat-raised-button color="primary" (click)="exportData('csv')">
          <i class="fas fa-file-csv"></i> Export CSV
        </button>
        <button mat-raised-button color="primary" (click)="exportData('json')">
          <i class="fas fa-file-code"></i> Export JSON
        </button>
        <button mat-raised-button color="primary" (click)="exportData('pdf')">
          <i class="fas fa-file-pdf"></i> Export PDF Report
        </button>
      </div>
    </div>

    <!-- Analytics Insights -->
    <div class="insights-section">
      <h3><i class="fas fa-brain"></i> Key Insights</h3>
      <div class="insights-grid">
        <div class="insight-card" *ngFor="let insight of insights">
          <div class="insight-icon">
            <i [class]="insight.icon"></i>
          </div>
          <div class="insight-content">
            <h4>{{ insight.title }}</h4>
            <p>{{ insight.description }}</p>
            <div class="insight-value">{{ insight.value Shards       </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      height: 300px;
      position: relative;
    }

    .export-section {
      background: white;
      border-radius: 15px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);

      h3 {
        margin: 0 0 15px 0;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .export-controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;

      button {
        min-width: 150px;
        
        i {
          margin-right: 8px;
        }
      }
    }

    .insights-section {
      background: white;
      border-radius: 15px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);

      h3 {
        margin: 0 0 20px 0;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8top
      }
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .insight-card {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      background: linear-gradient(45deg, #f8f9fa, #e9ecef);
      border-radius: 10px;
      border-left: 4px solid #007bff;

      .insight-icon {
        background: #007bff;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .insight-content {
        flex: 1;

        h4 {
          margin: 0 0 8px 0;
          font-size: 1.1rem;
          color: #333;
        }

        p {
          margin: 0 0 10px 0;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }

        .insight-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #007bff;
        }
      }
    }

    @media (max-width: 768px) {
      .chart-container {
        height: 250px;
      }
      
      .export-controls {
        flex-direction: column;
        gap: 10px;

        button {
          width: 100%;
        }
      }
      
      .insights-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsTabComponent implements OnInit {
  @Input() currentCloud: CloudPlatform = 'aws';

  insights = [
    {
      icon: 'fas fa-chart-line',
      title: 'Peak Processing Hours',
      description: 'Highest data processing volume occurs between 9 AM - 11 AM',
      value: '2.4M events/hour'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Cost Optimization',
      description: 'Potential 15% cost savings by optimizing cluster auto-scaling',
      value: '$3,200/month'
    },
    {
      icon: 'fas fa-tachometer-alt',
      title: 'Performance Trend',
      description: 'Processing latency improved by 23% over the last month',
      value: '45ms average'
    },
    {
      icon: 'fas fa-database',
      title: 'Data Quality',
      description: 'Data accuracy and completeness scores above target',
      value: '98.2% quality'
    }
  ];

  // Pie Chart
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: ['E-commerce', 'IoT Sensors', 'Web Logs', 'Financial', 'Social Media'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Data Sources Distribution (%)'
      }
    }
  };

  // Time Series Chart
  timeSeriesType: ChartType = 'line';
  timeSeriesData: ChartConfiguration['data'] = {
    datasets: [{
      label: 'Processing Volume (Events/Hour)',
      data: [],
      borderColor: '#6f42c1',
      backgroundColor: 'rgba(111, 66, 193, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  timeSeriesOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: '24-Hour Processing Volume Trend'
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Events per Hour'
        }
      }
    }
  };

  // Platform Comparison Chart
  comparisonType: ChartType = 'radar';
  comparisonData: ChartConfiguration['data'] = {
    labels: ['Processing Speed', 'Cost Efficiency', 'Scalability', 'Reliability', 'Data Security', 'Global Availability'],
    datasets: [{
      label: 'AWS',
      data: [85, 78, 92, 88, 95, 98],
      backgroundColor: 'rgba(255, 153, 0, 0.2)',
      borderColor: '#FF9900',
      borderWidth: 2,
      pointBackgroundColor: '#FF9900'
    }, {
      label: 'GCP',
      data: [82, 85, 88, 85, 92, 95],
      backgroundColor: 'rgba(66, 133, 244, 0.2)',
      borderColor: '#4285F4',
      borderWidth: 2,
      pointBackgroundColor: '#4285F4'
    }, {
      label: 'Azure',
      data: [80, 82, 85, 90, 88, 96],
      backgroundColor: 'rgba(0, 120, 212, 0.2)',
      borderColor: '#0078D4',
      borderWidth: 2,
      pointBackgroundColor: '#0078D4'
    }]
  };

  comparisonOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Multi-Cloud Platform Performance Comparison'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Volume Trend Chart
  volumeTrendType: ChartType = 'bar';
  volumeTrendData: ChartConfiguration['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Processed (TB)',
      data: [12.5, 15.2, 18.7, 22.1],
      backgroundColor: '#007bff',
      borderRadius: 5
    }, {
      label: 'Stored (TB)',
      data: [8.3, 10.1, 12.4, 14.8],
      backgroundColor: '#28a745',
      borderRadius: 5
    }]
  };

  volumeTrendOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Weekly Data Processing Volume'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Terabytes (TB)'
        }
      }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.generateTimeSeriesData();
  }

  private generateTimeSeriesData(): void {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      data.push({
        x: new Date(now.getTime() - i * 60 * 60 * 1000),
        y: Math.floor(Math.random() * 1000) + 500
      });
    }
    
    this.timeSeriesData.datasets![0].data = data;
  }

  exportData(format: 'csv' | 'json' | 'pdf'): void {
    // Mock export functionality
    const data = {
      timestamp: new Date().toISOString(),
      platform: this.currentCloud,
      analytics: {
        dataDistribution: this.pieChartData.datasets![0].data,
        processingVolume: this.volumeTrendData.datasets![0].data,
        insights: this.insights
      }
    };
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
      case 'csv':
        content = this.generateCSV(data);
        filename = 'analytics_report.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'analytics_report.json';
        mimeType = 'application/json';
        break;
      case 'pdf':
        alert('PDF export functionality would require additional libraries like jsPDF. This is a demo of the export feature.');
        return;
    }
    
    this.downloadFile(content, filename, mimeType);
  }

  private generateCSV(data: any): string {
    let csv = 'Metric,Value\n';
    csv += `Platform,${data.platform}\n`;
    csv += `Export Date,${data.timestamp}\n`;
    csv += `Total Insights,${data.analytics.insights.length}\n`;
    
    // Add insights
    data.analytics.insights.forEach((insight: any) => {
      csv += `${insight.title},"${insight.description}"\n`;
    });
    
    return csv;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}