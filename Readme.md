# Multi-Cloud Big Data Processing Platform

A comprehensive Angular frontend and Laravel , Ruby on rails dual backend application for managing big data workflows across AWS, GCP, and Azure cloud platforms with Hadoop and Spark processing engines. It provides comprehensive REST API endpoints for managing cloud platforms, data processing, streaming, analytics, and governance

## 🚀 Live Demo 

[View live demo](https://reaishma.github.io/Multicloud-Bigdata-platform-/)


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

## Backend (Ruby on rails)Setup

**Clone and navigate to the Rails backend**

```cd rails-backend```

**Install dependencies**

```bundle install```

**Set up environment variables**

```cp .env.example .env```

 **Edit .env with your configuration**

**Set up the database**

```rails db:create```

```rails db:migrate```

**Start Redis (required for caching and background jobs)**

```redis-server```

**Start Sidekiq (for background jobs)**

```bundle exec sidekiq```

**Start the Rails server**

```rails server```

The API will be available at: http://localhost:3000

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
└── README.md                 # Documentation
```

## 🎯 Key Features Available
Multi-Cloud Dashboard: Switch between AWS, GCP, and Azure
Real-time Processing: Hadoop and Spark integration
Interactive Charts: Live metrics and analytics
Data Streaming: Real-time data flow monitoring
Export Functionality: CSV, JSON, PDF reports
API Testing: Built-in endpoint testing
Responsive Design: Works on all

## 🔧 Development Commands
Frontend:

```npm start``` - Start development server
```npm run build``` - Build for production
```npm test``` - Run tests
Backend:

```php artisan serve``` - Start API server
```php artisan route:list``` - View all API routes
```composer install``` - Install dependencies


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

### API Endpoints

#### Cloud Management
- `GET /api/cloud-services/{platform}` - Get cloud services status
- `GET /api/cost-analysis/{platform}` - Get cost analysis
- `GET /api/cluster-status/{platform}/{engine}` - Get cluster status

#### Data Processing
- `GET /api/processing-metrics` - Get processing metrics
- `POST /api/jobs/start` - Start processing job
- `GET /api/jobs/status` - Get job status

#### Data Sources
- `GET /api/data-sources` - Get all data sources
- `PATCH /api/data-sources/{id}` - Update data source
- `GET /api/data-sources/{id}/sample` - Get sample data

#### Streaming
- `POST /api/streaming/start` - Start streaming
- `POST /api/streaming/stop` - Stop streaming
- `GET /api/streaming/metrics` - Get streaming metrics

#### Analytics
- `GET /api/analytics/time-series` - Get time series data
- `GET /api/analytics/distribution` - Get data distribution
- `GET /api/analytics/comparison` - Get platform comparison
- `GET /api/export/{format}` - Export data (csv, json, pdf)

#### Governance
- `GET /api/data-quality` - Get data quality metrics
- `GET /api/data-lineage` - Get data lineage
- `GET /api/compliance-status` - Get compliance status
- `POST /api/test-endpoint` - Test API endpoint


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

## 🔒 Security Features

- CORS middleware for secure cross-origin requests
- Data encryption recommendations
- Access control monitoring
- Compliance tracking (GDPR, data retention)
- API endpoint testing functionality

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
- Check the documentation in the `/docs` folder
- Review API endpoint documentation in the code comments

## 🔄 Version History

- **v1.0.0** - Initial release with full multi-cloud support
- Complete Angular frontend with Material Design
- Comprehensive Laravel API backend
- Real-time streaming capabilities
- Analytics and governance features

---

**Built with ❤️ for Big Data Processing**




