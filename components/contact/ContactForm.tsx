'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './contact.module.css';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const translations = useTranslations('Contact');

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={styles.form} onSubmit={submitDemo}>
      <div className={styles.fieldRow}>
        <label>
          <span>{translations('name')}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{translations('email')}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>{translations('subject')}</span>
        <input name="subject" required />
      </label>
      <label>
        <span>{translations('message')}</span>
        <textarea name="message" rows={6} required />
      </label>
      <div className={styles.formFooter}>
        <Button type="submit">
          <Send aria-hidden="true" />
          {translations('send')}
        </Button>
        <p>{submitted ? translations('success') : translations('demoNotice')}</p>
      </div>
    </form>
  );
}
