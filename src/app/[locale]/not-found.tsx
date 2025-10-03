import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function NotFoundPage(): ReactElement {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-black">{t('title')}</h2>
        <p className="mt-2 text-gray-600">
          {t('description')}
        </p>
        <Link 
          href="/" 
          className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {t('goBack')}
        </Link>
      </div>
    </div>
  );
}