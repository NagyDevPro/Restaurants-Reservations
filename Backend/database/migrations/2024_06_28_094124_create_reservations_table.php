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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->references('id')->onUpdate('cascade')->onDelete('cascade');
            $table->decimal('total_price', 10, 2)->default(0.00);
            $table->text('notes')->nullable();
            $table->boolean('terms_and_conditions')->default(false);
            $table->enum('status', [ItemStatus::Pending, ItemStatus::Success, ItemStatus::Failed, ItemStatus::Rejected, ItemStatus::Confirmed, ItemStatus::Cancelled])->default(ItemStatus::Pending);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};