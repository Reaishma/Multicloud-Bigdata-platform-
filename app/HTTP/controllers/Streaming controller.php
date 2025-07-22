<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StreamingController extends Controller
{
    public function handle($action)
    {
        if (!in_array($action, ['start', 'stop'])) {
            return response()->json(['error' => 'Invalid action'], 400);
        }

        // In a real application, you would interact with your streaming service here
        return response()->json([
            'status' => 'success',
            'message' => "Streaming {$action}ed successfully",
            'timestamp' => now()->toDateTimeString()
        ]);
    }
}
