<?php

use App\Enums\ItemStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->foreignId('city_id')
                ->constrained('cities')
                ->references('id')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->enum('status', [ItemStatus::Enabled, ItemStatus::Disabled, ItemStatus::Deleted])->default(ItemStatus::Enabled);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('states');
    }
};
