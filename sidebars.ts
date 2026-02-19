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
      label: 'Integrations',
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'recorder/v1/docs',
          label: 'Recorder',
        },
        {
          type: 'category',
          label: 'Player',
          link: {
            type: 'doc',
            id: 'player/v1/docs',
          },
          items: [
            { type: 'doc', id: 'player/v2/docs', label: 'Player v2' },
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
      label: 'API Reference',
      href: 'https://documenter.getpostman.com/view/900009/S11DT24G',
    },
  ],
};

export default sidebars;
