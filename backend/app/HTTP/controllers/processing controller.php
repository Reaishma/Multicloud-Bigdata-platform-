<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProcessingController extends Controller
{
    /**
     * Get processing metrics
     */
    public function getMetrics(): JsonResponse
    {
        $metrics = [
            'cpuUsage' => [65, 72, 58, 83, 69, 75],
            'memoryUsage' => [45, 52, 48, 63, 59, 65],
            'timestamps' => ['1h', '2h', '3h', '4h', '5h', '6h'],
            'throughput' => rand(800, 1200),
            'latency' => rand(10, 50),
            'errors' => rand(0, 5)
        ];

        return response()->json($metrics);
    }

    /**
     * Start a processing job
     */
    public function startJob(Request $request): JsonResponse
    {
        $request->validate([
            'dataSources' => 'required|array',
            'dataSources.*' => 'string'
        ]);

        $jobId = 'job_' . time() . '_' . rand(1000, 9999);
        
        // Store job status in cache
        Cache::put("job_status_{$jobId}", [
            'id' => $jobId,
            'progress' => 0,
            'status' => 'Started',
            'dataSources' => $request->dataSources,
            'startTime' => now(),
            'logs' => [
                'Job started at ' . now()->toISOString(),
                'Processing ' . count($request->dataSources) . ' data sources'
            ]
        ], now()->addHours(24));

        return response()->json([
            'jobId' => $jobId,
            'status' => 'Started',
            'message' => 'Processing job started successfully'
        ]);
    }

    /**
     * Get current job status
     */
    public function getJobStatus(): JsonResponse
    {
        // Get the most recent job status from cache
        $keys = Cache::getStore()->getRedis()->keys('*job_status_*');
        
        if (empty($keys)) {
            return response()->json([
                'progress' => 0,
                'status' => 'No active jobs',
                'logs' => []
            ]);
        }

        $latestKey = end($keys);
        $jobStatus = Cache::get(str_replace(config('cache.prefix') . ':', '', $latestKey));

        // Simulate progress updates
        if ($jobStatus && $jobStatus['progress'] < 100) {
            $jobStatus['progress'] = min(100, $jobStatus['progress'] + rand(5, 15));
            $jobStatus['logs'][] = 'Progress: ' . $jobStatus['progress'] . '% at ' . now()->toTimeString();
            
            if ($jobStatus['progress'] >= 100) {
                $jobStatus['status'] = 'Completed';
                $jobStatus['logs'][] = 'Job completed successfully at ' . now()->toISOString();
            }
            
            Cache::put(str_replace(config('cache.prefix') . ':', '', $latestKey), $jobStatus, now()->addHours(24));
        }

        return response()->json($jobStatus);
    }

    /**
     * Get job details by ID
     */
    public function getJobDetails(string $id): JsonResponse
    {
        $jobStatus = Cache::get("job_status_{$id}");

        if (!$jobStatus) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json($jobStatus);
    }
}