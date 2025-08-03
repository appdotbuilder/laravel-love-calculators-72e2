import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    quote?: string;
    quote_number?: number;
    total_quotes?: number;
    [key: string]: unknown;
}

export default function KataCinta({ quote, quote_number, total_quotes }: Props) {
    const { post, processing } = useForm();
    const [showAnimation, setShowAnimation] = useState(false);

    const handleGetQuote = () => {
        setShowAnimation(true);
        post(route('love-quotes.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setTimeout(() => setShowAnimation(false), 1000);
            }
        });
    };

    return (
        <>
            <Head title="💝 Kata Cinta - Kutipan Romantis untuk Orang Terkasih" />
            <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-rose-100 dark:from-red-900 dark:via-pink-900 dark:to-rose-900">
                <header className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href={route('home')} className="flex items-center space-x-2 text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300 transition-colors">
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
                                href={route('matchmaking.index')}
                                className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 font-medium transition-colors"
                            >
                                ⭐ Kalkulator Jodoh
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6 py-12">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-red-800 dark:text-red-200 mb-4">
                                💝 Kata Cinta
                            </h1>
                            <p className="text-lg text-red-600 dark:text-red-300">
                                Temukan kata-kata romantis yang indah untuk mengungkapkan perasaanmu!
                            </p>
                        </div>

                        {/* Quote Display */}
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl mb-8 text-center">
                            {quote ? (
                                <div className={`transition-all duration-500 ${showAnimation ? 'animate-pulse scale-105' : ''}`}>
                                    <div className="text-6xl mb-6">💌</div>
                                    <blockquote className="text-xl md:text-2xl text-red-800 dark:text-red-200 font-medium leading-relaxed mb-6 italic">
                                        "{quote}"
                                    </blockquote>
                                    <div className="text-sm text-red-600 dark:text-red-400 mb-6">
                                        Kutipan #{quote_number} dari {total_quotes} koleksi kata cinta
                                    </div>
                                    
                                    {/* Quote Statistics */}
                                    <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 dark:from-red-900/40 dark:to-pink-900/40 rounded-2xl p-4 mb-6">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl mb-1">💖</div>
                                                <div className="text-sm font-medium text-red-800 dark:text-red-200">Romantis</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">✨</div>
                                                <div className="text-sm font-medium text-red-800 dark:text-red-200">Inspiratif</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">🌹</div>
                                                <div className="text-sm font-medium text-red-800 dark:text-red-200">Indah</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-12">
                                    <div className="text-8xl mb-6">💕</div>
                                    <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                                        Siap Menemukan Kata Cinta yang Indah?
                                    </h2>
                                    <p className="text-red-600 dark:text-red-300 mb-8">
                                        Klik tombol di bawah untuk mendapatkan kutipan romantis yang bisa kamu bagikan kepada orang terkasih!
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleGetQuote}
                                disabled={processing}
                                className="rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-red-600 hover:to-pink-600 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {processing ? '💝 Mencari...' : '💝 Tampilkan Kata Cinta'}
                            </button>
                        </div>

                        {/* Quote Actions */}
                        {quote && (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-6 mb-8">
                                <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 text-center">
                                    📱 Bagikan Kata Cinta Ini
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: 'Kata Cinta Romantis',
                                                    text: quote,
                                                    url: window.location.href
                                                });
                                            }
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                                    >
                                        📲 Share
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(quote);
                                            alert('Kata cinta berhasil disalin! 💕');
                                        }}
                                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                                    >
                                        📋 Copy
                                    </button>
                                    <button
                                        onClick={() => {
                                            const text = encodeURIComponent(quote);
                                            window.open(`https://wa.me/?text=${text}`, '_blank');
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                                    >
                                        📱 WhatsApp
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-6 text-center">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-6">
                                🌹 Koleksi Kata Cinta Terbaik
                            </h3>
                            <div className="grid md:grid-cols-4 gap-4 text-sm text-red-600 dark:text-red-300">
                                <div>
                                    <div className="text-3xl mb-2">📚</div>
                                    <div className="font-medium">20+ Kutipan</div>
                                    <div className="text-xs">Koleksi lengkap kata romantis</div>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🎲</div>
                                    <div className="font-medium">Random</div>
                                    <div className="text-xs">Kutipan berbeda setiap klik</div>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">🇮🇩</div>
                                    <div className="font-medium">Bahasa Indonesia</div>
                                    <div className="text-xs">Mudah dipahami dan dirasakan</div>
                                </div>
                                <div>
                                    <div className="text-3xl mb-2">💌</div>
                                    <div className="font-medium">Siap Bagikan</div>
                                    <div className="text-xs">Copy, share, atau kirim WhatsApp</div>
                                </div>
                            </div>
                        </div>

                        {/* Popular Quotes Preview */}
                        <div className="mt-12 bg-gradient-to-r from-red-500/10 to-pink-500/10 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-6 text-center">
                                ⭐ Contoh Kata Cinta dalam Koleksi Kami
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                                    <p className="text-red-700 dark:text-red-300 italic">
                                        "Cinta adalah ketika kebahagiaan seseorang lebih penting daripada kebahagiaanmu sendiri. 💕"
                                    </p>
                                </div>
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                                    <p className="text-red-700 dark:text-red-300 italic">
                                        "Cinta sejati adalah ketika kamu masih jatuh cinta pada orang yang sama setiap hari. 💖"
                                    </p>
                                </div>
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                                    <p className="text-red-700 dark:text-red-300 italic">
                                        "Dalam cinta, yang terpenting bukanlah menemukan seseorang yang sempurna, tetapi seseorang yang sempurna untukmu. ❤️"
                                    </p>
                                </div>
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4">
                                    <p className="text-red-700 dark:text-red-300 italic">
                                        "Rumah bukan tempat, tetapi perasaan. Dan perasaan itu adalah cinta. 🏠💕"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}