import { Mail } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/contact/ContactForm';
import { SocialGrid } from '@/components/contact/SocialGrid';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { getSocialLinks } from '@/lib/data';
import { getLocale } from '@/lib/i18n/locale';
import { getPageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = await getLocale(params);
  return getPageMetadata(locale, 'contact', '/contact');
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await getLocale(params);
  setRequestLocale(locale);
  const translations = await getTranslations({ locale, namespace: 'Contact' });

  return (
    <main id="main-content">
      <PageIntro
        eyebrow={translations('eyebrow')}
        title={translations('title')}
        intro={translations('intro')}
      />
      <section className={styles.contactSection}>
        <Container className={styles.contactGrid}>
          <div>
            <ContactForm />
          </div>
          <aside className={styles.contactAside}>
            <div className={styles.emailBlock}>
              <Mail aria-hidden="true" />
              <div>
                <h2>{translations('press')}</h2>
                <a href={`mailto:${translations('pressEmail')}`}>{translations('pressEmail')}</a>
                <p>{translations('emailNote')}</p>
              </div>
            </div>
            <div>
              <h2 className={styles.socialTitle}>{translations('social')}</h2>
              <SocialGrid links={getSocialLinks()} />
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
