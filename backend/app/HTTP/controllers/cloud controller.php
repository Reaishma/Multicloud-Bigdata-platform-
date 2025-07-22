<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CloudController extends Controller
{
    /**
     * Get cloud services status for a specific platform
     */
    public function getServices(string $platform): JsonResponse
    {
        $services = [
            'aws' => [
                ['name' => 'EMR', 'status' => 'success', 'icon' => 'fas fa-server'],
                ['name' => 'S3', 'status' => 'success', 'icon' => 'fas fa-database'],
                ['name' => 'Redshift', 'status' => 'success', 'icon' => 'fas fa-warehouse'],
                ['name' => 'Kinesis', 'status' => 'warning', 'icon' => 'fas fa-stream'],
                ['name' => 'Lambda', 'status' => 'success', 'icon' => 'fas fa-bolt']
            ],
            'gcp' => [
                ['name' => 'Dataproc', 'status' => 'success', 'icon' => 'fas fa-server'],
                ['name' => 'BigQuery', 'status' => 'success', 'icon' => 'fas fa-database'],
                ['name' => 'Cloud Storage', 'status' => 'success', 'icon' => 'fas fa-cloud'],
                ['name' => 'Pub/Sub', 'status' => 'success', 'icon' => 'fas fa-stream'],
                ['name' => 'Cloud Functions', 'status' => 'warning', 'icon' => 'fas fa-bolt']
            ],
            'azure' => [
                ['name' => 'HDInsight', 'status' => 'success', 'icon' => 'fas fa-server'],
                ['name' => 'Data Lake', 'status' => 'success', 'icon' => 'fas fa-water'],
                ['name' => 'Synapse Analytics', 'status' => 'success', 'icon' => 'fas fa-chart-line'],
                ['name' => 'Event Hubs', 'status' => 'success', 'icon' => 'fas fa-stream'],
                ['name' => 'Azure Functions', 'status' => 'success', 'icon' => 'fas fa-bolt']
            ]
        ];

        return response()->json($services[$platform] ?? []);
    }

    /**
     * Get cost analysis for a specific platform
     */
    public function getCostAnalysis(string $platform): JsonResponse
    {
        $costs = [
            'aws' => ['hourly' => 24.50, 'monthly' => 17640],
            'gcp' => ['hourly' => 22.80, 'monthly' => 16416],
            'azure' => ['hourly' => 26.20, 'monthly' => 18864]
        ];

        return response()->json($costs[$platform] ?? $costs['aws']);
    }

    /**
     * Get cluster status for platform and engine
     */
    public function getClusterStatus(string $platform, string $engine): JsonResponse
    {
        $status = [
            'aws' => [
                'hadoop' => ['status' => 'running', 'nodes' => 5, 'version' => '3.3.4'],
                'spark' => ['status' => 'running', 'nodes' => 8, 'version' => '3.4.1']
            ],
            'gcp' => [
                'hadoop' => ['status' => 'running', 'nodes' => 4, 'version' => '3.3.4'],
                'spark' => ['status' => 'running', 'nodes' => 6, 'version' => '3.4.1']
            ],
            'azure' => [
                'hadoop' => ['status' => 'running', 'nodes' => 6, 'version' => '3.3.4'],
                'spark' => ['status' => 'running', 'nodes' => 10, 'version' => '3.4.1']
            ]
        ];

        return response()->json($status[$platform][$engine] toISOString }
}