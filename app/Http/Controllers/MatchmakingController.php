<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class MatchmakingController extends Controller
{
    /**
     * Display the matchmaking calculator.
     */
    public function index()
    {
        return Inertia::render('kalkulator-jodoh');
    }
    
    /**
     * Calculate compatibility based on birth dates.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_birth_date' => 'required|date|before:today',
            'partner_birth_date' => 'required|date|before:today',
        ]);

        $userBirthDate = Carbon::parse($request->user_birth_date);
        $partnerBirthDate = Carbon::parse($request->partner_birth_date);
        
        // Calculate compatibility based on multiple factors
        $compatibility = $this->calculateCompatibility($userBirthDate, $partnerBirthDate);
        $suggestion = $this->getCompatibilitySuggestion($compatibility);
        
        return Inertia::render('kalkulator-jodoh', [
            'user_birth_date' => $request->user_birth_date,
            'partner_birth_date' => $request->partner_birth_date,
            'compatibility' => $compatibility,
            'suggestion' => $suggestion,
        ]);
    }
    
    /**
     * Calculate compatibility score based on birth dates.
     */
    protected function calculateCompatibility(Carbon $userDate, Carbon $partnerDate): int
    {
        // Factor 1: Age difference (closer ages = higher compatibility)
        $ageDifference = abs($userDate->diffInYears($partnerDate));
        $ageScore = max(0, 100 - ($ageDifference * 5));
        
        // Factor 2: Birth month compatibility
        $monthDiff = abs($userDate->month - $partnerDate->month);
        $monthScore = $monthDiff <= 3 ? 100 : (100 - ($monthDiff * 10));
        
        // Factor 3: Day compatibility (based on numerology)
        $userDay = $userDate->day;
        $partnerDay = $partnerDate->day;
        $daySum = ($userDay + $partnerDay) % 10;
        $dayScore = $daySum >= 7 ? 100 : $daySum * 15;
        
        // Factor 4: Zodiac season compatibility
        $seasonScore = $this->getSeasonCompatibility($userDate, $partnerDate);
        
        // Calculate weighted average
        $compatibility = ($ageScore * 0.3) + ($monthScore * 0.2) + ($dayScore * 0.3) + ($seasonScore * 0.2);
        
        return max(50, min(100, round($compatibility))); // Keep between 50-100
    }
    
    /**
     * Get season compatibility score.
     */
    protected function getSeasonCompatibility(Carbon $userDate, Carbon $partnerDate): int
    {
        $userSeason = $this->getSeason($userDate);
        $partnerSeason = $this->getSeason($partnerDate);
        
        // Same season = high compatibility
        if ($userSeason === $partnerSeason) {
            return 100;
        }
        
        // Adjacent seasons = medium compatibility
        $seasons = ['spring', 'summer', 'autumn', 'winter'];
        $userIndex = array_search($userSeason, $seasons);
        $partnerIndex = array_search($partnerSeason, $seasons);
        
        $difference = min(abs($userIndex - $partnerIndex), 4 - abs($userIndex - $partnerIndex));
        
        return $difference === 1 ? 80 : 60;
    }
    
    /**
     * Get season based on birth date.
     */
    protected function getSeason(Carbon $date): string
    {
        $month = $date->month;
        
        if (in_array($month, [3, 4, 5])) {
            return 'spring';
        } elseif (in_array($month, [6, 7, 8])) {
            return 'summer';
        } elseif (in_array($month, [9, 10, 11])) {
            return 'autumn';
        } else {
            return 'winter';
        }
    }
    
    /**
     * Get compatibility suggestion based on score.
     */
    protected function getCompatibilitySuggestion(int $compatibility): string
    {
        if ($compatibility >= 90) {
            return "🌟 Luar biasa! Kalian sangat cocok secara astrologi. Hubungan ini berpotensi sangat harmonis dan langgeng!";
        } elseif ($compatibility >= 80) {
            return "✨ Kompatibilitas yang sangat baik! Kalian memiliki keseimbangan yang indah dalam kepribadian.";
        } elseif ($compatibility >= 70) {
            return "💫 Cocok! Ada keharmonisan alami di antara kalian. Komunikasi yang baik akan memperkuat hubungan.";
        } elseif ($compatibility >= 60) {
            return "🌙 Potensi yang menjanjikan! Dengan saling pengertian, hubungan ini bisa berkembang dengan baik.";
        } else {
            return "⭐ Perbedaan bisa menjadi kekuatan! Saling melengkapi dan belajar dari satu sama lain akan membuat hubungan lebih kaya.";
        }
    }
}