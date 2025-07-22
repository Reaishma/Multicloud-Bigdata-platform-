import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  CloudPlatform, 
  ProcessingEngine, 
  CloudService, 
  ProcessingMetrics,
  StreamMetrics,
  CostAnalysis,
  JobStatus,
  DataSource,
  ClusterStatus,
  DataQualityMetrics
} from '../models/platform.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:8000/api';
  
  private currentCloudSubject = new BehaviorSubject<CloudPlatform>('aws');
  private currentEngineSubject = new BehaviorSubject<ProcessingEngine>('hadoop');
  private streamingSubject = new BehaviorSubject<boolean>(false);
  private streamMetricsSubject = new BehaviorSubject<StreamMetrics>({
    throughput: 0,
    latency: 0,
    totalEvents: 0
  });

  constructor(private http: HttpClient) {
    this.initializeStreamingUpdates();
  }

  // Cloud Platform Management
  getCurrentCloud(): Observable<CloudPlatform> {
    return this.currentCloudSubject.asObservable();
  }

  setCurrentCloud(cloud: CloudPlatform): void {
    this.currentCloudSubject.next(cloud);
  }

  // Processing Engine Management
  getCurrentEngine(): Observable<ProcessingEngine> {
    return this.currentEngineSubject.asObservable();
  }

  setCurrentEngine(engine: ProcessingEngine): void {
    this.currentEngineSubject.next(engine);
  }

  // Cloud Services
  getCloudServices(cloud: CloudPlatform): Observable<CloudService[]> {
    return this.http.get<CloudService[]>(`${this.baseUrl}/cloud-services/${cloud}`);
  }

  // Processing Metrics
  getProcessingMetrics(): Observable<ProcessingMetrics> {
    return this.http.get<ProcessingMetrics>(`${this.baseUrl}/processing-metrics`);
  }

  // Cost Analysis
  getCostAnalysis(cloud: CloudPlatform): Observable<CostAnalysis> {
    return this.http.get<CostAnalysis>(`${this.baseUrl}/cost-analysis/${cloud}`);
  }

  // Job Management
  startProcessingJob(dataSources: string[]): Observable<JobStatus> {
    return this.http.post<JobStatus>(`${this.baseUrl}/jobs/start`, { dataSources });
  }

  getJobStatus(): Observable<JobStatus> {
    return this.http.get<JobStatus>(`${this.baseUrl}/jobs/status`);
  }

  // Data Sources
  getDataSources(): Observable<DataSource[]> {
    return this.http.get<DataSource[]>(`${this.baseUrl}/data-sources`);
  }

  updateDataSource(id: string, enabled: boolean): Observable<DataSource> {
    return this.http.patch<DataSource>(`${this.baseUrl}/data-sources/${id}`, { enabled });
  }

  // Streaming Management
  isStreaming(): boolean {
    return this.streamingSubject.value;
  }

  toggleStreaming(): void {
    const newStatus = !this.streamingSubject.value;
    this.streamingSubject.next(newStatus);
    
    if (newStatus) {
      this.http.post(`${this.baseUrl}/streaming/start`, {}).subscribe();
    } else {
      this.http.post(`${this.baseUrl}/streaming/stop`, {}).subscribe();
    }
  }

  getStreamMetrics(): Observable<StreamMetrics> {
    return this.streamMetricsSubject.asObservable();
  }

  // Cluster Status
  getClusterStatus(cloud: CloudPlatform, engine: ProcessingEngine): Observable<ClusterStatus> {
    return this.http.get<ClusterStatus>(`${this.baseUrl}/cluster-status/${cloud}/${engine}`);
  }

  // Data Quality
  getDataQualityMetrics(): Observable<DataQualityMetrics> {
    return this.http.get<DataQualityMetrics>(`${this.baseUrl}/data-quality`);
  }

  // API Testing
  testApiEndpoint(url: string, method: string): Observable<any> {
    return this.http.request(method, `${this.baseUrl}/test-endpoint`, {
      body: { url, method }
    });
  }

  // Export Data
  exportData(format: 'csv' | 'json' | 'pdf'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/${format}`, { responseType: 'blob' });
  }

  // Analytics
  getTimeSeriesData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/analytics/time-series`);
  }

  getDataDistribution(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/analytics/distribution`);
  }

  getPlatformComparison(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/analytics/comparison`);
  }

  private initializeStreamingUpdates(): void {
    interval(1000).pipe(
      map(() => this.streamingSubject.value)
    ).subscribe(isStreaming => {
      if (isStreaming) {
        const metrics: StreamMetrics = {
          throughput: Math.floor(Math.random() * 1000) + 500,
          latency: Math.floor(Math.random() * 50) + 10,
          totalEvents: this.streamMetricsSubject.value.totalEvents + Math.floor(Math.random() * 100) + 50
        };
        this.streamMetricsSubject.next(metrics);
      }
    });
  }

  // Generate sample data when API is not available
  generateSampleData(): void {
    // This method provides fallback data for development
    console.log('Using sample data for development');
  }
}