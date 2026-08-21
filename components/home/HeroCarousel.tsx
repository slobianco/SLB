'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import styles from './heroCarousel.module.css';

export type HeroCta = {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: 'primary' | 'secondary';
};

export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  intro: string;
  ctas: HeroCta[];
};

const AUTO_ADVANCE_MS = 7000;

export function HeroCarousel({
  slides,
  previousLabel,
  nextLabel,
  slideLabels,
}: {
  slides: HeroSlide[];
  previousLabel: string;
  nextLabel: string;
  slideLabels: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const slide = slides[activeIndex];

  function goTo(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        key={slide.image}
        className={styles.slide}
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1}/${slides.length}`}
      >
        {/* Only one slide is ever mounted at a time, so it must always load eagerly —
            a non-active slide's <img> would never become visible to trigger lazy-loading. */}
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          sizes="100vw"
          className={styles.kenBurns}
        />
        <div className={styles.heroOverlay} />
        <Container className={styles.heroContent}>
          <p className={styles.eyebrow}>{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className={styles.heroIntro}>{slide.intro}</p>
          <div className={styles.heroActions}>
            {slide.ctas.map((cta) => (
              <Button key={cta.href} href={cta.href} variant={cta.variant ?? 'primary'}>
                {cta.icon}
                {cta.label}
              </Button>
            ))}
          </div>
        </Container>
      </div>

      {slides.length > 1 ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(activeIndex - 1)}
            aria-label={previousLabel}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className={styles.dots}>
            {slides.map((slideItem, index) => (
              <button
                key={slideItem.image}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                onClick={() => goTo(index)}
                aria-label={slideLabels[index]}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(activeIndex + 1)}
            aria-label={nextLabel}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <span className={styles.heroIndex} aria-hidden="true">
        CR / {String(activeIndex + 1).padStart(2, '0')}
      </span>
    </section>
  );
}
