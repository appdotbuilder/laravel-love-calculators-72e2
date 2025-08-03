import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="💕 Love Calculator - Hitung Cinta Kalian">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 dark:from-pink-900 dark:via-rose-900 dark:to-red-900">
                <header className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">💕</span>
                            <span className="text-xl font-bold text-rose-800 dark:text-rose-200">Love Calculator</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-full bg-white/80 px-6 py-2 text-sm font-medium text-rose-800 shadow-md transition-all hover:bg-white hover:shadow-lg dark:bg-gray-800/80 dark:text-rose-200 dark:hover:bg-gray-800"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-full px-6 py-2 text-sm font-medium text-rose-700 transition-colors hover:text-rose-800 dark:text-rose-300 dark:hover:text-rose-200"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-full bg-rose-500 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-rose-600 hover:shadow-xl"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-rose-800 dark:text-rose-200 mb-6">
                            💕 Love Calculator
                        </h1>
                        <p className="text-xl text-rose-600 dark:text-rose-300 mb-8 max-w-2xl mx-auto">
                            Temukan seberapa cocok kamu dengan pasanganmu! Hitung persentase cinta, kompatibilitas berdasarkan tanggal lahir, dan dapatkan kata-kata cinta yang romantis.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={route('love-calculator.index')}
                                className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-2xl hover:scale-105"
                            >
                                ❤️ Kalkulator Cinta
                            </Link>
                            <Link
                                href={route('matchmaking.index')}
                                className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl hover:scale-105"
                            >
                                ⭐ Kalkulator Jodoh
                            </Link>
                            <Link
                                href={route('love-quotes.index')}
                                className="inline-block rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:from-red-600 hover:to-pink-600 hover:shadow-2xl hover:scale-105"
                            >
                                💝 Kata Cinta
                            </Link>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
                            <div className="text-6xl mb-4">❤️</div>
                            <h3 className="text-2xl font-bold text-rose-800 dark:text-rose-200 mb-4">Kalkulator Cinta</h3>
                            <p className="text-rose-600 dark:text-rose-300 mb-6">
                                Masukkan nama kamu dan pasangan untuk mengetahui persentase cinta kalian dengan animasi hati yang romantis!
                            </p>
                            <div className="space-y-2 text-sm text-rose-500 dark:text-rose-400">
                                <div>✨ Hasil yang konsisten</div>
                                <div>💕 Pesan romantis</div>
                                <div>🎯 Animasi hati</div>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
                            <div className="text-6xl mb-4">⭐</div>
                            <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">Kalkulator Jodoh</h3>
                            <p className="text-purple-600 dark:text-purple-300 mb-6">
                                Gunakan tanggal lahir untuk menghitung kompatibilitas berdasarkan astrologi dan numerologi!
                            </p>
                            <div className="space-y-2 text-sm text-purple-500 dark:text-purple-400">
                                <div>🌟 Analisis astrologi</div>
                                <div>🔢 Perhitungan numerologi</div>
                                <div>💫 Saran kompatibilitas</div>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
                            <div className="text-6xl mb-4">💝</div>
                            <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">Kata Cinta</h3>
                            <p className="text-red-600 dark:text-red-300 mb-6">
                                Dapatkan kata-kata cinta yang indah dan romantis untuk mengungkapkan perasaanmu!
                            </p>
                            <div className="space-y-2 text-sm text-red-500 dark:text-red-400">
                                <div>📝 20+ kutipan romantis</div>
                                <div>🎲 Random setiap klik</div>
                                <div>🌹 Dalam bahasa Indonesia</div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-12 shadow-2xl text-center">
                        <h2 className="text-3xl font-bold text-rose-800 dark:text-rose-200 mb-8">
                            🌈 Siap Menemukan Cinta Sejati?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-6">
                                    <div className="text-4xl mb-2">95%</div>
                                    <div className="text-sm">Tingkat Cinta</div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
                                    <div className="text-4xl mb-2">88%</div>
                                    <div className="text-sm">Kompatibilitas</div>
                                </div>
                            </div>
                            <div className="space-y-4 text-left">
                                <div className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/50 dark:to-pink-900/50 rounded-2xl p-6">
                                    <p className="text-rose-800 dark:text-rose-200 italic">
                                        "Cinta sejati adalah ketika kamu masih jatuh cinta pada orang yang sama setiap hari. 💖"
                                    </p>
                                </div>
                                <p className="text-rose-600 dark:text-rose-300">
                                    Mulai perjalanan cinta kamu sekarang juga! Temukan seberapa cocok kamu dengan orang terkasih.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="container mx-auto px-6 py-8 text-center">
                    <p className="text-rose-600 dark:text-rose-300">
                        Dibuat dengan 💕 untuk semua orang yang percaya pada cinta sejati
                    </p>
                </footer>
            </div>
        </>
    );
}