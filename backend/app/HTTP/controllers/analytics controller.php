<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AnalyticsController extends Controller
{
    /**
     * Get time series data
     */
    public function getTimeSeriesData(): JsonResponse
    {
        $data = [];
        $now = now();

        for ($i = 23; $i >= 0; $i--) {
            $data[] = [
                'time' => $now->copy()->subHours($i)->toISOString(),
                'value' => rand(500, 1500),
                'aws' => rand(200, 400),
                'gcp' => rand(180, 350),
                'azure' => rand(220, 420)
            ];
        }

        return response()->json($data);
    }

    /**
     * Get data distribution
     */
    public function getDataDistribution(): JsonResponse
    {
        return response()->json([
            ['label' => 'E-commerce', 'value' => 35],
            ['label' => 'IoT Sensors', 'value' => 25],
            ['label' => 'Web Logs', 'value' => 20],
            ['label' => 'Financial', 'value' => 12],
            ['label' => 'Social Media', 'value' => 8]
        ]);
    }

    /**
     * Get platform comparison data
     */
    public function getPlatformComparison(): JsonResponse
    {
        return response()->json([
            'labels' => ['Processing Speed', 'Cost Efficiency', 'Scalability', 'Reliability', 'Data Security', 'Global Availability'],
            'datasets' => [
                [
                    'label' => 'AWS',
                    'data' => [85, 78, 92, 88, 95, 98],
                    'backgroundColor' => 'rgba(255, 153, 0, 0.2)',
                    'borderColor' => '#FF9900'
                ],
                [
                    'label' => 'GCP',
                    'data' => [82, 85, 88, 85, 92, 95],
                    'backgroundColor' => 'rgba(66, 133, 244, 0.2)',
                    'borderColor' => '#4285F4'
                ],
                [
                    'label' => 'Azure',
                    'data' => [80, 82, 85, 90, 88, 96],
                    'backgroundColor' => 'rgba(0, 120, 212, 0.2)',
                    'borderColor' => '#0078D4'
                ]
            ]
        ]);
    }

    /**
     * Get analytics insights
     */
    public function getInsights(): JsonResponse
    {
        return response()->json([
            [
                'title' => 'Pea'success'ing Hours',
                'description' => 'Highest data processing volume occurs between 9 AM - 11 AM',
                'value' => '2.4M events/hour',
                'type' => 'trend',
                'severity' => 'info'
            ],
            [
                'title' => 'Cost Optimization',
                'description' => 'Potential 15% cost savings by optimizing cluster auto-scaling',
                'value' => '$3,200/month',
                'type' => 'cost',
                'severity' => 'warning'
            ],
            [
                'title' => 'Performance Improvement',
                'description' => 'Processing latency improved by 23% over the last month',
                'value' => '45ms average',
                'type' => 'performance',
                'severity' => 'success'
            ],
            [
                'title' => 'Data Quality Score',
                'description' => 'Data accuracy and completeness scores above target',
                'value' => '98.2% quality',
                'type' => 'quality',
                'severity' => 'success'
            ]
        ]);
    }

    /**
     * Export data in various formats
     */
    public function exportData(string $format, Request $request)
    {
        $data = [
            'timestamp' => now()->toISOString(),
            'platform' => $request->get('platform', 'aws'),
            'analytics' => [
                'dataDistribution' => $this->getDataDistribution()->getData(),
                'insights' => $this->getInsights()->getData(),
                'timeSeriesData' => $this->getTimeSeriesData()->getData()
            ]
        ];

        switch ($format) {
            case 'csv':
                return $this->exportAsCsv($data);
            case 'json':
                return $this->exportAsJson($data);
            case 'pdf':
                return $this->exportAsPdf($data);
            default:
                return response()->json(['error' => 'Unsupported format'], 400);
        }
    }

    /**
     * Export data as CSV
     */
    private function exportAsCsv(array $data): Response
    {
        $csv = "Metric,Value\n";
        $csv .= "Platform,{$data['platform']}\n";
        $csv .= "Export Date,{$data['timestamp']}\n";
        $csv .= "Total Insights," . count($data['analytics']['insights']) . "\n";
        
        foreach ($data['analytics']['insights'] as $insight) {
            $csv .= "\"{$insight->title}\",\"{$insight->description}\"\n";
        }

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="analytics_report.csv"'
        ]);
    }

    /**
     * Export data as JSON
     */
    private function exportAsJson(array $data): Response
    {
        return response(json_encode($data, JSON_PRETTY_PRINT), 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="analytics_report.json"'
        ]);
    }

    /**
     * Export data as PDF (placeholder)
     */
    private function exportAsPdf(array $data): JsonResponse
    {
        return response()->json([
            'message' => 'PDF export functionality would require additional libraries like DomPDF or TCPDF',
            'data' => $data
        ]);
    }
}