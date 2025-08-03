import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

interface Props {
    user_name?: string;
    partner_name?: string;
    percentage?: number;
    message?: string;
    [key: string]: unknown;
}

export default function KalkulatorCinta({ user_name, partner_name, percentage, message }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_name: user_name || '',
        partner_name: partner_name || '',
    });

    const [showAnimation, setShowAnimation] = useState(false);
    const [hearts, setHearts] = useState<Array<{ id: number; delay: number }>>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('love-calculator.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowAnimation(true);
                // Create floating hearts animation
                const heartArray = Array.from({ length: 10 }, (_, index) => ({
                    id: index,
                    delay: Math.random() * 2000,
                }));
                setHearts(heartArray);
                
                setTimeout(() => {
                    setShowAnimation(false);
                    setHearts([]);
                }, 3000);
            }
        });
    };

    return (
        <>
            <Head title="💕 Kalkulator Cinta - Hitung Persentase Cinta Kalian" />
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 dark:from-pink-900 dark:via-rose-900 dark:to-red-900">
                {/* Floating Hearts Animation */}
                {showAnimation && (
                    <div className="fixed inset-0 pointer-events-none z-50">
                        {hearts.map((heart) => (
                            <div
                                key={heart.id}
                                className="absolute text-4xl animate-bounce"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${heart.delay}ms`,
                                    animationDuration: '2s',
                                }}
                            >
                                ❤️
                            </div>
                        ))}
                    </div>
                )}

                <header className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href={route('home')} className="flex items-center space-x-2 text-rose-800 dark:text-rose-200 hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                            <span className="text-2xl">💕</span>
                            <span className="text-xl font-bold">Love Calculator</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('matchmaking.index')}
                                className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium transition-colors"
                            >
                                ⭐ Kalkulator Jodoh
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
                            <h1 className="text-4xl md:text-5xl font-bold text-rose-800 dark:text-rose-200 mb-4">
                                ❤️ Kalkulator Cinta
                            </h1>
                            <p className="text-lg text-rose-600 dark:text-rose-300">
                                Masukkan nama kamu dan pasangan untuk mengetahui tingkat cinta kalian!
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="user_name" className="block text-sm font-medium text-rose-800 dark:text-rose-200 mb-2">
                                        💗 Nama Kamu
                                    </label>
                                    <input
                                        type="text"
                                        id="user_name"
                                        value={data.user_name}
                                        onChange={(e) => setData('user_name', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-rose-200 dark:border-rose-700 bg-white/90 dark:bg-gray-700/90 px-4 py-3 text-rose-800 dark:text-rose-200 placeholder-rose-400 dark:placeholder-rose-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800"
                                        placeholder="Masukkan nama kamu..."
                                        required
                                    />
                                    {errors.user_name && (
                                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.user_name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="partner_name" className="block text-sm font-medium text-rose-800 dark:text-rose-200 mb-2">
                                        💖 Nama Pasangan
                                    </label>
                                    <input
                                        type="text"
                                        id="partner_name"
                                        value={data.partner_name}
                                        onChange={(e) => setData('partner_name', e.target.value)}
                                        className="w-full rounded-2xl border-2 border-rose-200 dark:border-rose-700 bg-white/90 dark:bg-gray-700/90 px-4 py-3 text-rose-800 dark:text-rose-200 placeholder-rose-400 dark:placeholder-rose-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-800"
                                        placeholder="Masukkan nama pasangan..."
                                        required
                                    />
                                    {errors.partner_name && (
                                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.partner_name}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processing ? '💕 Menghitung...' : '💕 Hitung Cinta Kami!'}
                                </button>
                            </form>
                        </div>

                        {/* Results */}
                        {percentage && message && (
                            <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 dark:from-pink-900/40 dark:to-rose-900/40 backdrop-blur rounded-3xl p-8 shadow-2xl text-center animate-pulse">
                                <div className="mb-6">
                                    <div className="text-6xl font-bold text-rose-800 dark:text-rose-200 mb-2">
                                        {percentage}%
                                    </div>
                                    <div className="text-2xl font-semibold text-rose-700 dark:text-rose-300 mb-4">
                                        {user_name} ❤️ {partner_name}
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-rose-200 dark:bg-rose-800 rounded-full h-4 mb-6 overflow-hidden">
                                        <div 
                                            className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6">
                                    <p className="text-lg text-rose-800 dark:text-rose-200 leading-relaxed">
                                        {message}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        reset();
                                        router.visit(route('love-calculator.index'));
                                    }}
                                    className="mt-6 rounded-2xl bg-white/80 dark:bg-gray-700/80 px-6 py-3 text-rose-800 dark:text-rose-200 font-medium shadow-lg transition-all hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl"
                                >
                                    🔄 Hitung Lagi
                                </button>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="mt-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-6 text-center">
                            <h3 className="text-xl font-bold text-rose-800 dark:text-rose-200 mb-4">
                                ✨ Cara Kerja Kalkulator Cinta
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-rose-600 dark:text-rose-300">
                                <div>
                                    <div className="text-2xl mb-2">🎯</div>
                                    <div>Hasil yang konsisten untuk pasangan nama yang sama</div>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">💕</div>
                                    <div>Pesan romantis berdasarkan persentase cinta</div>
                                </div>
                                <div>
                                    <div className="text-2xl mb-2">🎉</div>
                                    <div>Animasi hati yang indah saat hasil muncul</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}