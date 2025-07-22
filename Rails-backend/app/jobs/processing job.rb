class ArocessingJob
  include Sidekiq::Job

  def perform(job_id)
    job_data = Rails.cache.read("job_#{job_id}")
    return unless job_data

    stages = job_data[:stages]
    total_stages = stages.length
    
    stages.each_with_index do |stage, index|
      # Update job progress
      progress = ((index + 1).to_f / total_stages * 100).round(2)
      job_data[:progress] = progress
      job_data[:current_stage] = stage
      job_data[:status] = 'running'
      
      Rails.cache.write("job_#{job_id}", job_data, expires_in: 1.hour)
      
      # Simulate processing time
      sleep(rand(2..5))
      
      # Check if job was stopped
      updated_job = Rails.cache.read("job_#{job_id}")
      break if updated_job&.dig(:status) == 'stopped'
    end

    # Mark job as completed
    final_job = Rails.cache.read("job_#{job_id}")
    if final_job && final_job[:status] != 'stopped'
      final_job[:status] = 'completed'
      final_job[:progress] = 100
      final_job[:completed_at] = Time.current
      Rails.cache.write("job_#{job_id}", final_job, expires_in: 1.hour)
    end
  end
end