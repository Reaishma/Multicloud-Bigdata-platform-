<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CloudServiceController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'provider' => 'AWS',
                'services' => ['EMR', 'S3', 'Redshift', 'Kinesis', 'Lambda'],
                'status' => 'operational',
                'hourlyCost' => '$2.45',
                'monthlyEstimate' => '$1,764',
                'icon' => '↓'
            ],
            [
                'provider' => 'GCP',
                'services' => ['Dataproc', 'BigQuery', 'Cloud Storage', 'Pub/Sub', 'Cloud Functions'],
                'status' => 'operational',
                'hourlyCost' => '$1.89',
                'monthlyEstimate' => '$1,361',
                'icon' => '↑'
            ],
            [
                'provider' => 'Azure',
                'services' => ['HDInsight', 'Data Lake', 'Synapse Analytics', 'Event Hubs', 'Azure Functions'],
                'status' => 'degraded',
                'hourlyCost' => '$2.12',
                'monthlyEstimate' => '$1,526',
                'icon' => '✓'
            ]
        ]);
    }
}
