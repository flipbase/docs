import type { Config, Plugin } from '@docusaurus/types';
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

  plugins: [
    /*
     * Keep the dev-server overlay for our own mistakes, and only for ours.
     *
     * The recorder V2 bundle throws on every initialisation — V2 deleted
     * `providers/FlashProvider.js` but `controllers/FlashController.js` still
     * reaches for it, and `views/View.js` calls `controllers['flash'].render()`
     * unconditionally. It is a real bug on the recorder's V2 line, reproducible
     * with nothing but the documented snippet in a plain HTML page, and it is
     * being fixed there rather than here.
     *
     * Until it is, the pages that embed a live recorder put a full-screen red
     * overlay over the documentation every time they load — in `npm start`
     * only; the built site has no overlay.
     *
     * What is suppressed is `Script error.` exactly: the placeholder a browser
     * substitutes when a *cross-origin* script throws and no CORS header lets
     * the page read the detail. It carries no message, file or line, so the
     * overlay can tell you nothing you could act on — the real error is in the
     * console. Every cross-origin script on these pages is one of our own CDN
     * bundles, and anything thrown by the site itself is same-origin and still
     * raises the overlay with its message intact.
     */
    function devServerOverlay(): Plugin {
      return {
        name: 'flipbase-dev-overlay',
        configureWebpack() {
          /*
           * `devServer` is a real webpack key and Docusaurus merges it straight
           * through, but its `ConfigureWebpackResult` type does not model it —
           * so this cast describes what actually happens rather than hiding a
           * mistake. Without it `tsc --noEmit` fails on this file, which is why
           * the CI workflow could never have gone green even once it ran.
           */
          return {
            devServer: {
              client: {
                overlay: {
                  errors: true,
                  warnings: false,
                  runtimeErrors: (error?: Error) =>
                    (error?.message ?? '') !== 'Script error.',
                },
              },
            },
          } as ReturnType<NonNullable<Plugin['configureWebpack']>>;
        },
      };
    },
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
