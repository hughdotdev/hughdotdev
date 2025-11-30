"use client";

import { Kbd } from "@/components/atoms/kbd";
import { Volume2, VolumeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./credits.module.css";

const AUTHOR = "Hugh Fabre";
const HOLD_DURATION_MS = 1000;
const BGM_URL =
  "https://g5lp1abfa6.ufs.sh/f/6KdjywPidJK33uNREcj6KjiQksDnAFZvclewtRL42uTIG8YJ";

const CREW_ROLES = [
  "Frontend Development",
  "Backend Engineering",
  "UI/UX Design",
  "DevOps & Infrastructure",
  "Database Architecture",
  "API Design",
  "Performance Optimization",
  "Security Engineering",
  "Quality Assurance",
  "Technical Writing",
  "Code Review",
  "Git Management",
  "Deployment Pipeline",
  "Bug Fixing",
  "Feature Planning",
  "Accessibility",
  "SEO Optimization",
  "Analytics Integration",
  "Domain Management",
  "SSL Certificates",
  "Error Handling",
  "Caching Strategy",
  "Dark Mode Implementation",
  "Coffee Consumption",
  "Stack Overflow Research",
  "Rubber Duck Debugging",
];

const CAST_ROLES = [
  "Travis Bickle",
  "Patrick Bateman",
  "Arthur Fleck",
  "Tyler Durden",
  "Vincent Freeman",
  "Louis Bloom",
  "Donnie Darko",
  "Mark Renton",
];

const SPECIAL_THANKS = [
  "Tommy, for the UI components",
  "Caffeine, for the long nights",
  "Stack Overflow, for the answers",
  "Claude Opus 4.5, for the help",
  "React, for the UI",
  "Next.js, for the framework",
  "Tailwind CSS, for the styles",
  "TypeScript, for the types",
  "Git, for the version control",
  "GitHub, for the repository",
  "VSCodium, for the editor",
  "You, for visiting",
];

function useEscapeHold(onComplete: () => void) {
  const [isHolding, setIsHolding] = useState(false);
  const holdStartRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkProgress = () => {
      if (!holdStartRef.current) return;
      if (Date.now() - holdStartRef.current >= HOLD_DURATION_MS) {
        onComplete();
      } else {
        frameRef.current = requestAnimationFrame(checkProgress);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape" && !e.repeat) {
        setIsHolding(true);
        holdStartRef.current = Date.now();
        frameRef.current = requestAnimationFrame(checkProgress);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setIsHolding(false);
        holdStartRef.current = null;
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [onComplete]);

  return isHolding;
}

export default function CreditsPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const navigateHome = useCallback(() => router.push("/"), [router]);
  const isHolding = useEscapeHold(navigateHome);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const content = contentRef.current;
    content?.addEventListener("animationend", navigateHome);

    return () => {
      document.body.style.overflow = "";
      content?.removeEventListener("animationend", navigateHome);
    };
  }, [navigateHome]);

  return (
    <div className={styles.page}>
      <audio ref={audioRef} src={BGM_URL} autoPlay muted />
      <div className={styles.container}>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.spacerFull} />

          <p className={styles.studio}>HUGH FABRE PRODUCTIONS</p>
          <div className={styles.spacerMd} />

          <h1 className={styles.title}>HUGH.DEV</h1>
          <p className={styles.subtitle}>A Hugh Fabre Website</p>
          <div className={styles.spacerLg} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>CAST</h2>
            {CAST_ROLES.map((role) => (
              <div key={role} className={styles.castItem}>
                <span className={styles.castRole}>{role}</span>
                <span className={styles.castDots} />
                <span className={styles.castActor}>{AUTHOR}</span>
              </div>
            ))}
          </section>

          <div className={styles.spacerMd} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>CREW</h2>
            {CREW_ROLES.map((role) => (
              <div key={role} className={styles.crewItem}>
                <p className={styles.crewRole}>{role}</p>
                <p className={styles.crewName}>{AUTHOR}</p>
              </div>
            ))}
          </section>

          <div className={styles.spacerLg} />

          <section className={styles.section}>
            <h2 className={styles.thanksTitle}>SPECIAL THANKS TO</h2>
            {SPECIAL_THANKS.map((name) => (
              <p key={name} className={styles.thanksName}>
                {name}
              </p>
            ))}
          </section>

          <div className={styles.spacerLg} />

          <p className={styles.copyright}>© 2025 Hugh Fabre Productions</p>
          <p className={styles.rights}>All Rights Reserved</p>
          <div className={styles.spacerMd} />

          <p className={styles.end}>THE END</p>
          <div className={styles.spacerLg} />

          <p className={styles.stinger}>
            No animals were harmed in the making of this website.
            <br />
            <br />
            Hugh Fabre performed all his own stunts.
          </p>

          <div className={styles.spacerLg} />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlsRow}>
          <div className={styles.controlsHint}>
            <span>Hold</span>
            <span className="dark">
              <Kbd keys={["ESC"]} active={isHolding} className="text-base" />
            </span>
            <span>to exit</span>
          </div>
          <button
            onClick={toggleMute}
            className={styles.muteButtonDesktop}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
        <div className={styles.controlsMobileRow}>
          <Link href="/" className={styles.controlsLinkMobile}>
            Click here to exit
          </Link>
          <button
            onClick={toggleMute}
            className={styles.muteButtonMobile}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
