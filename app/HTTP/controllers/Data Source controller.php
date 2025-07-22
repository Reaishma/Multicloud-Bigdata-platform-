<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataSourceController extends Controller
{
    public function index()
    {
        return response()->json([
            ['name' => 'E-commerce Transactions', 'volume' => '1.2M/min', 'status' => 'active'],
            ['name' => 'IoT Sensor Data', 'volume' => '850K/min', 'status' => 'active'],
            ['name' => 'Web Server Logs', 'volume' => '3.5M/min', 'status' => 'active'],
            ['name' => 'Financial Market Data', 'volume' => '2.1M/min', 'status' => 'paused'],
            ['name' => 'Social Media Sentiment', 'volume' => '4.7M/min', 'status' => 'active']
        ]);
    }
}
