import React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

interface Props {
    user_birth_date?: string;
    partner_birth_date?: string;
    compatibility?: number;
    suggestion?: string;
    [key: string]: unknown;
}

export default function KalkulatorJodoh({ user_birth_date, partner_birth_date, compatibility, suggestion }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_birth_date: user_birth_date || '',
        partner_birth_date: partner_birth_date || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('matchmaking.store'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getCompatibilityColor = (score?: number) => {
        if (!score) return 'from-gray-400 to-gray-500';
        if (score >= 90) return 'from-green-400 to-green-600';
        if (score >= 80) return 'from-blue-400 to-blue-600';
        if (score >= 70) return 'from-yellow-400 to-yellow-600';
        if (score >= 60) return 'from-orange-400 to-orange-600';
        return 'from-red-400 to-red-600';
    };

    const getCompatibilityEmoji = (score?: number) => {
        if (!score) return '⭐';
        if (score >= 90) return '🌟';
        if (score >= 80) return '✨';
        if (score >= 70) return '💫';
        if (score >= 60) return '🌙';
        return '⭐';
    };

    return (
        <>
            <Head title="⭐ Kalkulator Jodoh - Hitung Kompatibilitas Berdasarkan Tanggal Lahir" />
            <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
                <header className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href={route('home')} className="flex items-center space-x-2 text-purple-800 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                            <span className="text-2xl">💕</span>
                            <span className="text-xl font-bold">Love Calculator</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('love-calculator.index')}
                                className="text-rose-600 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-200 font-medium transition-colors"
                            >
                                ❤️ Kalkulator Cinta
                            </Link>
                            <Link
                                href={route('love-quotes.index')}
                                className="text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium transition-colors"
                            >
                                💝 Kata Cinta
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 dark:text-purple-200 mb-4">
                                ⭐ Kalkulator Jodoh
                            </h1>
                            <p className="text-lg text-purple-600 dark:text-purple-300">
                                Temukan kompatibilitas kalian berdasarkan tanggal lahir dan astrologi!
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="user_birth_date" className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                                        🎂 Tanggal Lahir Kamu
                                    </label>
                                    <input
                                        type="date"
                                        id="user_birth_date"
                                        value={data.user_birth_date}
                                        onChange={(e) => setData('user_birth_date', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-purple-200 dark:border-purple-700 bg-white/90 dark:bg-gray-700/90 px-4 py-3 text-purple-800 dark:text-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                                        required
                                    />
                                    {errors.user_birth_date && (
                                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.user_birth_date}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="partner_birth_date" className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                                        💖 Tanggal Lahir Pasangan
                                    </label>
                                    <input
                                        type="date"
                                        id="partner_birth_date"
                                        value={data.partner_birth_date}
                                        onChange={(e) => setData('partner_birth_date', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-purple-200 dark:border-purple-700 bg-white/90 dark:bg-gray-700/90 px-4 py-3 text-purple-800 dark:text-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                                        required
                                    />
                                    {errors.partner_birth_date && (
                                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.partner_birth_date}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processing ? '⭐ Menganalisis...' : '⭐ Hitung Kompatibilitas!'}
                                </button>
                            </form>
                        </div>

                        {/* Results */}
                        {compatibility && suggestion && (
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur rounded-3xl p-8 shadow-2xl text-center">
                                <div className="mb-6">
                                    <div className="text-6xl mb-4">
                                        {getCompatibilityEmoji(compatibility)}
                                    </div>
                                    <div className="text-6xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                                        {compatibility}%
                                    </div>
                                    <div className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
                                        Tingkat Kompatibilitas
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-4 mb-6 overflow-hidden">
                                        <div 
                                            className={`bg-gradient-to-r ${getCompatibilityColor(compatibility)} h-full rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${compatibility}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 mb-6">
                                    <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed">
                                        {suggestion}
                                    </p>
                                </div>

                                {/* Compatibility Breakdown */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4">
                                        <div className="text-2xl mb-2">🎂</div>
                                        <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Analisis Usia</div>
                                        <div className="text-xs text-purple-600 dark:text-purple-300">Berdasarkan perbedaan usia</div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4">
                                        <div className="text-2xl mb-2">🌙</div>
                                        <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Astrologi</div>
                                        <div className="text-xs text-purple-600 dark:text-purple-300">Kompatibilitas musim lahir</div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4">
                                        <div className="text-2xl mb-2">🔢</div>
                                        <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Numerologi</div>
                                        <div className="text-xs text-purple-600 dark:text-purple-300">Berdasarkan tanggal lahir</div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4">
                                        <div className="text-2xl mb-2">📅</div>
                                        <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Bulan Lahir</div>
                                        <div className="text-xs text-purple-600 dark:text-purple-300">Kecocokan bulan kelahiran</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        reset();
                                        router.visit(route('matchmaking.index'));
                                    }}
                                    className="rounded-2xl bg-white/80 dark:bg-gray-700/80 px-6 py-3 text-purple-800 dark:text-purple-200 font-medium shadow-lg transition-all hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl"
                                >
                                    🔄 Hitung Lagi
                                </button>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="mt-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-6 text-center">
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">
                                🔮 Metode Perhitungan Kompatibilitas
                            </h3>
                            <div className="grid md:grid-cols-4 gap-4 text-sm text-purple-600 dark:text-purple-300">
                                <div>
                                    <div className="text-2xl mb-2">👥</div>
                                    <div className="font-medium">Perbedaan Usia</div>
                                    <div className="text-xs">Usia yang mendekati = kompatibilitas tinggi</div>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">🌸</div>
                                    <div className="font-medium">Musim Kelahiran</div>
                                    <div className="text-xs">Musim yang sama/berdekatan = cocok</div>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">🎯</div>
                                    <div className="font-medium">Numerologi</div>
                                    <div className="text-xs">Kombinasi tanggal lahir</div>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">📊</div>
                                    <div className="font-medium">Rata-rata Tertimbang</div>
                                    <div className="text-xs">Semua faktor digabungkan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}