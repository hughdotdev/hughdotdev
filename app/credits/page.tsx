"use client";

import { Kbd } from "@/components/atoms/kbd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./credits.module.css";

const AUTHOR = "Hugh Fabre";
const HOLD_DURATION_MS = 2000;

const CREW_ROLES = [
  "Directed by",
  "Written by",
  "Produced by",
  "Executive Producer",
  "Director of Photography",
  "Production Design",
  "Film Editing",
  "Casting by",
  "Costume Design",
  "Music by",
  "Sound Design",
  "Visual Effects Supervisor",
  "Art Direction",
  "Set Decoration",
  "Makeup Department Head",
  "Stunt Coordinator",
  "Second Unit Director",
  "Script Supervisor",
  "Location Manager",
  "Catering",
  "Best Boy",
  "Gaffer",
  "Key Grip",
  "Foley Artist",
  "Color Grading",
  "Title Design",
  "Marketing",
  "Distribution",
  "Legal",
  "Coffee Runner",
];

const CAST_ROLES = [
  "Travis Bickle",
  "Patrick Bateman",
  "Arthur Fleck",
  "Tyler Durden",
  "Vincent Freeman",
  'Louis "Lou" Bloom',
  "Donnie Darko",
  "Mark Renton",
];

const SPECIAL_THANKS = [
  "Hugh Fabre",
  "Coffee",
  "Late Nights",
  "Stack Overflow",
  "You, for watching",
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

  const navigateHome = useCallback(() => router.push("/"), [router]);
  const isHolding = useEscapeHold(navigateHome);

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
      <div className={styles.container}>
        <div className={styles.content} ref={contentRef}>
          <div className={styles.spacerFull} />

          <p className={styles.studio}>HUGH FABRE PRODUCTIONS</p>
          <div className={styles.spacerMd} />

          <h1 className={styles.title}>HUGH.DEV</h1>
          <p className={styles.subtitle}>A Hugh Fabre Film</p>
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
        <div className={styles.controlsHint}>
          <span>Hold</span>
          <span className="dark">
            <Kbd keys={["ESC"]} active={isHolding} className="text-base" />
          </span>
          <span>for 2s to exit</span>
        </div>
        <Link href="/" className={styles.controlsLink}>
          Or click here
        </Link>
      </div>
    </div>
  );
}
