"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisteredPage() {
  const [showSiteShelf, setShowSiteShelf] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setShowSiteShelf(event.clientX <= 56);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010404] px-4 py-10 font-mono">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(111,255,184,0.18)_0%,transparent_38%),radial-gradient(circle_at_80%_18%,rgba(111,255,184,0.12)_0%,transparent_34%),linear-gradient(165deg,#030706_0%,#020b0b_46%,#020606_100%)]" />
      <div className="cyber-vignette pointer-events-none absolute inset-0 -z-10" />
      <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

      <aside
        className={`fixed left-0 top-[40%] z-30 w-[240px] -translate-y-1/2 border border-emerald-300/35 bg-[#040808]/95 p-3 backdrop-blur-sm transition-all duration-500 ease-out ${
          showSiteShelf
            ? "translate-x-0 opacity-100 shadow-[0_0_24px_rgba(111,255,184,0.18)]"
            : "-translate-x-[238px] opacity-95 hover:translate-x-0"
        }`}
      >
        <div className="pointer-events-none absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-full items-center">
          <div
            className={`-ml-px rounded-r-md border border-l-0 border-emerald-300/45 bg-[#040808]/95 px-2 py-3 ${
              showSiteShelf ? "shadow-[0_0_14px_rgba(111,255,184,0.2)]" : ""
            }`}
          >
            <span className="text-sm leading-none text-emerald-200/85">»</span>
          </div>
        </div>
        <p className="mb-2 text-[10px] uppercase tracking-wide text-emerald-200/75">
          Quick Sites
        </p>
        <div className="space-y-2">
          {[
            {
              title: "CASHER COLLECTION",
              url: "https://cashercollection.com",
            },
            {
              title: "GGSEL",
              url: "https://ggsel.net",
            },
          ].map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-emerald-300/30 bg-[#020606] p-3 transition hover:border-emerald-300 hover:bg-emerald-300/10"
            >
              <p className="text-xs font-semibold text-emerald-200">{site.title}</p>
              <p className="mt-1 text-[11px] text-emerald-200/65">{site.url}</p>
            </a>
          ))}
        </div>
      </aside>

      <section className="mx-auto w-full max-w-4xl border border-emerald-300/35 bg-[#040808] p-4 shadow-[0_0_36px_rgba(111,255,184,0.16)] sm:p-6">
        <header className="mb-5 border border-emerald-300/30 bg-[#071010] px-3 py-3">
          <p className="text-[11px] text-emerald-200/80">event_console.exe</p>
          <h1 className="mt-2 text-2xl font-bold tracking-wide text-emerald-200 sm:text-3xl">
            ВЫ ЗАПИСАНЫ
          </h1>
          <p className="mt-2 text-xs text-emerald-200/75">
            [OK] registration packet accepted
          </p>
        </header>

        <div className="space-y-4">
          <div className="border border-emerald-300/25 bg-[#050b0b] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-emerald-200/70">[{">"}] ВАС ОЖИДАЕМ ПО АДРЕСУ</p>
                <p className="mt-2 text-base text-emerald-200">
                  Москва, Большая Новодмитровская улица, 36 ст25
                </p>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <a
                  href="https://yandex.ru/maps/org/casher/136486342827?si=m4u69kzcv9axnjmbumk6whjc14"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Открыть в Яндекс Картах"
                  className="inline-flex h-9 w-9 items-center justify-center border border-emerald-300/35 bg-[#071010] text-emerald-200 transition hover:bg-emerald-300/10"
                  title="Яндекс Карты"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2.7C8.8 2.7 6.2 5.3 6.2 8.5c0 4.4 5.8 12.8 5.8 12.8s5.8-8.4 5.8-12.8c0-3.2-2.6-5.8-5.8-5.8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M9.3 8h5.4M12 8v6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                <a
                  href="https://2gis.ru/moscow/geo/70000001109860385"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Открыть в 2ГИС"
                  className="inline-flex h-9 w-9 items-center justify-center border border-emerald-300/35 bg-[#071010] text-emerald-200 transition hover:bg-emerald-300/10"
                  title="2ГИС"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M7.2 9.4c.3-1.4 1.4-2.2 2.9-2.2 1.7 0 2.9 1 2.9 2.6 0 1.3-.7 2-2 2.8l-1.2.7h3.3v1.5H7.3v-1.3l2.7-1.8c1-.7 1.4-1.1 1.4-1.8 0-.6-.5-1-1.2-1-.8 0-1.3.4-1.5 1.1H7.2Z"
                      fill="currentColor"
                    />
                    <path d="M14.8 14.8h2v-2h-2v2Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-emerald-300/30 bg-[#050b0b]">
            <div className="border-b border-emerald-300/25 bg-[#071010] px-3 py-2">
              <p className="text-xs text-emerald-200/75">[{">"}] MAP: interactive feed</p>
            </div>
            <button
              type="button"
              onClick={() => setShowMap((current) => !current)}
              className="w-full border-b border-emerald-300/25 bg-[#050b0b] px-3 py-3 text-left text-sm text-emerald-200 transition hover:bg-emerald-300/10"
            >
              {showMap ? "СВЕРНУТЬ КАРТУ" : "ОТКРЫТЬ КАРТУ"}
            </button>
            {showMap && (
              <>
                <iframe
                  title="Место проведения на карте"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=37.576194%2C55.799316%2C37.596194%2C55.811316&layer=mapnik&marker=55.805316%2C37.586194"
                  className="h-[360px] w-full"
                  loading="lazy"
                />
                <div className="border-t border-emerald-300/25 px-3 py-2 text-[11px] text-emerald-200/70">
                  marker: Bolshaya Novodmitrovskaya 36 st25
                </div>
              </>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-emerald-300/25 bg-[#050b0b] p-4">
              <p className="text-xs text-emerald-200/70">[{">"}] ВРЕМЯ</p>
              <p className="mt-2 text-sm text-emerald-200">НАЧАЛО В 13:00</p>
            </div>
            <div className="border border-emerald-300/25 bg-[#050b0b] p-4">
              <p className="text-xs text-emerald-200/70">[{">"}] МУЗЫКА</p>
              <p className="mt-2 text-sm text-emerald-200">DJ eewerre</p>
            </div>
          </div>

          <div className="border border-emerald-300/25 bg-[#050b0b] p-4">
            <p className="text-xs text-emerald-200/70">[{">"}] STEAM TOP-UP</p>
            <p className="mt-2 text-sm text-emerald-200">
              Пополнить Steam по 0% можно будет по QR на мероприятии
            </p>
          </div>

          <a
            href="https://t.me/casherxggselbot"
            target="_blank"
            rel="noreferrer"
            className="block w-full border border-emerald-300 bg-emerald-300/90 px-4 py-3 text-center text-sm font-bold tracking-wide text-[#04110c] transition hover:bg-emerald-200"
          >
            ПЕРЕЙТИ В БОТА
          </a>

          <Link
            href="/"
            className="block text-center text-xs text-emerald-200/70 transition hover:text-emerald-200"
          >
            вернуться к форме
          </Link>
        </div>
      </section>
    </main>
  );
}
