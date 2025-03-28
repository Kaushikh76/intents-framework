import { NextRequest, NextResponse } from 'next/server';

export const config = {
  // only run on the index
  matcher: '/',
};

// These country lists are kept for reference but won't be used in local dev
const BLOCKED_COUNTRIES = [
  'CU', // Cuba
  'KP', // North Korea
  'RU', // Russia
  'AF', // Afghanistan
  'BY', // Belarus
  'BA', // Bosnia & Herzegovina
  'CF', // Central African Republic
  'CD', // Democratic Republic of the Congo
  'GN', // Guinea
  'GW', // Guinea-Bissau
  'HT', // Haiti
  'IQ', // Iraq
  'LB', // Lebanon
  'LY', // Libya
  'ML', // Mali
  'NI', // Nicaragua
  'SO', // Somalia
  'SS', // South Sudan
  'SD', // Sudan
  'VE', // Venezuela
  'YE', // Yemen
  'ZW', // Zimbabwe
  'MM', // Myanmar
  'SY', // Syria
];

const BLOCKED_REGIONS = [
  {
    country: 'UA', // Ukraine
    regions: [
      '43', // Crimea
      '14', // Donetsk
      '09', // Luhansk
    ],
  },
];

export async function middleware(req: NextRequest) {
  // For local development, simply pass through all requests
  // This avoids errors related to Vercel Edge Config and geolocation
  return NextResponse.next();
  
  // If you need to deploy to Vercel in the future, uncomment the code below
  // and make sure you have the proper environment setup for Edge Config
  
  /*
  // country restriction
  try {
    const { country, region } = geolocation(req);
    
    if (country && BLOCKED_COUNTRIES.includes(country)) {
      return NextResponse.redirect(new URL('/blocked', req.url));
    }

    if (
      country &&
      region &&
      BLOCKED_REGIONS.find((x) => x.country === country)?.regions.includes(region)
    ) {
      return NextResponse.redirect(new URL('/blocked', req.url));
    }
    
    // maintenance mode
    try {
      const isInMaintenanceMode = await get<boolean>('isInMaintenanceMode');
      
      if (isInMaintenanceMode) {
        req.nextUrl.pathname = '/maintenance';
        return NextResponse.rewrite(req.nextUrl);
      }
    } catch (error) {
      // If Edge Config fails, proceed without checking maintenance mode
      console.error('Failed to check maintenance mode:', error);
    }
  } catch (error) {
    // If geolocation fails, proceed without blocking
    console.error('Failed to check geolocation:', error);
  }
  */
  
  // default
  return NextResponse.next();
}