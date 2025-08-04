import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My blob project",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
    { text: 'Home', link: '/' },
]
,
    sidebar: [
  {
    text: '目次',
    items: [
      { text: '🚨 PostgreSQL JDBC バインドで発生する「2バイト整数の範囲超え」エラーとは？', link: '/20250430-postgresql-jdbc-2byte-limit-blog' },
      { text: '🇯🇵 Next.jsでMarkdownブログを実装｜動的ルーティングとfallbackの理解', link: '/20250501-nextjs-blog-fallback' },
      { text: 'データベースのチューニング入門', link: '/20250508-database_tuning_post' },
      { text: '🌐 CONFIGURATION | 配置 | 設定', link: '/20250517-gitee-to-github' },
      { text: '多仓库迁移自动化指令汇编', link: '/20250517-summary' },
      { text: 'Solution Summary: `Error: error:0308010C:digital envelope routines::unsupported`', link: '/20250518-error0308010' },
      { text: 'Sub Index', link: '/20250519-sub index' },
      { text: 'Find And Sort Duplicate Records Based On Specific Columns In SQL', link: '/20250525-Find and Sort Duplicate Records Based on Specific Columns in SQL' },
      { text: 'Something About Agile Development', link: '/20250526-something about agile development' },
      { text: 'Just Talking To Myself', link: '/20250609-just talking to myself' },
      { text: 'String Handle', link: '/20250613-string handle' },
      { text: 'Poetic Expressions', link: '/20250620-poetic expressions' },
      { text: 'Fragement Slideshow', link: '/20250727-fragement-slideshow' },
    ]
  }
]
,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
