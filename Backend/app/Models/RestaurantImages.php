<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestaurantImages extends Model
{
    use HasFactory;
    public $guarded = ['id','created_at','updated_at'];
   public function restaurant() : BelongsTo{
        return $this->belongsTo(Restaurant::class);
    }
}