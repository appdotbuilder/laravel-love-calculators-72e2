<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoveCalculatorController extends Controller
{
    /**
     * Display the love calculator.
     */
    public function index()
    {
        return Inertia::render('kalkulator-cinta');
    }
    
    /**
     * Calculate love percentage based on names.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'partner_name' => 'required|string|max:255',
        ]);

        $userName = strtolower(trim($request->user_name));
        $partnerName = strtolower(trim($request->partner_name));
        
        // Create a consistent seed based on the names
        $seed = crc32($userName . $partnerName);
        
        // Use seeded random to ensure consistent results
        srand($seed);
        $percentage = random_int(50, 100); // Love is always positive!
        
        $message = $this->getLoveMessage($percentage);
        
        return Inertia::render('kalkulator-cinta', [
            'user_name' => $request->user_name,
            'partner_name' => $request->partner_name,
            'percentage' => $percentage,
            'message' => $message,
        ]);
    }
    
    /**
     * Get romantic message based on percentage.
     */
    protected function getLoveMessage(int $percentage): string
    {
        if ($percentage >= 90) {
            return "💕 Kalian adalah pasangan yang sempurna! Cinta kalian sangat kuat dan akan bertahan selamanya!";
        } elseif ($percentage >= 80) {
            return "❤️ Hubungan kalian sangat harmonis! Ada chemistry yang luar biasa di antara kalian!";
        } elseif ($percentage >= 70) {
            return "💖 Kalian memiliki potensi cinta yang besar! Terus jaga komunikasi dan saling pengertian!";
        } elseif ($percentage >= 60) {
            return "💗 Ada ketertarikan yang indah di antara kalian! Waktu akan menguatkan hubungan ini!";
        } else {
            return "💝 Cinta sejati membutuhkan waktu untuk tumbuh. Tetap bersabar dan saling mengenal!";
        }
    }
}