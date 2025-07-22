metricsssssStreamingJob
  include Sidekiq::Job

  def perform(stream_id)
    stream_config = Rails.cache.read("stream_#{stream_id}")
    return unless stream_config

    while stream_config[:status] == 'active'
      # Generate streaming metrics
      throughput = rand(500..2000)
      latency = rand(10..100)
      
      stream_config[:throughput] = throughput
      stream_config[:latency] = latency
      stream_config[:total_events] += throughput
      stream_config[:last_updated] = Time.current
      
      Rails.cache.write("stream_#{stream_id}", stream_config, expires_in: 2.hours)
      
      # Broadcast to WebSocket if needed
      ActionCable.server.broadcast("streaming_#{stream_id}", {
        throughput: throughput,
        latency: latency,
        total_events: stream_config[:total_events],
        timestamp: Time.current
      })
      
      sleep(1)
      
      # Refresh stream config to check if still active
      stream_config = Rails.cache.read("stream_#{stream_id}")
      break unless stream_config
    end
  end
end