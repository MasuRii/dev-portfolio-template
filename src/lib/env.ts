/**
 * Environment variable validation and access.
 * This ensures that required environment variables are present at build time.
 */

export const SITE = import.meta.env.SITE || process.env.SITE;
export const PUBLIC_EMAIL =
  import.meta.env.PUBLIC_EMAIL || process.env.PUBLIC_EMAIL;

export function validateEnv() {
  const required = ['SITE', 'PUBLIC_EMAIL'];
  const missing = required.filter((key) => {
    // In Astro, public variables must be prefixed with PUBLIC_ to be available in the browser
    // but SITE is a special case in Astro config.
    return !process.env[key] && !import.meta.env[key];
  });

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`);
    console.warn(
      'Please check your .env file or production environment settings.'
    );
  }
}

// Auto-validate on import in development or build
if (import.meta.env.DEV || import.meta.env.PROD) {
  validateEnv();
}
