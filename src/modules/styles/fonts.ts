import { Lato, Source_Serif_Pro } from 'next/font/google';

export const lato = Lato({
  weight: ['400', '700', '100', '300', '900'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const sourceSerifPro = Source_Serif_Pro({
  weight: ['700', '200', '300', '400', '600', '900'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
