'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Loader2 } from 'lucide-react';

const locales = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'ua', label: 'Українська', flag: '🇺🇦' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
] as const;

export function LocaleSwitcher() {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();

  const handleChange = (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  const currentLocaleData = locales.find((locale) => locale.value === currentLocale);

  return (
    <Select value={currentLocale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Switching...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue>
              {currentLocaleData ? (
                <span className="flex items-center gap-2">
                  <span>{currentLocaleData.flag}</span>
                  <span>{currentLocaleData.label}</span>
                </span>
              ) : (
                'Select language'
              )}
            </SelectValue>
          </div>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('language')}</SelectLabel>
          {locales.map((locale) => (
            <SelectItem key={locale.value} value={locale.value} className="flex items-center gap-2">
              <span className="flex items-center gap-2">
                <span>{locale.flag}</span>
                <span>{locale.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
