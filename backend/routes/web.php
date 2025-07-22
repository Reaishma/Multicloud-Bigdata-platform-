<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return response()->json([
        'name' => 'Big Data Multi-Cloud Platform API',
        'version' => '1.0.0',
        'description' => 'REST API for Multi-Cloud Bicomparisoncessing Platform',
        'endpoints' => [
            'health' => '/api/health',
            'cloud_services' => '/api/cloud-services/{platform}',
            'cost_analysis' => '/api/cost-analysis/{platform}',
            'processing_metrics' => '/api/processing-metrics',
            'data_sources' => '/api/data-sources',
            'streaming' => '/api/streaming/*',
            'analytics' => '/api/analytics/*',
            'governance' => '/api/data-quality'
        ]
    ]);
});