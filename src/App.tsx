import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Music, Mail, Crown, Camera, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'envelope' | 'intro' | 'letter' | 'album'>('envelope');
  const [introStep, setIntroStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const constrainedRef = useRef(null);

  const introTexts = [
    "Hai, Mei...",
    "Ini Fajar.",
    "Aku sadar, posisiku sekarang masih sebatas seseorang yang terus berjuang buat dapetin hati kamu...",
    "Kadang rasanya berat, tapi tiap kali ngeliat senyum kamu, aku selalu nemuin alasan buat gak pernah nyerah.",
    "Di usiamu yang genap 25 tahun ini...",
    "Aku sadar betapa beruntungnya aku bisa dipertemukan sama perempuan sehebat kamu.",
    "Mungkin saat ini aku belum bisa selalu menggenggam tanganmu...",
    "Tapi percayalah, rasa sayang dan doaku akan selalu menggenggammu erat dari kejauhan.",
    "Berbahagialah selalu, Dd. Dan selama kamu izinkan, biarkan aku terus berusaha jadi alasan senyum dan bahagiamu, ya?",
    "Happy Birthday Dd 🎉🎂"
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  const handleOpen = () => {
    setView('intro');
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  };

  const handleErrorImage = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string) => {
    if (e.currentTarget.src !== fallbackUrl) {
      e.currentTarget.src = fallbackUrl;
    }
  };

  const triggerConfetti = () => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const particleCount = 50;
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    setTimeout(() => clearInterval(interval), 2000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-rose-200 selection:text-rose-900 bg-cream overflow-hidden relative" ref={constrainedRef}>
      <audio
        ref={audioRef}
        loop
        src="/audio/backsound web.mp3"
      />

      <AnimatePresence mode="wait">
        {view === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center min-h-screen bg-rose-50"
          >
            {/* Sealed Envelope Graphic */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="relative cursor-pointer group"
            >
              <div className="w-72 h-48 bg-[#FFF8F3] rounded-sm shadow-xl border border-rose-100 flex items-center justify-center relative overflow-hidden">
                {/* Envelope fold lines */}
                <div className="absolute top-0 left-0 w-full h-full border-t-[96px] border-l-[144px] border-r-[144px] border-b-[96px] border-t-[#FDF2EC] border-l-[#FFF8F3] border-r-[#FFF8F3] border-b-[#fcf2ed] drop-shadow-sm z-10 pointer-events-none"></div>

                {/* Wax Seal */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-rose-500 w-16 h-16 rounded-full absolute z-20 flex items-center justify-center shadow-lg border-2 border-rose-600"
                >
                  <Heart className="text-white fill-current w-6 h-6" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-16 w-full text-center"
              >
                <p className="font-serif italic text-2xl text-ink">Untuk: Mega Mia Meilani</p>
                <p className="text-sm font-sans tracking-widest uppercase text-rose-400 mt-2 flex items-center justify-center gap-2">
                  Tap untuk membuka <ArrowRight className="w-4 h-4" />
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-ink flex flex-col items-center justify-center p-8 absolute inset-0 z-50 cursor-pointer"
            onClick={() => {
              if (introStep < introTexts.length - 1) {
                setIntroStep(introStep + 1);
              } else {
                setView('letter');
                setTimeout(triggerConfetti, 500);
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={introStep}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.8 }}
                className="text-center w-full"
              >
                <h2 className="font-sans font-medium text-3xl md:text-4xl lg:text-5xl text-rose-100 leading-snug md:leading-relaxed mb-8 max-w-3xl mx-auto px-4 text-balance">
                  {introTexts[introStep]}
                </h2>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute bottom-16 text-rose-300 text-sm tracking-widest font-sans"
            >
              TAP LAYAR UNTUK LANJUT
            </motion.p>
          </motion.div>
        )}

        {view === 'letter' && (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="paper-texture min-h-screen w-full relative pb-32 overflow-x-hidden"
          >
            <div className="max-w-3xl mx-auto px-6 pt-24 relative z-10 flex flex-col items-center">

              {/* Main Heading (Editorial Style) */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-16 relative"
              >
                <motion.div
                  initial={{ rotate: -10, opacity: 0, scale: 0 }}
                  animate={{ rotate: -10, opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="absolute -top-10 -right-2 md:-right-10 bg-yellow-300 text-ink font-handwriting text-xl md:text-2xl px-4 py-1 rounded-sm rotate-12 shadow-sm whitespace-nowrap"
                >
                  Officially 25!
                </motion.div>

                <h1 className="font-serif font-bold text-4xl md:text-7xl text-ink tracking-tight mb-2">
                  Chapter 25.
                </h1>
                <h2 className="font-handwriting text-3xl md:text-5xl text-rose-500 font-bold -mt-2">
                  Mega Mia Meilani
                </h2>
                <div className="w-24 h-[2px] bg-ink mx-auto mt-6 opacity-20"></div>
              </motion.div>

              {/* The Letter (Journal Entry Style) */}
              <motion.div
                initial={{ y: 40, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full max-w-2xl lined-paper px-6 md:px-16 pt-8 pb-12 md:pt-10 md:pb-16 transform md:rotate-1 hover:rotate-0 transition-transform duration-500 relative z-30"
              >
                <div className="washi-tape absolute -top-4 right-6 md:right-10 w-20 md:w-24 h-8 rotate-[5deg]"></div>
                <div className="washi-tape absolute -bottom-4 left-6 md:left-10 w-20 md:w-24 h-8 -rotate-[3deg]"></div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-8 border-b-2 border-dotted border-gray-300 pb-4 sm:pb-2">
                  <span className="font-handwriting text-lg md:text-xl text-ink/70">Jurnal Hari Ini</span>
                  <span className="font-handwriting text-xl md:text-2xl text-rose-400 font-bold">Harinya Mega ✨</span>
                </div>

                <div className="space-y-6 font-sans text-lg text-[#4a3f35] leading-relaxed">
                  <p>
                    <span className="text-2xl">H</span>ai bidadari,
                  </p>

                  <p>
                    Katanya makin gede umur, makin dewasa. Tapi muka kamu kok makin kesini makin ke bayi ya? haha👶🏻
                  </p>

                  <p className="font-bold text-ink mt-8">
                    Di usia ke-25 ini, aku cuma mau bilang:
                  </p>

                  <div className="font-handwriting text-2xl text-ink leading-[1.8] mt-4 space-y-5">
                    <p>
                      Semoga di tahun ini, semua yang kamu semogakan bisa terwujud yaa 🥹
                      Rezekinya makin ngalir deres, kerjaannya makin lancar, kesehatan kamu
                      makin membaik, dan wishlist Shopee-nya bisa ke-checkout satu per satu wkwk.
                    </p>

                    <p>
                      Tetep jadi Mega Mia Meilani yang paling ngangenin, paling random,
                      paling kuat, dan paling cantik versi kamu sendiri 🤍
                      Semoga hati kamu juga selalu dikasih tenang di tengah semua hal yang lagi kamu hadapin.
                    </p>

                    <p>
                      Dan satu hal lagi… jangan pernah ngerasa sendirian yaa.
                      Mungkin aku belum bisa selalu ada di samping kamu secara langsung,
                      tapi doa baik aku bakal selalu nemenin setiap langkah kamu 🫂
                    </p>
                  </div>

                  <p className="pt-8 text-right font-handwriting text-3xl">
                    Happy Birthday, Cantik. ❤️
                  </p>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 mb-12 text-center relative z-40"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('album')}
                  className="bg-ink text-cream hover:bg-rose-600 transition-colors px-6 py-4 md:px-8 rounded-full font-sans font-medium tracking-wide shadow-lg flex items-center justify-center gap-2 md:gap-3 mx-auto group w-full max-w-[280px] md:max-w-none md:w-auto"
                >
                  <Camera className="w-5 h-5 fill-current text-rose-400 group-hover:text-white" />
                  Buka Album Memori 📸
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        )}

        {view === 'album' && (
          <motion.div
            key="album"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", damping: 20 }}
            className="paper-texture min-h-screen w-full relative pt-20 pb-32 overflow-x-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center mb-16 relative">
                <button
                  onClick={() => setView('letter')}
                  className="static w-full text-left md:absolute md:left-0 md:top-2 md:w-auto flex items-center justify-start gap-2 text-ink hover:text-rose-500 transition-colors font-medium mb-6 md:mb-0"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" /> Kembali
                </button>
                <div className="text-center w-full">
                  <h1 className="font-serif font-bold text-4xl md:text-5xl text-ink">
                    Album Galeri
                  </h1>
                  <p className="font-handwriting text-2xl text-rose-500 mt-2">Kumpulan Bukti Kelucuan Mega</p>
                </div>
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-5xl mx-auto">
                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-white p-3 pb-16 polaroid-shadow relative transform -rotate-2 transition-all duration-300 origin-center hover:scale-105 hover:-rotate-1">
                    <div className="washi-tape absolute -top-3 right-4 w-12 h-6 rotate-12 bg-rose-200 z-10"></div>
                    <img src="/img/foto1.jpg" onError={(e) => handleErrorImage(e, "/img/imut2.jpeg")} className="w-full h-auto aspect-auto relative z-0" />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-ink z-10">Lucu amat sih 😤</p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-white p-3 pb-16 polaroid-shadow relative transform rotate-2 transition-all duration-300 origin-center hover:scale-105 hover:rotate-1">
                    <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 -rotate-6 z-10"></div>
                    <img src="/img/foto2.jpg" onError={(e) => handleErrorImage(e, "/img/aura25.jpeg")} className="w-full h-auto aspect-auto filter saturate-150 relative z-0" />
                    <p className="absolute bottom-5 left-0 right-0 text-center font-handwriting text-2xl text-rose-500 font-bold flex justify-center items-center gap-2 z-10">
                      Aura 25 -nya <Crown className="w-5 h-5 text-yellow-500 fill-current" />
                    </p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-white p-3 pb-16 polaroid-shadow relative transform -rotate-3 transition-all duration-300 origin-center hover:scale-105 hover:-rotate-1">
                    <img src="/img/foto3.jpg" onError={(e) => handleErrorImage(e, "/img/ceo.jpeg")} className="w-full h-auto aspect-auto sepia-[0.3] relative z-0" />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-ink z-10">Aura CEO 😝</p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-white p-3 pb-12 polaroid-shadow relative transform rotate-1 transition-all duration-300 origin-center hover:scale-105 hover:rotate-2">
                    <div className="washi-tape absolute -top-4 right-10 w-24 h-6 rotate-3 z-10"></div>
                    <img src="/img/foto4.jpg" onError={(e) => handleErrorImage(e, "/img/bidadari.jpeg")} className="w-full h-auto aspect-auto contrast-110 relative z-0" />
                    <p className="absolute bottom-3 left-0 right-0 text-center font-handwriting text-3xl text-ink z-10">Bidadari jatuh...</p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-ink p-3 pb-14 polaroid-shadow relative transform -rotate-1 transition-all duration-300 origin-center hover:scale-105 hover:rotate-0">
                    <img src="/img/foto5.jpg" onError={(e) => handleErrorImage(e, "/img/lari.jpeg")} className="w-full h-auto aspect-auto grayscale opacity-90 relative z-0" />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-white z-10">Lari... 🖤🏃🏻‍♀️</p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-white p-3 pb-16 polaroid-shadow relative transform rotate-2 transition-all duration-300 origin-center hover:scale-105 hover:rotate-1">
                    <div className="washi-tape absolute -bottom-3 left-4 w-12 h-6 -rotate-12 bg-rose-200 z-10"></div>
                    <img src="/img/foto6.jpg" onError={(e) => handleErrorImage(e, "/img/wle.jpeg")} className="w-full h-auto aspect-auto relative z-0" />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-ink z-10">Wlee</p>
                  </div>
                </div>

                <div className="break-inside-avoid mb-8 relative z-0 hover:z-20">
                  <div className="bg-[#f0fdf4] p-3 pb-16 polaroid-shadow relative transform -rotate-2 transition-all duration-300 origin-center hover:scale-105 hover:-rotate-1">
                    <div className="washi-tape absolute -top-3 right-8 w-16 h-6 rotate-6 bg-green-200 z-10"></div>
                    <img src="/img/foto7.jpg" onError={(e) => handleErrorImage(e, "/img/cool.jpeg")} className="w-full h-auto aspect-auto relative z-0" />
                    <p className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-2xl text-ink z-10">Sok cool abieez</p>
                  </div>
                </div>
              </div>

              <div className="mt-20 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerConfetti}
                  className="bg-rose-500 text-white hover:bg-rose-600 transition-colors px-10 py-4 rounded-full font-sans font-bold tracking-wide shadow-lg inline-flex items-center gap-3"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Love You!
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
