import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Flipbase Developer Documentation',
  tagline: 'Video recording and playback for your application',
  favicon: 'img/favicon.ico',

  url: 'https://docs.flipbase.com',
  baseUrl: '/',
  trailingSlash: true,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/uvu0omm.css',
      },
    },
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        docsRouteBasePath: '/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          path: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      /*
       * No `title`. The logo is already a link to the homepage, so the wordmark
       * beside it was a second control doing the same thing.
       */
      logo: {
        alt: 'Flipbase — back to the docs homepage',
        src: 'img/logo.png',
        href: '/',
      },
      /*
       * Empty on purpose. Both items that were here duplicated the sidebar:
       * "Integrations" opened the only sidebar there is, and "API Reference"
       * pointed at the same Postman collection as "API explorer (Postman)"
       * under Reference. Four navigation mechanisms competing for one page is
       * three too many; the logo still links home.
       */
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Flipbase.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
