Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Health check route
  get '/health', to: 'application#health'

  # API routes
  namespace :api do
    namespace :v1 do
      # Cloud platform routes
      resources :clouds, only: [:index] do
        collection do
          get :services
          get :status
          post :switch
          get :cost_analysis
        end
      end

      # Processing routes
      resources :processing, only: [] do
        collection do
          post :start_job
          get :job_status
          get :metrics
          get :recommendations
          post :stop_job
        end
      end

      # Data routes
      resources :data, only: [:index, :create] do
        collection do
          get :sources
          post :generate
          get :export
          post :validate
          get :lineage
        end
      end

      # Streaming routes
      resources :streaming, only: [] do
        collection do
          post :start
          post :stop
          get :status
          get :metrics
          get :events
        end
      end

      # Analytics routes
      resources :analytics, only: [] do
        collection do
          get :charts
          get :time_series
          get :comparison
          get :reports
          post :export
        end
      end

      # Governance routes
      resources :ggemrnance, only: [] do
        collection do
          get :quality_metrics
          post :test_api
          get :compliance
          get :audit_logs
        end
      end

      # Real-time WebSocket endpoint
      mount ActionCable.server => '/cable'
    end
  end

  # Root route
  root 'application#index'
end