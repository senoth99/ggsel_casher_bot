"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeFriendButton, setActiveFriendButton] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSiteShelf, setShowSiteShelf] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [showInvalidSubmitOverlay, setShowInvalidSubmitOverlay] = useState(false);
  const invalidOverlayTimeoutRef = useRef<number | null>(null);
  const router = useRouter();
  const isEmailValid = /^[^\s@]+@[^\s@]+\.(ru|com)$/i.test(email.trim());
  const isFormValid =
    name.trim().length > 0 &&
    telegram.trim().length > 0 &&
    email.trim().length > 0 &&
    isEmailValid;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setShowSiteShelf(event.clientX <= 56);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => {
      if (invalidOverlayTimeoutRef.current) {
        window.clearTimeout(invalidOverlayTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTriedSubmit(true);
    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/registered");
    }, 1700);
  };

  const triggerInvalidSubmitOverlay = () => {
    if (invalidOverlayTimeoutRef.current) {
      window.clearTimeout(invalidOverlayTimeoutRef.current);
    }

    setShowInvalidSubmitOverlay(true);
    invalidOverlayTimeoutRef.current = window.setTimeout(() => {
      setShowInvalidSubmitOverlay(false);
    }, 1500);
  };

  useEffect(() => {
    const handleGlobalEnter = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || isFormValid || isSubmitting) {
        return;
      }

      const active = document.activeElement as HTMLElement | null;
      const isTypingField =
        !!active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          active.isContentEditable);

      if (isTypingField) {
        return;
      }

      event.preventDefault();
      setTriedSubmit(true);
      triggerInvalidSubmitOverlay();
    };

    window.addEventListener("keydown", handleGlobalEnter);
    return () => window.removeEventListener("keydown", handleGlobalEnter);
  }, [isFormValid, isSubmitting]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010404] px-4 py-10 font-mono">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_16%_22%,rgba(111,255,184,0.2)_0%,transparent_38%),radial-gradient(circle_at_82%_20%,rgba(111,255,184,0.14)_0%,transparent_36%),radial-gradient(circle_at_50%_110%,rgba(111,255,184,0.16)_0%,transparent_45%),linear-gradient(165deg,#030706_0%,#020b0b_45%,#020606_100%)]" />
      <div className="cyber-vignette pointer-events-none absolute inset-0 -z-20" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1]">
        <Image
          src="/visual-effects.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>
      <div className="pointer-events-none absolute -left-24 top-20 hidden h-72 w-72 rounded-full bg-emerald-400/12 blur-[70px] lg:block" />
      <div className="pointer-events-none absolute -right-24 top-1/3 hidden h-80 w-80 rounded-full bg-emerald-400/10 blur-[84px] lg:block" />
      <div className="pointer-events-none absolute -left-20 bottom-6 hidden h-64 w-64 rounded-full bg-emerald-400/8 blur-[78px] xl:block" />
      <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-15" />
      <pre className="pointer-events-none absolute left-6 top-6 hidden text-[11px] leading-4 text-emerald-300/35 xl:block">
        {`$ init event_console
$ loading protocol: ggsel/casher
$ status: online`}
      </pre>
      <pre className="pointer-events-none absolute right-7 top-8 hidden text-[10px] leading-4 text-emerald-200/20 lg:block">
        {`[sys] channel encrypted
[net] uplink stable
[gpu] render pipeline: crt`}
      </pre>
      <pre className="pointer-events-none absolute bottom-8 left-8 hidden text-[10px] leading-4 text-emerald-200/16 xl:block">
        {`# queue monitor
ticket: 0231 READY
ticket: 0232 READY
ticket: 0233 WAIT`}
      </pre>
      <pre className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 text-[10px] leading-4 text-emerald-200/14 xl:block">
        {`$ module: backdrop
$ noise: enabled
$ bloom: low
$ chroma: 0.12`}
      </pre>
      <aside
        className={`fixed left-0 top-[40%] z-30 w-[240px] -translate-y-1/2 border border-emerald-300/35 bg-[#040808]/95 p-3 transition-all duration-500 ease-out ${
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

      <section className="relative w-full max-w-3xl border border-emerald-300/35 bg-[#040808] p-4 shadow-[0_0_36px_rgba(45,255,160,0.1)] sm:p-6">
        <div className="mb-5 border border-emerald-300/30 bg-[#071010] px-3 py-2">
          <div className="flex items-center justify-between text-[11px] text-emerald-200/90">
            <span>event_console.exe</span>
            <span>secure session: active</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-300/50" />
            <span className="h-2 w-2 rounded-full bg-emerald-300/30" />
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 border border-emerald-300/25 bg-[#050b0b] px-4 py-5">
          <div className="logo-float opacity-85">
            <Image
              src="/logo.png"
              alt="CASHER x GGSEL logo"
              width={84}
              height={84}
              unoptimized
              priority
            />
          </div>
          <h1 className="text-center text-2xl font-bold tracking-wide text-emerald-300 sm:text-3xl">
            ЗАПИСЬ НА МЕРОПРИЯТИЕ
          </h1>
          <pre className="ascii-title border border-emerald-300/30 bg-[#081212] px-3 py-2 text-center text-[10px] leading-3 text-emerald-200/70">
            {String.raw`PRESS ENTER TO JOIN`}
          </pre>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSubmitting ? (
            <div className="border border-emerald-300/30 bg-[#050b0b] px-3 py-4 text-xs text-emerald-200/90">
              <p className="console-loader">[SYS] validating inputs...</p>
              <p className="console-loader-delay">[NET] opening secure channel...</p>
              <p className="console-loader-delay-2">[OK] writing registration packet...</p>
            </div>
          ) : (
            <>
              <label className="block text-xs text-emerald-200/80">[{">"}] ИМЯ</label>
              <div className="flex w-full items-center gap-2 border border-emerald-400/35 bg-[#070a0a] px-3 py-2 text-sm text-emerald-100 transition focus-within:border-emerald-300">
                <span className="text-emerald-200/75">{">"}</span>
                <input
                  type="text"
                  placeholder="имя"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full bg-transparent text-emerald-100 outline-none placeholder:text-emerald-200/45"
                />
              </div>
              <label className="block text-xs text-emerald-200/80">
                [{">"}] TELEGRAM USERNAME
              </label>
              <div className="flex w-full items-center gap-2 border border-emerald-400/35 bg-[#070a0a] px-3 py-2 text-sm text-emerald-100 transition focus-within:border-emerald-300">
                <span className="text-emerald-200/75">{">"}</span>
                <input
                  type="text"
                  placeholder="@username"
                  required
                  value={telegram}
                  onChange={(event) => setTelegram(event.target.value)}
                  className="w-full bg-transparent text-emerald-100 outline-none placeholder:text-emerald-200/45"
                />
              </div>
              <label className="block text-xs text-emerald-200/80">[{">"}] EMAIL</label>
              <div className="flex w-full items-center gap-2 border border-emerald-400/35 bg-[#070a0a] px-3 py-2 text-sm text-emerald-100 transition focus-within:border-emerald-300">
                <span className="text-emerald-200/75">{">"}</span>
                <input
                  type="email"
                  placeholder="your@email.ru"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-emerald-100 outline-none placeholder:text-emerald-200/45"
                />
              </div>
              {triedSubmit && email.trim().length > 0 && !isEmailValid && (
                <p className="text-xs text-emerald-200/70">
                  Введите почту в формате `name@domain.ru` или `name@domain.com`
                </p>
              )}

              <div className="border border-emerald-300/25 bg-[#050b0b] p-4">
                <p className="mb-3 text-sm font-medium text-emerald-200">
                  Добавить друзей:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() =>
                        setActiveFriendButton((current) =>
                          current === count ? null : count
                        )
                      }
                      className={`px-3 py-2 text-sm font-semibold transition ${
                        activeFriendButton === count
                          ? "border border-emerald-300 bg-emerald-400/10 text-emerald-200 shadow-[0_0_0_1px_rgba(110,255,182,0.55)]"
                          : "border border-emerald-300/30 bg-[#070a0a] text-emerald-200/70 hover:border-emerald-400/45 hover:text-emerald-200"
                      }`}
                    >
                      +{count}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full border px-4 py-3 text-sm font-bold tracking-wide transition ${
                  !isFormValid || isSubmitting
                    ? "cursor-not-allowed border-emerald-300/35 bg-emerald-300/25 text-emerald-200/55"
                    : "border-emerald-300 bg-emerald-300/90 text-[#04110c] hover:bg-emerald-200"
                }`}
              >
                {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАЯВКУ"}
              </button>
            </>
          )}
        </form>
      </section>

      {showInvalidSubmitOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020606]/92 px-4">
          <div className="w-full max-w-2xl border border-emerald-300/35 bg-[#040808] p-5 text-sm text-emerald-200 shadow-[0_0_34px_rgba(111,255,184,0.16)]">
            <p className="console-loader">[SYS] input check failed...</p>
            <p className="console-loader-delay">[WARN] required fields are empty...</p>
            <p className="console-loader-delay-2">[HINT] fill name, telegram, email and retry.</p>
          </div>
        </div>
      )}
    </main>
  );
}
