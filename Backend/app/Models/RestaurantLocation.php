<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RestaurantLocation extends Model
{
    use HasFactory;
    public $guarded = ['id', 'created_at', 'updated_at'];

    public function restaurant() : BelongsTo
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id', 'id');
    }

    public function tables() : HasMany
    {
        return $this->hasMany(Table::class, 'restaurant_location_id', 'id');
    }

    public function images() : HasMany
    {
        return $this->hasMany(RestaurantLocationImage::class, 'restaurant_location_id', 'id');
    }
}
