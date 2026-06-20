import { Public_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import { ThemeProvider } from '@/components/app/theme-provider';
import { ThemeToggle } from '@/components/app/theme-toggle';
import { cn } from '@/lib/shadcn/utils';
import { getAppConfig, getStyles } from '@/lib/utils';

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
});

const commitMono = localFont({
  display: 'swap',
  variable: '--font-commit-mono',
  src: [
    {
      path: '../fonts/CommitMono-400-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-700-Regular.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/CommitMono-400-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/CommitMono-700-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const styles = getStyles(appConfig);
  const { pageTitle, pageDescription, companyName, logo, logoDark } = appConfig;

  return (
          <><><header className="fixed top-0 left-0 z-50 hidden w-full flex-row justify-between p-6 md:flex">
      <a
        href="#"
        className="scale-100 transition-transform duration-300 hover:scale-110"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${companyName} Logo`} className="block size-16 dark:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDark ?? logo}
          alt={`${companyName} Logo`}
          className="hidden size-16 dark:block" />
      </a>
    </header><footer className="fixed bottom-0 left-0 z-50 hidden w-full justify-center p-4 md:flex">
        <span className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
          Powered by RGUKT RK Valley | Nuzvid | Ongole | Srikakulam
        </span>
      </footer></><ThemeProvider
        attribute="class"
        defaultTheme="light" // force light mode
        enableSystem={false} // disable system theme detection
        disableTransitionOnChange
      >
        {children}

        {/* Remove the ThemeToggle component */}
      </ThemeProvider></>
  );
}
