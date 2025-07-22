class Api::V1::DataController < ApplicationController
  before_action :handle_options_request

  # GET /api/v1/data
  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 50
    data_type = params[:type] || 'all'

    # Simulate data retrieval
    data = generate_sample_data(data_type, per_page.to_i)
    
    render json: {
      data: data,
      pagination: {
        current_page: page.to_i,
        per_page: per_page.to_i,
        total_pages: 10,
        total_count: 500
      },
      metadata: {
        data_type: data_type,
        generated_at: Time.current
      }
    }
  end

  # POST /api/v1/data
  def create
    data_params = params.require(:data).permit(:type, :count, :format)
    
    generated_data = case data_params[:type]
    when 'ecommerce'
      generate_ecommerce_data(data_params[:count].to_i || 1000)
    when 'iot'
      generate_iot_data(data_params[:count].to_i || 1000)
    when 'financial'
      generate_financial_data(data_params[:count].to_i || 1000)
    when 'social'
      generate_social_data(data_params[:count].to_i || 1000)
    else
      generate_mixed_data(data_params[:count].to_i || 1000)
    end

    render json: {
      success: true,
      message: 'Data generated successfully',
      count: generated_data.length,
      type: data_params[:type],
      data: generated_data.first(10) # Return first 10 records as preview
    }
  end

  # GET /api/v1/data/sources
  def sources
    sources = [
      {
        id: 'ecommerce',
        name: 'E-commerce Transactions',
        description: '10k+ transaction records',
        status: 'active',
        last_updated: 1.hour.ago,
        record_count: rand(8000..12000)
      },
      {
        id: 'iot',
        name: 'IoT Sensor Data',
        description: 'Temperature, Humidity, Pressure sensors',
        status: 'active',
        last_updated: 5.minutes.ago,
        record_count: rand(15000..25000)
      },
      {
        id: 'logs',
        name: 'Web Server Logs',
        description: 'Apache/Nginx access logs',
        status: 'active',
        last_updated: 2.minutes.ago,
        record_count: rand(50000..100000)
      },
      {
        id: 'financial',
        name: 'Financial Market Data',
        description: 'Stock prices and trading volumes',
        status: 'active',
        last_updated: 30.seconds.ago,
        record_count: rand(5000..8000)
      },
      {
        id: 'social',
        name: 'Social Media Sentiment',
        description: 'Twitter, Facebook sentiment analysis',
        status: 'active',
        last_updated: 1.minute.ago,
        record_count: rand(20000..35000)
      }
    ]

    render json: { sources: sources }
  end

  # POST /api/v1/data/generate
  def generate
    data_type = params[:type]
    count = params[:count].to_i || 1000
    
    case data_type
    when 'ecommerce'
      data = generate_ecommerce_data(count)
    when 'iot'
      data = generate_iot_data(count)
    when 'financial'
      data = generate_financial_data(count)
    when 'social'
      data = generate_social_data(count)
    else
      data = generate_mixed_data(count)
    end

    render json: {
      success: true,
      type: data_type,
      count: data.length,
      sample: data.first(5)
    }
  end

  # GET /api/v1/data/export
  def export
    format = params[:format] || 'json'
    data_type = params[:type] || 'all'
    
    data = generate_sample_data(data_type, 1000)
    
    case format
    when 'csv'
      csv_data = generate_csv(data)
      send_data csv_data, filename: "export_#{data_type}_#{Date.current}.csv", type: 'text/csv'
    when 'json'
      send_data data.to_json, filename: "export_#{data_type}_#{Date.current}.json", type: 'application/json'
    else
      render json: { error: 'Unsupported format' }, status: :bad_request
    end
  end

  # POST /api/v1/data/validate
  def validate
    data = params[:data]
    validation_rules = params[:rules] || {}
    
    results = {
      total_records: data&.length || 0,
      valid_records: 0,
      invalid_records: 0,
      validation_errors: [],
      quality_score: 0
    }

    if data.present?
      results[:valid_records] = (data.length * 0.95).to_i
      results[:invalid_records] = data.length - results[:valid_records]
      results[:quality_score] = (results[:valid_records].to_f / data.length * 100).round(2)
    end

    render json: results
  end

  # GET /api/v1/data/lineage
  def lineage
    lineage_data = {
      nodes: [
        { id: 'sources', label: 'Data Sources', type: 'source', x: 50, y: 50 },
        { id: 'ingestion', label: 'Data Ingestion', type: 'process', x: 200, y: 50 },
        { id: 'raw_storage', label: 'Raw Storage', type: 'storage', x: 350, y: 30 },
        { id: 'processing', label: 'Data Processing', type: 'process', x: 350, y: 90 },
        { id: 'clean_storage', label: 'Clean Storage', type: 'storage', x: 500, y: 30 },
        { id: 'analytics', label: 'Analytics', type: 'process', x: 500, y: 90 },
        { id: 'reports', label: 'Reports', type: 'output', x: 650, y: 60 }
      ],
      links: [
        { source: 'sources', target: 'ingestion' },
        { source: 'ingestion', target: 'raw_storage' },
        { source: 'ingestion', target: 'processing' },
        { source: 'raw_storage', target: 'processing' },
        { source: 'processing', target: 'clean_storage' },
        { source: 'processing', target: 'analytics' },
        { source: 'clean_storage', target: 'analytics' },
        { source: 'analytics', target: 'reports' }
      ]
    }

    render json: lineage_data
  end

  private

  def generate_sample_data(type, count)
    case type
    when 'ecommerce'
      generate_ecommerce_data(count)
    when 'iot'
      generate_iot_data(count)
    when 'financial'
      generate_financial_data(count)
    when 'social'
      generate_social_data(count)
    else
      generate_mixed_data(count)
    end
  end

  def generate_ecommerce_data(count)
    products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones', 'Camera']
    
    Array.new(count) do |i|
      {
        id: i + 1,
        product: products.sample,
        amount: rand(50..1000),
        quantity: rand(1..5),
        customer_id: rand(1000..9999),
        timestamp: rand(30.days).seconds.ago,
        category: ['Electronics', 'Accessories'].sample
      }
    end
  end

  def generate_iot_data(count)
    Array.new(count) do |i|
      {
        device_id: "sensor_#{rand(1..100)}",
        temperature: rand(10.0..40.0).round(2),
        humidity: rand(20.0..80.0).round(2),
        pressure: rand(950.0..1050.0).round(2),
        timestamp: rand(7.days).seconds.ago,
        location: ['Building A', 'Building B', 'Warehouse'].sample
      }
    end
  end

  def generate_financial_data(count)
    symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']
    
    Array.new(count) do |i|
      base_price = rand(50.0..300.0)
      {
        symbol: symbols.sample,
        price: base_price.round(2),
        volume: rand(100000..1000000),
        change: (rand(-20.0..20.0)).round(2),
        timestamp: rand(24.hours).seconds.ago
      }
    end
  end

  def generate_social_data(count)
    platforms = ['Twitter', 'Facebook', 'Instagram', 'LinkedIn']
    sentiments = ['positive', 'negative', 'neutral']
    
    Array.new(count) do |i|
      {
        platform: platforms.sample,
        sentiment: sentiments.sample,
        score: rand(0.0..1.0).round(3),
        mentions: rand(1..1000),
        hashtags: rand(0..5),
        timestamp: rand(24.hours).seconds.ago
      }
    end
  end

  def generate_mixed_data(count)
    types = ['ecommerce', 'iot', 'financial', 'social']
    data = []
    
    types.each do |type|
      data += send("generate_#{type}_data", count / 4)
    end
    
    data.shuffle.first(count)
  end

  def generate_csv(data)
    return '' if data.empty?
    
    headers = data.first.keys
    CSV.generate do |csv|
      csv << headers
      data.each { |row| csv << headers.map { |h| row[h] } }
    end
  end
end