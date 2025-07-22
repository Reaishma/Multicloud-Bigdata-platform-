<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CloudController;
use App\Http\Controllers\ProcessingController;
use App\Http\Controllers\StreamingController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\GovernanceController;
use App\Http\Controllers\DataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    // Cloud Platform Management
    Route::get('/cloud-services/{platform}', [CloudController::class, 'getServices']);
    Route::get('/cost-analysis/{platform}', [CloudController::class, 'getCostAnalysis']);
    Route::get('/cluster-status/{platform}/{engine}', [CloudController::class, 'getClusterStatus']);
    
    // Data Processing
    Route::get('/processing-metrics', [ProcessingController::class, 'getMetrics']);
    Route::post('/jobs/start', [ProcessingController::class, 'startJob']);
    Route::get('/jobs/status', [ProcessingController::class, 'getJobStatus']);
    Route::get('/jobs/{id}', [ProcessingController::class, 'getJobDetails']);
    
    // Data Sources
    Route::get('/data-sources', [DataController::class, 'getDataSources']);
    Route::patch('/data-sources/{id}', [DataController::class, 'updateDataSource']);
    Route::get('/data-sources/{id}/sample', [DataController::class, 'getSampleData']);
    
    // Real-time Streaming
    Route::post('/streaming/start', [StreamingController::class, 'start']);
    Route::post('/streaming/stop', [StreamingController::class, 'stop']);
    Route::get('/streaming/metrics', [StreamingController::class, 'getMetrics']);
    Route::get('/streaming/status', [StreamingController::class, 'getStatus']);
    
    // Analytics and Reports
    Route::get('/analytics/time-series', [AnalyticsController::class, 'getTimeSeriesData']);
    Route::get('/analytics/distribution', [AnalyticsController::class, 'getDataDistribution']);
    Route::get('/analytics/comparison', [AnalyticsController::class, 'getPlatformComparison']);
    Route::get('/analytics/insights', [AnalyticsController::class, 'getInsights']);
    
    // Data Governance
    Route::get('/data-quality', [GovernanceController::class, 'getQualityMetrics']);
    Route::get('/data-lineage', [GovernanceController::class, 'getDataLineage']);
    Route::get('/compliance-status', [GovernanceController::class, 'getComplianceStatus']);
    Route::get('/data-catalog', [GovernanceController::class, 'getDataCatalog']);
    
    // API Testing
    Route::post('/test-endpoint', [GovernanceController::class, 'testEndpoint']);
    
    // Export functionality
    Route::get('/export/{format}', [AnalyticsController::class, 'exportData']);
    
    // Health check
    Route::get('/health', function () {
        return response()->json([
            'status' => 'OK',
            'timestamp' => now()->toISOString(),
            'version' => '1.0.0'
        ]);
    });
});