# Multi-Cloud Big Data Processing Platform

A comprehensive Angular frontend and Laravel , Ruby on rails dual backend application for managing big data workflows across AWS, GCP, and Azure cloud platforms with Hadoop and Spark processing engines. It provides comprehensive REST API endpoints for managing cloud platforms, data processing, streaming, analytics, and governance

![Real-time data](https://github.com/Reaishma/Multicloud-Bigdata-platform-/blob/main/Screenshot_20250903-194212_1.jpg)

## 🚀 Live Demo 

**View live demo on** https://reaishma.github.io/Multicloud-Bigdata-platform-/


## 🚀 Features

### Frontend (Angular)
- **Multi-Cloud Support**: Switch between AWS, GCP, and Azure platforms
- **Processing Engines**: Hadoop MapReduce and Apache Spark integration
- **Real-time Dashboard**: Live metrics, streaming data, and job monitoring
- **Interactive Visualizations**: Charts and graphs using Chart.js
- **Data Management**: Configure data sources and monitor processing jobs
- **Analytics & Reports**: Export capabilities (CSV, JSON, PDF)
- **Data Governance**: Quality metrics, lineage,audit logging and compliance tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices -**Background Jobs**: Sidekiq for asynchronous processing
- **WebSocket Support**: Real-time updates via Action Cable
- **API Testing**: Built-in endpoint testing functionality
   
### Backend (Laravel)
- **RESTful API**: Comprehensive endpoints for all platform operations
- **Cloud Platform Management**: Service status and cost analysis
- **Data Processing**: Job management and monitoring
- **Real-time Streaming**: Start/stop streaming with metrics
- **Analytics Engine**: Time series data and insights generation
- **Data Governance**: Quality metrics and compliance tracking
- **CORS Support**: Cross-origin requests enabled for frontend integration

## 🔄 Ruby on Rails Backend Alternative

I've also created a complete **Ruby on Rails backend** as an alternative to the Laravel backend. Both backends provide identical functionality:

### Rails Backend Features
- **Complete REST API** with all endpoints
- **Background Jobs** with Sidekiq for processing
- **Real-time WebSocket** support via Action Cable  
- **Redis Caching** for performance optimization
- **PostgreSQL Database** with proper migrations
- **CORS Configuration** for Angular frontend
- **Comprehensive Error Handling** and validation
- **Mock Data Generators** for testing
- **Production-Ready Configuration**

## 🏗️  Ruby on rails Architecture

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

## Covered Skills

### *Cloud Platforms and Services:*

1. *AWS:* EMR, S3, Redshift, Kinesis, Lambda
2. *GCP:* Dataproc, BigQuery, Cloud Storage, Pub/Sub, Cloud Functions
3. *Azure:* HDInsight, Data Lake, Synapse Analytics, Event Hubs, Azure Functions

### **project demonstrates expertise**

1. *Big Data Processing:* Hadoop, MapReduce, Apache Spark
2. *Cloud Computing:* AWS, GCP, Azure
3. *Data Analytics:* Real-time streaming analytics, batch processing, data visualization
4. *Data Governance:* Data lineage, data quality, API endpoint testing


## 🏗️ Architecture

### Frontend Stack
- Angular 17
- TypeScript
- Angular Material
- Chart.js with ng2-charts
- RxJS for reactive programming
- SCSS for styling

### Backend Stack
- Laravel 10
- PHP 8.1+
- RESTful API design
- Cache-based job tracking
- CORS middleware for API access
- Ruby 3.2.0 or higher
- PostgreSQL 12+
- Redis 6+
- Bundler gem

## 📋 Prerequisites

### Frontend Requirements
- Node.js 18+
- npm or yarn
- Angular CLI

### Backend Requirements
- PHP 8.1+
- Composer
- MySQL/PostgreSQL (optional for extended features)
- Ruby 3.2.0 or higher
- PostgreSQL 12+
- Redis 6+
- Bundler gem

## 🚀 How to Open and Run the Application

### Frontend (Angular) Setup
Open the project in your preferred IDE (VS Code, WebStorm, etc.)

**Install dependencies**


```npm install```

**Start the Angular development server**

```npm start```

The Angular frontend will be available at: http://localhost:4200

### Backend (Laravel) Setup

**Navigate to the backend directory**

```cd backend```

**Install PHP dependencies**

```composer install```


**Set up environment**


```cp .env.example .env```
```php artisan key:generate```



**Start the Laravel API server**

```php artisan serve```

The Laravel API will be available at: http://localhost:8000

### Quick Start - Rails Backend

```bash
# Navigate to Rails backend
cd rails-backend

# Install dependencies
bundle install

# Setup environment
cp .env.example .env

# Setup database
rails db:create db:migrate

# Start Redis (required)
redis-server

# Start background jobs
bundle exec sidekiq

# Start Rails API server
rails server
```

**Rails API available at: http://localhost:3000**


## 📁 Project Structure

```
multi-cloud-bigdata-platform/
├── src/                          # Angular frontend
│   ├── app/
│   │   ├── components/          # UI components
│   │   ├── services/           # Data services
│   │   └── models/             # TypeScript models
│   ├── styles.scss             # Global styles
│   └── index.html              # Main HTML
├── backend/                     # Laravel API
│   ├── app/Http/Controllers/   # API controllers
│   ├── routes/api.php          # API routes
│   └── .env.example           # Environment config
├── package.json               # Angular dependencies
├── angular.json              # Angular configuration
└── README.md, Rails backend                # Documentation, backend 
```

## 🎯 Key Features Available

- Multi-Cloud Dashboard: Switch between AWS, GCP, and Azure
- Real-time Processing: Hadoop and Spark integration
- Interactive Charts: Live metrics and analytics
- Data Streaming: Real-time data flow monitoring
- Export Functionality: CSV, JSON, PDF reports
- API Testing: Built-in endpoint testing
Responsive Design: Works on all

## 🔧 Development Commands

**Frontend**

```npm start```

 - **Start development server**

```npm run build```

 - **Build for production**

```npm test``` 

- **Run tests Backend**

```php artisan serve``` 
- **Start API server**

```php artisan route:list``` 

- **View all API routes**

```composer install```

 - **Install dependencies**


The application is now fully functional with both frontend and backend running. It can be  access the dashboard at localhost:4200 and it will communicate with the Laravel API at localhost:8000.

## 🛠️ Installation & Setup

### Frontend Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Install Angular Material and dependencies**:
```bash
ng add @angular/material
npm install chart.js ng2-charts chartjs-adapter-date-fns
```

3. **Start development server**:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Backend Setup

### Larvel backend 

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install PHP dependencies**:
```bash
composer install
```

3. **Environment configuration**:
```bash
cp .env.example .env
php artisan key:generate
```

4. **Start Laravel development server**:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Ruby on rails backend 

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

The API will be available at: `http://localhost:3000`

## 🔧 Configuration

### Environment Variables (.env)
```env
# Application
APP_NAME="Big Data Multi-Cloud Platform"
APP_URL=http://localhost:8000

# Database (optional)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bigdata_platform

# Cloud Platform Credentials
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
GOOGLE_CLOUD_PROJECT_ID=your_gcp_project
AZURE_CLIENT_ID=your_azure_client
```
### Environment Variables for Ruby on rails 

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

## API Endpoints

### Cloud Management
- `GET /api/cloud-services/{platform}` - Get cloud services status
- `GET /api/cost-analysis/{platform}` - Get cost analysis
- `GET /api/cluster-status/{platform}/{engine}` - Get cluster status

### Data Processing
- `GET /api/processing-metrics` - Get processing metrics
- `POST /api/jobs/start` - Start processing job
- `GET /api/jobs/status` - Get job status

### Data Sources
- `GET /api/data-sources` - Get all data sources
- `PATCH /api/data-sources/{id}` - Update data source
- `GET /api/data-sources/{id}/sample` - Get sample data

### Streaming
- `POST /api/streaming/start` - Start streaming
- `POST /api/streaming/stop` - Stop streaming
- `GET /api/streaming/metrics` - Get streaming metrics

### Analytics
- `GET /api/analytics/time-series` - Get time series data
- `GET /api/analytics/distribution` - Get data distribution
- `GET /api/analytics/comparison` - Get platform comparison
- `GET /api/export/{format}` - Export data (csv, json, pdf)

### Governance
- `GET /api/data-quality` - Get data quality metrics
- `GET /api/data-lineage` - Get data lineage
- `GET /api/compliance-status` - Get compliance status
- `POST /api/test-endpoint` - Test API endpoint

## 📚  Ruby on rails API Endpoints

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



### Backend Options Summary

| Feature | Laravel Backend | Rails Backend |
|---------|----------------|---------------|
| **Language** | PHP 8.1+ | Ruby 3.2+ |
| **Database** | MySQL/PostgreSQL | PostgreSQL |
| **Caching** | Redis | Redis |
| **Background Jobs** | Laravel Queues | Sidekiq |
| **WebSockets** | Laravel Echo | Action Cable |
| **API Framework** | Laravel API | Rails API |
| **Testing** | PHPUnit | RSpec |



## 🎯 Usage

![data processing](https://github.com/Reaishma/Multicloud-Bigdata-platform-/blob/main/Screenshot_20250903-194323_1.jpg)

### Dashboard Navigation
1. **Overview Tab**: View cloud services status, processing metrics, and cost analysis
2. **Data Processing Tab**: Configure data sources and start processing jobs
3. **Real-time Streaming Tab**: Monitor live data streams and metrics
4. **Analytics & Reports Tab**: View analytics insights and export reports
5. **Data Governance Tab**: Monitor data quality, lineage, and compliance

### Cloud Platform Switching
- Click on AWS, GCP, or Azure buttons to switch between cloud platforms
- Each platform shows specific services and configurations

### Processing Engine Selection
- Toggle between Hadoop MapReduce and Apache Spark
- Get engine-specific recommendations and configurations

### Real-time Monitoring
- Start/stop streaming data
- View live metrics and throughput
- Monitor job progress in real-time

## 📊 Sample Data

The application includes comprehensive sample data generators for:
- E-commerce transactions
- IoT sensor readings
- Web server logs
- Financial market data
- Social media sentiment data

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


## 🔒 Security Features

- CORS middleware for secure cross-origin requests
- Data encryption recommendations
- Access control monitoring
- Compliance tracking (GDPR, data retention)
- API endpoint testing functionality
- CORS properly configured
- Environment variables for sensitive data
- Input validation and sanitization
- Secure headers configuration

## 🚀 Deployment

### Frontend Deployment
```bash
ng build --configuration production
```

### Backend Deployment
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
### Production Setup
1. Set production environment variables
2. Run database migrations: `rails db:migrate RAILS_ENV=production`
3. Precompile assets if needed
4. Start with production server (Puma, Unicorn, etc.)

### Docker Support
The application is ready for containerization with Docker.

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

## 🧑‍💻 Developer 
 
**Reaishma N**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository


## 🔄 Version History

- **v1.0.0** - Initial release with full multi-cloud support
- Complete Angular frontend with Material Design
- Comprehensive Laravel API and Ruby on rails API backend
- Real-time streaming capabilities
- Analytics and governance features

---

**Built with ❤️ for Big Data Processing**




