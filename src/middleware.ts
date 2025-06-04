// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Создаем интернационализация middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Получаем токен из cookies
  const token = request.cookies.get('authToken')?.value;

  // Публичные страницы (доступны без авторизации)
  const publicPaths = ['/sign-in'];
  
  // Проверяем публичные пути с учетом локали
  const isPublicPath = publicPaths.some(path => {
    // Проверяем как с локалью так и без неё
    return pathname === path || pathname.match(new RegExp(`^/(en|ua|ru)${path}$`));
  });

  // Если не авторизован и НЕ на публичной странице - редирект на логин
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/sign-in', request.url);
    // Сохраняем текущую локаль если есть
    const locale = pathname.split('/')[1];
    if (['en', 'ua', 'ru'].includes(locale)) {
      loginUrl.pathname = `/${locale}/sign-in`;
    }
    return NextResponse.redirect(loginUrl);
  }

  // Если авторизован и на странице логина - редирект на главную
  if (token && isPublicPath) {
    const homeUrl = new URL('/', request.url);
    // Сохраняем текущую локаль если есть
    const locale = pathname.split('/')[1];
    if (['en', 'ua', 'ru'].includes(locale)) {
      homeUrl.pathname = `/${locale}/`;
    }
    return NextResponse.redirect(homeUrl);
  }

  // Применяем интернационализацию middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};