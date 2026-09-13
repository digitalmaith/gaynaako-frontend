import React, { useState } from "react";
import videoBackground from "@/assets/viddeo.mp4";

// 🎨 Palette de la marque (extraite du logo)
const BRAND = {
  navy: "#1E2B7A",
  orange: "#E87722",
  navyLight: "#3A4BA8",
  navySoft: "#EEF0FA",
  orangeSoft: "#FDF0E6",
};

// 🏦 Organismes de financement
const FUNDING_ORGS = [
  { short: "DER", full: "DER/FJ", color: BRAND.navy },
  { short: "3FPT", full: "3FPT", color: BRAND.orange },
  { short: "PME", full: "Senegal PME", color: BRAND.navyLight },
  { short: "FONGIP", full: "FONGIP", color: BRAND.orange },
  { short: "ADEPME", full: "ADEPME", color: BRAND.navy },
  { short: "FONSIS", full: "FONSIS", color: BRAND.orange },
  { short: "ARCOP", full: "ARCOP", color: BRAND.navyLight },
  { short: "MP", full: "Marchés Publics", color: BRAND.navy },
];

function FundingBadge({ org, counterClass }) {
  return (
    <div
      className={`${counterClass} flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/40 ring-1 ring-slate-100 pointer-events-auto`}
      title={org.full}
    >
      <span
        className="text-[9px] font-bold leading-none tracking-tight"
        style={{ color: org.color }}
      >
        {org.short}
      </span>
    </div>
  );
}

