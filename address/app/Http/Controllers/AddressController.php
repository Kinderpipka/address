<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;

class AddressController extends Controller
{
    private $dadataClient;

    public function __construct()
    {
        $this->dadataClient = new Client([
            'base_uri' => 'https://dadata.ru/api/v2/',
            'headers' => [
                'Authorization' => 'Token ' . env('DADATA_API_KEY'),
                'Content-Type' => 'application/json',
            ]
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $cacheKey = 'dadata_search_' . $query;
        $results = Cache::remember($cacheKey, 60, function () use ($query) {
            $response = $this->dadataClient->post('address/suggest', [
                'json' => ['query' => $query]
            ]);

            return json_decode($response->getBody()->getContents(), true);
        });

        return response()->json($results);
    }

    public function save(Request $request)
    {
        $user = Auth::user();
        $address = $request->input('address');

        if ($user->addresses()->count() >= 10) {
            return response()->json(['error' => 'Address limit reached'], 400);
        }

        $user->addresses()->create(['address' => $address]);

        return response()->json(['success' => true]);
    }

    public function list()
    {
        $user = Auth::user();
        return response()->json($user->addresses);
    }
}
