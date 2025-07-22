class Api::V1::AnalyticsController < ApplicationController
  before_action :handle_options_request

  # GET /api/v1/analytics/charts
  def charts
    chart_type = params[:type] || 'all'
    
    charts = case chart_type
    when 'metrics'
      generate_metrics_chart
    when 'pie'
      generate_pie_chart
    when 'time_series'
      generate_time_series_chart
    when 'comparison'
      generate_comparison_chart
    else
      {
        metrics: generate_metrics_chart,
        pie: generate_pie_chart,
        time_series: generate_time_series_chart,
        comparison: generate_comparison_chart
      }
    end

    render json: {
      charts: charts,
      generated_at: Time.current
    }
  end

  # GET /api/v1/analytics/time_series
  def time_series
    period = params[:period] || '24h'
    metric = params[:metric] || 'events'
    
    data_points = case period
    when '1h'
      60
    when '24h'
      24
    when '7d'
      7
    when '30d'
      30
    else
      24
    end

    time_series_data = Array.new(data_points) do |i|
      time = case period
      when '1h'
        i.minutes.ago
      when '24h'
        i.hours.ago
      when '7d'
        i.days.ago
      when '30d'
        i.days.ago
      else
        i.hours.ago
      end

      {
        timestamp: time,
        value: rand(100..1000),
        aws: rand(80..300),
        gcp: rand(70..280),
        azure: rand(90..320)
      }
    end.reverse

    render json: {
      period: period,
      metric: metric,
      data: time_series_data,
      summary: {
        total: time_series_data.sum { |d| d[:value] },
        average: time_series_data.sum { |d| d[:value] } / time_series_data.length,
        peak: time_series_data.max_by { |d| d[:value] }[:value]
      }
    }
  end

  # GET /api/v1/analytics/comparison
  def comparison
    platforms = %w[aws gcp azure]
    metrics = %w[processing_speed cost_efficiency scalability reliability data_security global_availability]
    
    comparison_data = platforms.map do |platform|
      {
        platform: platform,
        scores: metrics.map { |metric| rand(70..100) },
        overall_score: rand(75..95)
      }
    end

    render json: {
      metrics: metrics,
      platforms: comparison_data,
      generated_at: Time.current
    }
  end

  # GET /api/v1/analytics/reports
  def reports
    report_type = params[:type] || 'summary'
    
    reports = case report_type
    when 'summary'
      generate_summary_report
    when 'performance'
      generate_performance_report
    when 'cost'
      generate_cost_report
    when 'usage'
      generate_usage_report
    else
      {
        summary: generate_summary_report,
        performance: generate_performance_report,
        cost: generate_cost_report,
        usage: generate_usage_report
      }
    end

    render json: {
      reports: reports,
      generated_at: Time.current
    }
  end

  # POST /api/v1/analytics/export
  def export
    format = params[:format] || 'json'
    report_type = params[:report_type] || 'summary'
    
    data = case report_type
    when 'summary'
      generate_summary_report
    when 'performance'
      generate_performance_report
    when 'cost'
      generate_cost_report
    else
      generate_summary_report
    end

    case format
    when 'csv'
      csv_data = generate_report_csv(data)
      send_data csv_data, filename: "analytics_#{report_type}_#{Date.current}.csv", type: 'text/csv'
    when 'json'
      send_data data.to_json, filename: "analytics_#{report_type}_#{Date.current}.json", type: 'application/json'
    when 'pdf'
      # In a real implementation, you would use a PDF generation library
      render json: { 
        message: 'PDF export would be implemented with a library like Prawn',
        data: data 
      }
    else
      render json: { error: 'Unsupported format' }, status: :bad_request
    end
  end

  private

  def generate_metrics_chart
    {
      type: 'line',
      labels: Array.new(6) { |i| "#{i+1}h" },
      datasets: [
        {
          label: 'CPU Usage (%)',
          data: Array.new(6) { rand(40..90) },
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)'
        },
        {
          label: 'Memory Usage (%)',
          data: Array.new(6) { rand(30..80) },
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)'
        }
      ]
    }
  end

  def generate_pie_chart
    {
      type: 'pie',
      labels: ['E-commerce', 'IoT', 'Logs', 'Financial', 'Social'],
      datasets: [{
        data: [35, 25, 15, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }]
    }
  end

  def generate_time_series_chart
    data_points = Array.new(24) do |i|
      {
        x: i.hours.ago,
        y: rand(500..1500)
      }
    end.reverse

    {
      type: 'line',
      datasets: [{
        label: 'Processing Volume (Events/Hour)',
        data: data_points,
        borderColor: '#6f42c1',
        backgroundColor: 'rgba(111, 66, 193, 0.1)'
      }]
    }
  end

  def generate_comparison_chart
    {
      type: 'radar',
      labels: ['Processing Speed', 'Cost Efficiency', 'Scalability', 'Reliability', 'Data Security', 'Global Availability'],
      datasets: [
        {
          label: 'AWS',
          data: [85, 78, 92, 88, 95, 98],
          backgroundColor: 'rgba(255, 153, 0, 0.2)',
          borderColor: '#FF9900'
        },
        {
          label: 'GCP',
          data: [82, 85, 88, 85, 92, 95],
          backgroundColor: 'rgba(66, 133, 244, 0.2)',
          borderColor: '#4285F4'
        },
        {
          label: 'Azure',
          data: [80, 82, 85, 90, 88, 96],
          backgroundColor: 'rgba(0, 120, 212, 0.2)',
          borderColor: '#0078D4'
        }
      ]
    }
  end

  def generate_summary_report
    {
      title: 'Platform Summary Report',
      period: '24 hours',
      metrics: {
        total_events_processed: rand(100000..500000),
        active_jobs: rand(10..50),
        completed_jobs: rand(100..300),
        failed_jobs: rand(0..5),
        average_processing_time: "#{rand(2..10)} minutes",
        data_processed_gb: rand(1000..5000),
        cost_today: rand(200..800)
      },
      top_data_sources: [
        { name: 'IoT Sensors', percentage: 35 },
        { name: 'E-commerce', percentage: 28 },
        { name: 'Social Media', percentage: 20 },
        { name: 'Financial', percentage: 17 }
      ]
    }
  end

  def generate_performance_report
    {
      title: 'Performance Analysis Report',
      period: '7 days',
      metrics: {
        average_cpu_usage: "#{rand(50..80)}%",
        average_memory_usage: "#{rand(40..70)}%",
        peak_throughput: "#{rand(2000..5000)} events/sec",
        average_latency: "#{rand(50..200)}ms",
        uptime: "#{rand(98.0..99.9).round(2)}%"
      },
      recommendations: [
        'Consider scaling up during peak hours',
        'Optimize memory allocation for Spark jobs',
        'Enable auto-scaling for cost efficiency'
      ]
    }
  end

  def generate_cost_report
    {
      title: 'Cost Analysis Report',
      period: '30 days',
      total_cost: rand(15000..25000),
      breakdown: {
        compute: rand(8000..12000),
        storage: rand(2000..4000),
        networking: rand(1000..2000),
        other: rand(500..1500)
      },
      trends: {
        vs_last_month: "#{rand(-10..15)}%",
        projected_next_month: rand(16000..26000)
      }
    }
  end

  def generate_usage_report
    {
      title: 'Usage Statistics Report',
      period: '30 days',
      metrics: {
        total_api_calls: rand(1000000..5000000),
        unique_users: rand(100..500),
        data_sources_accessed: rand(50..200),
        export_requests: rand(500..2000)
      }
    }
  end

  def generate_report_csv(data)
    CSV.generate do |csv|
      csv << ['Metric', 'Value']
      flatten_hash(data).each { |key, value| csv << [key, value] }
    end
  end

  def flatten_hash(hash, parent_key = '', sep = '_')
    hash.each_with_object({}) do |(k, v), h|
      new_key = parent_key.empty? ? k : "#{parent_key}#{sep}#{k}"
      if v.is_a?(Hash)
        h.merge!(flatten_hash(v, new_key, sep))
      else
        h[new_key] = v
      end
    end
  end
end