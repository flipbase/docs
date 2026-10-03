import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Organised by what someone is trying to do, rather than by which component and
 * version a page happens to describe.
 *
 * The previous sidebar listed only six of the twenty-nine pages in `docs/`. The
 * entire `api/v1` section — thirteen pages, around 1,300 lines — was published
 * but navigable only by guessing the URL, and six more guides sat in a
 * `_guides` folder that Docusaurus skips because of the underscore.
 *
 * Version appears in exactly one place, Browser support, because it is the one
 * thing that genuinely differs: v3 drops Internet Explorer. Everything else
 * reads the same whichever version you are on, and duplicating it per version
 * is how documentation drifts out of date in two directions at once.
 */
const sidebars: SidebarsConfig = {
  integrationsSidebar: [
    {
      type: 'category',
      label: 'Get started',
      collapsible: false,
      items: [
        { type: 'doc', id: 'README', label: 'Overview' },
        { type: 'doc', id: 'get-started/quick-start', label: 'Quick start' },
        { type: 'doc', id: 'concepts/getting-started', label: 'API concepts' },
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsible: false,
      items: [
        { type: 'doc', id: 'concepts/data-flow', label: 'Data flow' },
        { type: 'doc', id: 'concepts/integration-patterns', label: 'Integration patterns' },
        { type: 'doc', id: 'concepts/organizations', label: 'Organizations' },
        { type: 'doc', id: 'concepts/collections', label: 'Collections' },
        { type: 'doc', id: 'concepts/videos', label: 'Videos' },
        { type: 'doc', id: 'concepts/signatures', label: 'Signatures' },
        { type: 'doc', id: 'concepts/gdpr', label: 'GDPR' },
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Recorder',
          collapsible: true,
          collapsed: true,
          link: { type: 'doc', id: 'recorder/v2/docs' },
          items: [
            { type: 'doc', id: 'recorder/v2/docs', label: 'V2 (current)' },
            { type: 'doc', id: 'recorder/v1/docs', label: 'V1 (legacy)' },
          ],
        },
        {
          type: 'category',
          label: 'Player',
          collapsible: true,
          collapsed: true,
          link: { type: 'doc', id: 'player/v2/docs' },
          items: [
            { type: 'doc', id: 'player/v2/docs', label: 'V2 (current)' },
            { type: 'doc', id: 'player/v2/migrating_v1', label: 'Migrating from V1' },
            { type: 'doc', id: 'player/v1/docs', label: 'V1 (legacy)' },
          ],
        },
        { type: 'doc', id: 'platform/docs', label: 'Platform' },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      items: [
        { type: 'doc', id: 'reference/browser-support', label: 'Browser support' },
        {
          type: 'category',
          label: 'API',
          collapsible: true,
          collapsed: true,
          link: { type: 'doc', id: 'api/v1/README' },
          items: [
            { type: 'doc', id: 'api/v1/authentication', label: 'Authentication' },
            { type: 'doc', id: 'api/v1/organizations', label: 'Organizations' },
            { type: 'doc', id: 'api/v1/collections', label: 'Collections' },
            { type: 'doc', id: 'api/v1/videos', label: 'Videos' },
            { type: 'doc', id: 'api/v1/members', label: 'Members' },
            { type: 'doc', id: 'api/v1/user', label: 'User' },
            { type: 'doc', id: 'api/v1/webhooks', label: 'Webhooks' },
            { type: 'doc', id: 'api/v1/errors', label: 'Errors' },
            {
              type: 'category',
              label: 'Employer branding',
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'api/v1/eb/pages', label: 'Pages' },
                { type: 'doc', id: 'api/v1/eb/videos', label: 'Videos' },
                { type: 'doc', id: 'api/v1/eb/delete', label: 'Delete' },
              ],
            },
            {
              type: 'category',
              label: 'Deprecated',
              collapsible: true,
              collapsed: true,
              items: [
                { type: 'doc', id: 'api/v1/collections_deprecated', label: 'Collections (old)' },
                { type: 'doc', id: 'api/v1/videos_deprecated', label: 'Videos (old)' },
              ],
            },
          ],
        },
        {
          type: 'link',
          label: 'API explorer (Postman)',
          href: 'https://documenter.getpostman.com/view/900009/S11DT24G',
        },
      ],
    },
  ],
};

export default sidebars;
