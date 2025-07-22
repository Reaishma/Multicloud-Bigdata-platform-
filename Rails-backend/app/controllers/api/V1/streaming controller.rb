class Api::V1::StreamingController < ApplicationController
  before_action :handle_options_request

  # POST /api/v1/streaming/start
  def start
    stream_id = SecureRandom.uuid
    
    stream_config = {
      id: stream_id,
      status: 'active',
      started_at: Time.current,
      throughput: 0,
      total_events: 0,
      latency: 0,
      source_type: params[:source_type] || 'mixed'
    }

    Rails.cache.write("stream_#{stream_id}", stream_config, expires_in: 2.hours)
    
    # Start streaming job
    StreamingJob.perform_async(stream_id)

    render json: {
      success: true,
      stream_id: stream_id,
      message: 'Streaming started successfully',
      config: stream_config
    }
  end

  # POST /api/v1/streaming/stop
  def stop
    stream_id = params[:stream_id]
    
    stream_config = Rails.cache.read("stream_#{stream_id}")
    if stream_config
      stream_config[:status] = 'stopped'
      stream_config[:stopped_at] = Time.current
      Rails.cache.write("stream_#{stream_id}", stream_config, expires_in: 1.hour)
      
      render json: {
        success: true,
        message: 'Streaming stopped successfully',
        stream_id: stream_id,
        duration: Time.current - stream_config[:started_at]
      }
    else
      render json: { error: 'Stream not found' }, status: :not_found
    end
  end

  # GET /api/v1/streaming/status
  def status
    stream_id = params[:stream_id]
    
    if stream_id
      stream_config = Rails.cache.read("stream_#{stream_id}")
      if stream_config
        render json: stream_config
      else
        render json: { error: 'Stream not found' }, status: :not_found
      end
    else
      # Return all active streams
      active_streams = Rails.cache.redis.keys('stream_*').map do |key|
        Rails.cache.read(key)
      end.compact

      render json: { active_streams: active_streams }
    end
  end

  # GET /api/v1/streaming/metrics
  def metrics
    stream_id = params[:stream_id]
    
    if stream_id
      stream_config = Rails.cache.read("stream_#{stream_id}")
      return render json: { error: 'Stream not found' }, status: :not_found unless stream_config
    end

    # Generate real-time metrics
    metrics = {
      throughput: rand(500..2000),
      latency: rand(10..100),
      total_events: rand(10000..50000),
      error_rate: rand(0.0..2.0).round(2),
      cpu_usage: rand(30..80),
      memory_usage: rand(40..90),
      network_io: rand(100..500),
      active_connections: rand(50..200)
    }

    # Update stream config if specific stream
    if stream_id && stream_config
      stream_config.merge!(metrics)
      Rails.cache.write("stream_#{stream_id}", stream_config, expires_in: 2.hours)
    end

    render json: {
      stream_id: stream_id,
      metrics: metrics,
      timestamp: Time.current
    }
  end

  # GET /api/v1/streaming/events
  def events
    count = params[:count]&.to_i || 10
    event_type = params[:type] || 'mixed'
    
    events = Array.new(count) do
      case event_type
      when 'ecommerce'
        generate_ecommerce_event
      when 'iot'
        generate_iot_event
      when 'financial'
        generate_financial_event
      when 'social'
        generate_social_event
      else
        generate_mixed_event
      end
    end

    render json: {
      events: events,
      count: events.length,
      type: event_type,
      timestamp: Time.current
    }
  end

  private

  def generate_ecommerce_event
    {
      type: 'ecommerce',
      event_id: SecureRandom.uuid,
      product_id: rand(1000..9999),
      amount: rand(10.0..500.0).round(2),
      customer_id: rand(10000..99999),
      timestamp: Time.current,
      metadata: {
        category: ['Electronics', 'Clothing', 'Books'].sample,
        payment_method: ['Credit Card', 'PayPal', 'Bank Transfer'].sample
      }
    }
  end

  def generate_iot_event
    {
      type: 'iot',
      event_id: SecureRandom.uuid,
      device_id: "sensor_#{rand(1..100)}",
      readings: {
        temperature: rand(15.0..35.0).round(2),
        humidity: rand(30.0..70.0).round(2),
        pressure: rand(980.0..1020.0).round(2)
      },
      timestamp: Time.current,
      metadata: {
        location: "Building #{['A', 'B', 'C'].sample}",
        floor: rand(1..10)
      }
    }
  end

  def generate_financial_event
    symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']
    
    {
      type: 'financial',
      event_id: SecureRandom.uuid,
      symbol: symbols.sample,
      price: rand(50.0..300.0).round(2),
      volume: rand(1000..10000),
      change: rand(-5.0..5.0).round(2),
      timestamp: Time.current,
      metadata: {
        market: 'NASDAQ',
        session: 'regular'
      }
    }
  end

  def generate_social_event
    {
      type: 'social',
      event_id: SecureRandom.uuid,
      platform: ['Twitter', 'Facebook', 'Instagram'].sample,
      sentiment: ['positive', 'negative', 'neutral'].sample,
      score: rand(0.0..1.0).round(3),
      timestamp: Time.current,
      metadata: {
        language: 'en',
        region: ['US', 'EU', 'APAC'].sample
      }
    }
  end

  def generate_mixed_event
    event_types = ['ecommerce', 'iot', 'financial', 'social']
    send("generate_#{event_types.sample}_event")
  end
end