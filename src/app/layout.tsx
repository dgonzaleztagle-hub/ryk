import './globals.css';
/* 
 * Built by HojaCero.cl | Architect of Digital Experiences
 * B2B Enterprise Experience for RYK Construcciones
 */
import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
    title: 'RYK Construcciones | Obras Civiles & Edificación Industrial',
    description: 'Empresa especializada en obras civiles generales, urbanización, pavimentos industriales y terminaciones de alta especificación en Antofagasta y el norte de Chile. Gloria Pizarro E.I.R.L.',
    authors: [{ name: 'HojaCero Team' }, { name: 'RYK Construcciones' }],
    creator: 'HojaCero',
    publisher: 'HojaCero',
    other: {
        "designer": "HojaCero.cl",
        "author": "HojaCero.cl"
    },
    openGraph: {
        title: 'RYK Construcciones | Obras Civiles & Pavimentos Industriales',
        description: 'Construcción industrial, pavimentos allanados, pulido de pisos, revestimientos epóxicos y urbanizaciones en Antofagasta.',
        images: ['/prospectos/ryk/page_1_img_1_Image6.jpg'],
        type: 'website',
    },
};

export default function RYKLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfessionalService',
                '@id': 'https://rykconstrucciones.cl',
                'name': 'RYK Construcciones',
                'image': 'https://hojacero.cl/prospectos/ryk/page_1_img_1_Image6.jpg',
                'description': 'Servicios de Obras Civiles, Pavimentación Industrial, Urbanizaciones y Terminaciones con base en Antofagasta, Chile.',
                'address': {
                    '@type': 'PostalAddress',
                    'addressCountry': 'CL',
                    'addressRegion': 'Antofagasta',
                    'addressLocality': 'Antofagasta',
                    'streetAddress': 'René Perí Fragerström #8876'
                },
                'url': 'https://rykconstrucciones.cl',
                'telephone': '+56 9 3572 2795',
                'priceRange': '$$$$',
                'areaServed': ['Antofagasta', 'Mejillones', 'Calama']
            }
        ]
    };

    return (
    <html lang="es">
      <body>
        <div className={`${outfit.variable} ${jetbrainsMono.variable}`}>
            <Script
                id="ryk-construcciones-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </div>
      </body>
    </html>
  );
}
