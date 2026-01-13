/// <reference types="astro/client" />

declare module '*.astro' {
  type AstroComponentFactory = import('astro').AstroComponentFactory;
  const component: AstroComponentFactory;
  export default component;
}
