# Multi-Cloud Big Data Platform - Ruby on Rails API

This is the Ruby on Rails backend API for the Multi-Cloud Big Data Processing Platform. It provides comprehensive REST API endpoints for managing cloud platforms, data processing, streaming, analytics, and governance.

## 🚀 Features

- **Multi-Cloud Support**: AWS, GCP, and Azure integration
- **Real-time Processing**: Hadoop and Spark job management
- **Data Streaming**: Real-time data stream processing
- **Analytics & Reporting**: Comprehensive analytics with export capabilities
- **Data Governance**: Quality metrics, compliance, and audit logging
- **Background Jobs**: Sidekiq for asynchronous processing
- **WebSocket Support**: Real-time updates via Action Cable
- **API Testing**: Built-in endpoint testing functionality

## 📋 Prerequisites

- Ruby 3.2.0 or higher
- PostgreSQL 12+
- Redis 6+
- Bundler gem

## 🛠️ Installation

1. **Clone and navigate to the Rails backend**:
```bash
cd rails-backend
```

2. **Install dependencies**:
```bash
bundle install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up the database**:
```bash
rails db:create
rails db:migrate
```

5. **Start Redis** (required for caching and background jobs):
```bash
redis-server
```

6. **Start Sidekiq** (for background jobs):
```bash
bundle exec sidekiq
```

7. **Start the Rails server**:
```bash
rails server
```

The API will be available at: **http://localhost:3000**

## 📚 API Endpoints

### Cloud Management
- `GET /api/v1/clouds` - List available cloud platforms
- `GET /api/v1/clouds/services` - Get cloud services status
- `POST /api/v1/clouds/switch` - Switch cloud platform
- `GET /api/v1/clouds/cost_analysis` - Get cost analysis

### Data Processing
- `POST /api/v1/processing/start_job` - Start processing job
- `GET /api/v1/processing/job_status` - Get job status
- `GET /api/v1/processing/metrics` - Get processing metrics
- `GET /api/v1/processing/recommendations` - Get optimization recommendations

### Data Management
- `GET /api/v1/data` - List data with pagination
- `POST /api/v1/data` - Create/generate data
- `GET /api/v1/data/sources` - Get data sources
- `GET /api/v1/data/export` - Export data (CSV/JSON)
- `GET /api/v1/data/lineage` - Get data lineage

### Streaming
- `POST /api/v1/streaming/start` - Start data streaming
- `POST /api/v1/streaming/stop` - Stop data streaming
- `GET /api/v1/streaming/status` - Get streaming status
- `GET /api/v1/streaming/metrics` - Get streaming metrics

### Analytics
- `GET /api/v1/analytics/charts` - Get chart data
- `GET /api/v1/analytics/time_series` - Get time series data
- `GET /api/v1/analytics/comparison` - Get platform comparison
- `POST /api/v1/analytics/export` - Export analytics reports

### Governance
- `GET /api/v1/governance/quality_metrics` - Get data quality metrics
- `POST /api/v1/governance/test_api` - Test API endpoints
- `GET /api/v1/governance/compliance` - Get compliance status
- `GET /api/v1/governance/audit_logs` - Get audit logs

## 🏗️ Architecture

### Controllers
- **ApplicationController**: Base controller with CORS handling
- **CloudsController**: Multi-cloud platform management
- **ProcessingController**: Data processing job management
- **DataController**: Data operations and management
- **StreamingController**: Real-time streaming operations
- **AnalyticsController**: Analytics and reporting
- **GovernanceController**: Data governance and compliance

### Background Jobs
- **ProcessingJob**: Handles long-running data processing tasks
- **StreamingJob**: Manages real-time data streaming

### Key Features
- **CORS Support**: Configured for Angular frontend
- **Redis Caching**: For performance and session management
- **Sidekiq Integration**: Asynchronous job processing
- **Error Handling**: Comprehensive error responses
- **Data Generation**: Mock data generators for testing

## 🔧 Configuration

### Environment Variables
Key environment variables in `.env`:

```bash
DATABASE_URL=postgresql://username:password@localhost/bigdata_platform_development
REDIS_URL=redis://localhost:6379/0
RAILS_ENV=development
PORT=3000
SECRET_KEY_BASE=your_secret_key_base
```

### CORS Configuration
CORS is configured in `config/initializers/cors.rb` to allow requests from the Angular frontend running on `localhost:4200`.

### Database Configuration
PostgreSQL is configured in `config/database.yml` with separate configurations for development, test, and production environments.

## 🧪 Testing

Run the test suite:
```bash
bundle exec rspec
```

## 📊 Monitoring

### Health Check
- `GET /health` - API health status

### Logs
Logs are configured in `config/environments/` for each environment.

### Background Jobs
Monitor Sidekiq jobs at: `http://localhost:4567` (if Sidekiq web UI is enabled)

## 🚀 Deployment

### Production Setup
1. Set production environment variables
2. Run database migrations: `rails db:migrate RAILS_ENV=production`
3. Precompile assets if needed
4. Start with production server (Puma, Unicorn, etc.)

### Docker Support
The application is ready for containerization with Docker.

## 🔐 Security

- CORS properly configured
- Environment variables for sensitive data
- Input validation and sanitization
- Secure headers configuration

## 📈 Performance

- Redis caching for improved response times
- Background job processing with Sidekiq
- Database query optimization
- Efficient data serialization

## 🤝 Integration

This Rails API is designed to work seamlessly with the Angular frontend. The API provides all necessary endpoints for the dashboard functionality including:

- Real-time metrics and monitoring
- Multi-cloud platform switching
- Data processing job management
- Streaming data operations
- Analytics and reporting
- Data governance features

## 📝 API Documentation

The API follows RESTful conventions and returns JSON responses. All endpoints support proper HTTP status codes and error handling.

For detailed API documentation, you can use tools like Postman or generate documentation with gems like `rspec_api_documentation`.