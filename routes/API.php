
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/cloud-services', 'CloudServiceController@index');
Route::get('/data-sources', 'DataSourceController@index');
Route::get('/governance-metrics', 'GovernanceMetricController@index');
Route::post('/streaming/{action}', 'StreamingController@handle');
Route::match(['get', 'post', 'put', 'delete'], '/api-test', 'ApiTestController@handle');
