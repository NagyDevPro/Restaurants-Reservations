<?php

namespace App\Http\Controllers;

use App\Models\RestaurantCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RestaurantCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('check.restaurant.owner')->only(['update', 'destroy', 'store']);
    }

    public function index()
    {
        $restaurantCategories = RestaurantCategory::all();
        return response()->json($restaurantCategories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:enabled,disabled,deleted',
        ]);

        $restaurantCategory = RestaurantCategory::create($validatedData);
        return response()->json($restaurantCategory, 201);
    }

    public function show($id)
    {
        $restaurantCategory = RestaurantCategory::findOrFail($id);
        return response()->json($restaurantCategory);
    }

    public function update(Request $request, $id)
    {
        $restaurantCategory = RestaurantCategory::findOrFail($id);

        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:enabled,disabled,deleted',
        ]);

        $restaurantCategory->update($validatedData);
        return response()->json($restaurantCategory);
    }

    public function destroy($id)
    {
        $restaurantCategory = RestaurantCategory::findOrFail($id);
        $restaurantCategory->delete();
        return response()->json(null, 204);
    }
}