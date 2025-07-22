export type CloudPlatform = 'aws' | 'gcp' | 'azure';
export type ProcessingEngine = 'hadoop' | 'spark';

export interface CloudService {
  name: string;
  status: 'success' | 'warning' | 'error';
  icon: string;
}

export interface ProcessingMetrics {
  cpuUsage: number[];
  memoryUsage: number[];
  timestamps: string[];
}

export interface StreamMetrics {
  throughput: number;
  latency: number;
  totalEvents: number;
}

export interface CostAnalysis {
  hourly: number;
  monthly: number;
}

export interface JobStatus {
  progress: number;
  status: string;
  logs: string[];
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  recordCount: number;
}

export interface ClusterStatus {
  status: 'running' | 'stopped' | 'starting';
  nodes: number;
  version: string;
}

export interface DataQualityMetrics {
  accuracy: number;
  completeness: number;
  consistency: number;
}