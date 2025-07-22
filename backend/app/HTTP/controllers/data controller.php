<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DataController extends Controller
{
    /**
     * Get all data sources
     */
    public function getDataSources(): JsonResponse
    {
        $dataSources = [
            [
                'id' => 'ecommerce',
                'name' => 'E-commerce Transactions',
                'description' => 'Customer purchase data with transaction details',
                'enabled' => true,
                'recordCount' => 15000,
                'schema' => 'ecommerce.transactions',
                'lastUpdated' => now()->subHours(2)->toISOString()
            ],
            [
                'id' => 'iot',
                'name' => 'IoT Sensor Data',
                'description' => 'Temperature, Humidity, Pressure readings',
                'enabled' => true,
                'recordCount' => 8500,
                'schema' => 'iot.sensor_data',
                'lastUpdated' => now()->subMinutes(15)->toISOString()
            ],
            [
                'id' => 'logs',
                'name' => 'Web Server Logs',
                'description' => 'Apache/Nginx access and error logs',
                'enabled' => false,
                'recordCount' => 12000,
                'schema' => 'analytics.web_logs',
                'lastUpdated' => now()->subHours(1)->toISOString()
            ],
            [
                'id' => 'financial',
                'name' => 'Financial Market Data',
                'description' => 'Stock prices, trading volumes, market indices',
                'enabled' => false,
                'recordCount' => 6500,
                'schema' => 'finance.market_data',
                'lastUpdated' => now()->subMinutes(30)->toISOString()
            ],
            [
                'id' => 'social',
                'name' => 'Social Media Sentiment',
                'description' => 'Twitter/Facebook posts with sentiment analysis',
                'enabled' => false,
                'recordCount' => 4200,
                'schema' => 'social.sentiment_data',
                'lastUpdated' => now()->subHours(3)->toISOString()
            ]
        ];

        return response()->json($dataSources);
    }

    /**
     * Update data source configuration
     */
    public function updateDataSource(string $id, Request $request): JsonResponse
    {
        $request->validate([
            'enabled' => 'boolean'
        ]);

        // In a real implementation, this would update the database
        return response()->json([
            'id' => $id,
            'enabled' => $request->enabled,
            'updated_at' => now()->toISOString(),
            'message' => 'Data source updated successfully'
        ]);
    }

    /**
     * Get sample data for a data source
     */
    public function getSampleData(string $id): JsonResponse
    {
        $sampleData = $this->generateSampleData($id);
        
        return response()->json([
            'dataSourceId' => $id,
            'sampleSize' => count($sampleData),
            'data' => $sampleData,
            'generatedAt' => now()->toISOString()
        ]);
    }

    /**
     * Generate sample data based on data source type
     */
    private function generateSampleData(string $sourceType): array
    {
        switch ($sourceType) {
            case 'ecommerce':
                return $this->generateEcommerceData();
            case 'iot':
                return $this->generateIoTData();
            case 'logs':
                return $this->generateLogData();
            case 'financial':
                return $this->generateFinancialData();
            case 'social':
                return $this->generateSocialData();
            default:
                return [];
        }
    }

    private function generateEcommerceData(): array
    {
        $products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones'];
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'id' => $i + 1,
                'product' => $products[array_rand($products)],
                'amount' => rand(50, 1000),
                'timestamp' => now()->subHours(rand(1, 24))->toISOString(),
                'customer_id' => 'cust_' . rand(1000, 9999)
            ];
        }

        return $data;
    }

    private function generateIoTData(): array
    {
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'device_id' => 'sensor_' . rand(1, 20),
                'temperature' => rand(10, 50),
                'humidity' => rand(20, 100),
                'pressure' => rand(950, 1000),
                'timestamp' => now()->subMinutes(rand(1, 60))->toISOString()
            ];
        }

        return $data;
    }

    private function generateLogData(): array
    {
        $ips = ['192.168.1.1', '10.0.0.1', '172.16.0.1'];
        $endpoints = ['/api/users', '/api/orders', '/dashboard'];
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'ip' => $ips[array_rand($ips)],
                'endpoint' => $endpoints[array_rand($endpoints)],
                'status_code' => rand(0, 10) < 9 ? 200 : 404,
                'response_time' => rand(50, 1000),
                'timestamp' => now()->subMinutes(rand(1, 60))->toISOString()
            ];
        }

        return $data;
    }

    private function generateFinancialData(): array
    {
        $symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'symbol' => $symbols[array_rand($symbols)],
                'price' => rand(50, 350) + rand(0, 99) / 100,
                'volume' => rand(100000, 1000000),
                'change' => (rand(0, 1) ? 1 : -1) * (rand(0, 10) + rand(0, 99) / 100),
                'timestamp' => now()->subMinutes(rand(1, 60))->toISOString()
            ];
        }

        return $data;
    }

    private function generateSocialData(): array
    {
        $platforms = ['Twitter', 'Facebook', 'Instagram'];
        $sentiments = ['positive', 'negative', 'neutral'];
        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'platform' => $platforms[array_rand($platforms)],
                'sentiment' => $sentiments[array_rand($sentiments)],
                'score' => rand(0, 100) / 100,
                'mentions' => rand(1, 1000),
                'timestamp' => now()->subMinutes(rand(1, 60))->toISOString()
            ];
        }

        return $data;
    }
}