export function HeroSection() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Recherche envoyée à l'IA :", message);
    setMessage("");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFBFD] pb-5 pt-32 md:pt-30">
      
      {/* --- ANIMATIONS --- */}
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .orbit-1 { animation: orbit-cw 30s linear infinite; }
        .orbit-2 { animation: orbit-ccw 45s linear infinite; }
        .orbit-3 { animation: orbit-cw 60s linear infinite; }
        .orbit-4 { animation: orbit-ccw 80s linear infinite; }
        
        .counter-1 { animation: orbit-ccw 30s linear infinite; }
        .counter-2 { animation: orbit-cw 45s linear infinite; }
        .counter-3 { animation: orbit-ccw 60s linear infinite; }
        .counter-4 { animation: orbit-cw 80s linear infinite; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .circle-spin { animation: spin-slow 80s linear infinite; }
        .circle-spin-reverse { animation: spin-slow-reverse 120s linear infinite; }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .logo-shimmer {
          background: linear-gradient(
            90deg,
            ${BRAND.navy} 0%,
            ${BRAND.navy} 40%,
            ${BRAND.orange} 50%,
            ${BRAND.navy} 60%,
            ${BRAND.navy} 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .logo-pulse {
          animation: pulse-logo 3s ease-in-out infinite;
        }
        .logo-pulse:nth-child(2n) { animation-delay: 0.3s; }
        .logo-pulse:nth-child(3n) { animation-delay: 0.6s; }
        .logo-pulse:nth-child(4n) { animation-delay: 0.9s; }
        .logo-pulse:nth-child(5n) { animation-delay: 1.2s; }
        
        .orbit-system:hover .orbit-1,
        .orbit-system:hover .orbit-2,
        .orbit-system:hover .orbit-3,
        .orbit-system:hover .orbit-4,
        .orbit-system:hover .counter-1,
        .orbit-system:hover .counter-2,
        .orbit-system:hover .counter-3,
        .orbit-system:hover .counter-4 {
          animation-play-state: paused;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- VIDÉO EN ARRIÈRE-PLAN --- */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src={videoBackground} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${BRAND.navySoft}55 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* --- SYSTÈME D'ORBITES --- */}
      <div className="orbit-system pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        
        <div className="orbit-1 absolute h-125 w-125 rounded-full border border-dashed" style={{ borderColor: `${BRAND.navy}33` }}>
          <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.navy}66` }} />
          <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full" style={{ background: `${BRAND.navy}66` }} />
        </div>
        <div className="orbit-2 absolute h-175 w-175 rounded-full border border-dashed" style={{ borderColor: `${BRAND.navy}2B` }}>
          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.orange}66` }} />
          <div className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.orange}66` }} />
        </div>
        <div className="orbit-3 absolute h-225 w-225 rounded-full border border-dashed" style={{ borderColor: `${BRAND.navy}22` }}>
          <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.navy}55` }} />
          <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full" style={{ background: `${BRAND.navy}55` }} />
        </div>
        <div className="orbit-4 absolute h-275 w-275 rounded-full border border-dashed" style={{ borderColor: `${BRAND.orange}22` }}>
          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.orange}55` }} />
          <div className="absolute right-0 top-1/2 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `${BRAND.orange}55` }} />
        </div>

        <div className="circle-spin-reverse absolute h-150 w-150 rounded-full border border-dotted" style={{ borderColor: `${BRAND.navy}15` }} />
        <div className="circle-spin absolute h-200 w-200 rounded-full border border-dotted" style={{ borderColor: `${BRAND.orange}12` }} />
        <div className="circle-spin-reverse absolute h-250 w-250 rounded-full border border-dotted" style={{ borderColor: `${BRAND.navy}10` }} />
        <div className="circle-spin absolute h-325 w-325 rounded-full" style={{ borderColor: `${BRAND.navy}08`, border: '1px solid' }} />
        <div className="circle-spin-reverse absolute h-400 w-400 rounded-full" style={{ borderColor: `${BRAND.orange}08`, border: '1px solid' }} />

        <div className="orbit-1 absolute h-125 w-125">
          <div className="absolute right-[7%] top-[7%] -translate-y-1/2 translate-x-1/2">
            <FundingBadge org={FUNDING_ORGS[0]} counterClass="counter-1" />
          </div>
          <div className="absolute bottom-[7%] left-[7%] -translate-y-1/2 -translate-x-1/2">
            <FundingBadge org={FUNDING_ORGS[1]} counterClass="counter-1" />
          </div>
        </div>

        <div className="orbit-2 absolute h-175 w-175">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FundingBadge org={FUNDING_ORGS[2]} counterClass="counter-2" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <FundingBadge org={FUNDING_ORGS[3]} counterClass="counter-2" />
          </div>
        </div>

        <div className="orbit-3 absolute h-225 w-225">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <FundingBadge org={FUNDING_ORGS[4]} counterClass="counter-3" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <FundingBadge org={FUNDING_ORGS[5]} counterClass="counter-3" />
          </div>
        </div>

        <div className="orbit-4 absolute h-275 w-275">
          <div className="absolute left-[7%] top-[7%] -translate-x-1/2 -translate-y-1/2">
            <FundingBadge org={FUNDING_ORGS[6]} counterClass="counter-4" />
          </div>
          <div className="absolute bottom-[7%] right-[7%] translate-x-1/2 translate-y-1/2">
            <FundingBadge org={FUNDING_ORGS[7]} counterClass="counter-4" />
          </div>
        </div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 text-center">
        
        {/* Badge de confiance */}
        <div className="mb-6 flex items-center justify-center gap-6 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: BRAND.navy }}>+500</span> opportunités
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: BRAND.navy }}>8</span> organismes partenaires
          </div>
        </div>

        {/* Titre */}
        <h1
          className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl"
          style={{ color: BRAND.navy }}
        >
          Les bonnes {" "}
          <span className="relative inline-block" style={{ color: BRAND.orange }}>
            Opportunity
          </span>{" "}
          Au bon moment
        </h1>

        {/* Sous-titre */}
        <p className="mx-auto mt-6 max-w-2xl text-md text-slate-600">
        </p>

        {/* --- CHAMP DE MESSAGE + BOUTON INSCRIPTION --- */}
        <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center gap-3 sm:flex-row">
          
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-1.5 pl-5 shadow-lg shadow-slate-200/50 backdrop-blur-md transition focus-within:shadow-xl"
            style={{ borderColor: 'transparent' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.orange)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.orange})`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex : Je cherche un financement pour une PME agricole..."
              className="flex-1 bg-transparent py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            
            <button
              type="submit"
              disabled={!message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: BRAND.navy }}
              aria-label="Rechercher"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          <button
            className="w-full shrink-0 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl sm:w-auto"
            style={{
              background: BRAND.orange,
              boxShadow: `0 10px 25px -5px ${BRAND.orange}66`,
            }}
          >
            Créer mon compte
          </button>
        </div>

        {/* Cartes superposées */}
        <div className="relative mx-auto mt-7 h-20 w-full max-w-105">
          <div
            className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
            style={{ background: `${BRAND.orange}33` }}
          />
          <div
            className="absolute left-1/2 top-1/3 h-50 w-50 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
            style={{ background: `${BRAND.navy}22` }}
          />
          
          <div className="absolute left-1/2 top-15 w-85 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: BRAND.orangeSoft, color: BRAND.orange }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-900">Nouvelle opportunité détectée</p>
                <p className="text-xs text-slate-400">DER/FJ · Subvention agricole · Il y a 2h</p>
              </div>
            </div>
          </div>
          
          <div className="absolute left-1/2 top-0 z-10 w-90 -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/50">
            <div className="flex items-start gap-3">
              <div className="relative">
                <img src="https://png.pngtree.com/background/20250111/original/pngtree-smiling-young-black-man-wearing-a-hat-captured-in-profile-photo-picture-image_13525719.jpg" alt="Mamadou Samb" className="h-10 w-10 rounded-full object-cover" />
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white"
                  style={{ background: BRAND.orange }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-900">Mamadou Samb</p>
                <p className="text-xs text-slate-400">Candidature soumise · 3FPT · Il y a 5 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- ORGANISMES PARTENAIRES (MARQUEE) --- */}
        <div className="mt-22">
          <p className="mb- text-sm text-slate-400">
            Connecté aux principaux organismes de financement du Sénégal
          </p>
          
          <div className="marquee-container relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-16 py-4 mt-2">
              {[...Array(2)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {["DER/FJ","3FPT","Senegal PME","FONGIP","ADEPME","FONSIS","ARCOP","marchespublics.sn"].map((logo, i) => (
                    <span
                      key={`${setIndex}-${i}`}
                      className="logo-shimmer logo-pulse cursor-default text-xl font-bold tracking-tight"
                    >
                      {logo}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}