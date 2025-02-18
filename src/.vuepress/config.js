const configureWebpack = require('./webpack');
const markdown = require('./markdown');
const fs = require('fs');
const version = fs.readFileSync('../version', 'utf-8').trim();

const doc_version = process.env.DOC_VERSION;

module.exports = {
  title: 'Forge SDK Documentation',
  description: 'Documentation for ArcBlock Forge SDK',
  configureWebpack,
  markdown,
  ga: '',
  dest: `../dist/forge/${doc_version}`,
  base: `/forge/${doc_version}/`,
  version: version,
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Forge SDK Documentation',
      description: 'Documentation for ArcBlock Forge SDK',
    },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   title: 'ArcBlock Forge 框架文档',
    //   description: 'ArcBlock Forge 框架相关文档。',
    // }
  },
  themeConfig: {
    logo: '/logo.png',

    // Edit on github
    repo: 'ArcBlock/forge-docs',
    repoLabel: 'Contribute!',
    docsDir: 'src',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',

    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'GitHub',
            link: 'https://github.com/ArcBlock',
          },
        ],
        sidebar: [
          {
            title: 'Introduction',
            collapsable: false,
            children: ['/intro/', '/intro/concepts', '/intro/transaction', '/intro/inside_forge'],
          },
          {
            title: 'Installation',
            collapsable: false,
            children: ['/install/', '/install/ubuntu', 'install/centos', 'install/macos'],
          },
          {
            title: 'Forge SDK',
            collapsable: false,
            children: [
              '/sdk/',
              '/sdk/javascript',
              '/sdk/python',
              '/sdk/elixir',
              '/sdk/java',
              '/sdk/others',
            ],
          },
          {
            title: 'Forge Tools',
            collapsable: false,
            children: [
              '/tools/forge_cli',
              '/tools/forge_web',
              '/tools/abt_chain_node',
              '/tools/simulator',
              '/tools/forge_indexer',
              '/tools/dapps_workshop',
            ],
          },
          {
            title: 'Architecture',
            collapsable: false,
            children: ['/arch/overview'],
          },
          {
            title: 'Forge Core',
            collapsable: false,
            children: [
              '/core/rpc',
              '/core/configuration',
              '/core/log',
              '/core/tx_protocol',
              '/core/code',
              '/core/bigint',
            ],
          },
          {
            title: 'Forge TX',
            collapsable: false,
            children: [
              '/txs/',
              '/txs/account/declare',
              '/txs/account/account_migrate',
              '/txs/asset/create_asset',
              '/txs/asset/update_asset',
              '/txs/asset/consume_asset',
              '/txs/asset/create_asset_factory',
              '/txs/asset/acquire_asset',
              '/txs/trade/transfer',
              '/txs/trade/exchange',
            ],
          },
          {
            title: 'Forge RPC',
            collapsable: false,
            children: [
              '/rpc/chain',
              '/rpc/event',
              '/rpc/state',
              '/rpc/stats',
              '/rpc/wallet',
              '/rpc/message_translation_booklet',
            ],
          },
          {
            title: 'Forge Types',
            collapsable: false,
            children: ['/types/type', '/types/enum', '/types/state', '/types/trace_type'],
          },
        ],
      },
    },
  },
};
