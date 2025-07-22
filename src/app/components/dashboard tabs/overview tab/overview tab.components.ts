        }
      }
    }

    .pipeline-flow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      margin: 15px 0;
      flex-wrap: wrap;
      gap: 15px;
    }

    .pipeline-step {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
      flex: 1;
      margin: 0 5px;
      text-align: center;
      min-width: 120px;

      i {
        font-size: 1.5rem;
        color: #007bff;
        margin-bottom: 8px;
      }

      div {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .pipeline-arrow {
      font-size: 1.5rem;
      color: #007bff;
      font-weight: bold;
    }

    .chart-container {
      height: 300px;
      position: relative;
    }

    @media (max-width: 768px) {
      .pipeline-flow {
        flex-direction: column;
      }
      
      .pipeline-step {
        margin: 0;
        width: 100%;
        max-width: none;
      }
      
      .pipeline-arrow {
        transform: rotate(90deg);
        font-size: 1.2rem;
      }
    }
  `]
})
export class OverviewTabComponent implements OnInit, OnDestroy {
  @Input() currentCloud: CloudPlatform = 'aws';
  @Input() currentEngine: ProcessingEngine = 'hadoop';

  cloudServices: CloudService[] = [];
  costAnalysis: CostAnalysis = { hourly: 24.50, monthly: 17640 };
  private subscriptions = new Subscription();

  // Chart configuration
  metricsChartType: ChartType = 'line';
  metricsChartData: ChartConfiguration['data'] = {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [65, 72, 58, 83, 69, 75],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true
      },
      {
        label: 'Memory Usage (%)',
        data: [45, 52, 48, 63, 59, 65],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true
      }
    ]
  };

  metricsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadCloudServices();
    this.loadCostAnalysis();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadCloudServices(): void {
    // Mock data for services based on cloud platform
    const services = {
      aws: [
        { name: 'EMR', status: 'success' as const, icon: 'fas fa-server' },
        { name: 'S3', status: 'success' as const, icon: 'fas fa-database' },
        { name: 'Redshift', status: 'success' as const, icon: 'fas fa-warehouse' },
        { name: 'Kinesis', status: 'warning' as const, icon: 'fas fa-stream' },
        { name: 'Lambda', status: 'success' as const, icon: 'fas fa-bolt' }
      ],
      gcp: [
        { name: 'Dataproc', status: 'success' as const, icon: 'fas fa-server' },
        { name: 'BigQuery', status: 'success' as const, icon: 'fas fa-database' },
        { name: 'Cloud Storage', status: 'success' as const, icon: 'fas fa-cloud' },
{ name: 'Pub/Sub', status: 'success' as const, icon: 'fas fa-stream' },
        { name: 'Cloud Functions', status: 'warning' as const, icon: 'fas fa-bolt' }
      ],
      azure: [
        { name: 'HDInsight', status: 'success' as const, icon: 'fas fa-server' },
        { name: 'Data Lake', status: 'success' as const, icon: 'fas fa-water' },
        { name: 'Synapse Analytics', status: 'success' as const, icon: 'fas fa-chart-line' },
        { name: 'Event Hubs', status: 'success' as const, icon: 'fas fa-stream' },
        { name: 'Azure Functions', status: 'success' as const, icon: 'fas fa-bolt' }
      ]
    };

    this.cloudServices = services[this.currentCloud];
  }

  private loadCostAnalysis(): void {
    const costs = {
      aws: { hourly: 24.50, monthly: 17640 },
      gcp: { hourly: 22.80, monthly: 16416 },
      azure: { hourly: 26.20, monthly: 18864 }
    };

    this.costAnalysis = costs[this.currentCloud];
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'success': return 'fas fa-check-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'error': return 'fas fa-times-circle';
      default: return 'fas fa-question-circle';
    }
  }
}