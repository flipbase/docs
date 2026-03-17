import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  integrationsSidebar: [
    {
      type: 'doc',
      id: 'README',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Components',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Recorder',
          collapsible: false,
          link: { type: 'doc', id: 'recorder/v1/docs' },
          items: [
            { type: 'doc', id: 'recorder/v1/docs', label: 'V1' },
            { type: 'doc', id: 'recorder/v2/docs', label: 'V2' },
          ],
        },
        {
          type: 'category',
          label: 'Player',
          collapsible: false,
          link: { type: 'doc', id: 'player/v2/docs' },
          items: [
            { type: 'doc', id: 'player/v1/docs', label: 'V1 (deprecated)' },
            { type: 'doc', id: 'player/v2/docs', label: 'V2' },
          ],
        },
        {
          type: 'doc',
          id: 'platform/docs',
          label: 'Platform',
        },
      ],
    },
    {
      type: 'link',
      label: 'Api references',
      href: 'https://documenter.getpostman.com/view/900009/S11DT24G',
    },
  ],
};

export default sidebars;
 