class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :set_cors_headers
  
  # Health check endpoint
  def health
    render json: { 
      status: 'ok', 
      timestamp: Time.current,
      version: '1.0.0',
      environment: Rails.env
    }
  end

  # Root endpoint
  def index
    render json: {
      message: 'Multi-Cloud Big Data Processing Platform API',
      version: '1.0.0',
      endpoints: {
        clouds: '/api/v1/clouds',
        processing: '/api/v1/processing',
        data: '/api/v1/data',
        streaming: '/api/v1/streaming',
        analytics: '/api/v1/analytics',
        governance: '/api/v1/governance'
      }
    }
  end

  private

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    response.headers['Access-Control-Max-Age'] = '1728000'
  end

  def handle_options_request
    head :ok if request.request_method == 'OPTIONS'
  end
end