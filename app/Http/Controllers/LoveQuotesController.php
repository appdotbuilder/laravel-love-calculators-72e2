<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoveQuotesController extends Controller
{
    /**
     * Array of love quotes in Indonesian.
     */
    protected array $loveQuotes = [
        "Cinta adalah ketika kebahagiaan seseorang lebih penting daripada kebahagiaanmu sendiri. 💕",
        "Dalam cinta, yang terpenting bukanlah menemukan seseorang yang sempurna, tetapi seseorang yang sempurna untukmu. ❤️",
        "Cinta sejati adalah ketika kamu masih jatuh cinta pada orang yang sama setiap hari. 💖",
        "Cinta bukan tentang seberapa sering kamu mengatakan 'Aku cinta kamu', tetapi seberapa sering kamu membuktikannya. 💗",
        "Jarak dan waktu tidak berarti apa-apa ketika seseorang berarti segalanya bagimu. 🌹",
        "Cinta terbaik adalah ketika kamu jatuh cinta pada sahabat terbaikmu. 💝",
        "Cinta adalah bahasa yang dapat didengar oleh hati, meskipun telinga tuli. 💞",
        "Dalam cinta, hal terkecil adalah hal yang terbesar. 💘",
        "Cinta tidak membuat dunia berputar, tetapi cinta membuat perjalanan hidup menjadi berharga. 🌸",
        "Ketika kamu mencintai seseorang, kamu mencintai seluruh dirinya, bukan hanya bagian baiknya saja. 💐",
        "Cinta adalah saat kamu memberikan seseorang kekuatan untuk menghancurkanmu, tetapi kamu percaya dia tidak akan melakukannya. 🦋",
        "Rumah bukan tempat, tetapi perasaan. Dan perasaan itu adalah cinta. 🏠💕",
        "Cinta sejati dimulai ketika tidak ada yang diharapkan sebagai balasannya. 🌟",
        "Yang paling indah dalam cinta adalah ketika kamu bisa menjadi diri sendiri sepenuhnya. ✨",
        "Cinta adalah ketika kamu melihat seseorang dengan mata hatimu, bukan dengan mata kepalamu. 👀💖",
        "Dalam cinta, tidak ada yang terlalu kecil untuk dirayakan dan tidak ada yang terlalu besar untuk dimaafkan. 🎉",
        "Cinta adalah seni memberikan dan menerima tanpa menghitung. 🎨💝",
        "Ketika kamu mencintai seseorang, kamu tidak pernah kehabisan hal untuk diberikan. 🎁",
        "Cinta tumbuh dengan memberi. Semakin banyak kamu berikan, semakin banyak yang kamu miliki. 🌱",
        "Hidup tanpa cinta seperti pohon tanpa bunga dan buah. 🌳🌺"
    ];

    /**
     * Display the love quotes page.
     */
    public function index()
    {
        return Inertia::render('kata-cinta');
    }
    
    /**
     * Get a random love quote.
     */
    public function store(Request $request)
    {
        $randomIndex = random_int(0, count($this->loveQuotes) - 1);
        $quote = $this->loveQuotes[$randomIndex];
        
        return Inertia::render('kata-cinta', [
            'quote' => $quote,
            'quote_number' => $randomIndex + 1,
            'total_quotes' => count($this->loveQuotes),
        ]);
    }
}