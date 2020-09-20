import colors from 'vuetify/es5/util/colors'
import globalEnvSet from './env.global.js'

const environment = process.env.NODE_ENV || 'development'
const localEnvSet = require(`./env.${environment}.js`)
const envSet = Object.assign(globalEnvSet, localEnvSet)

export default {
  mode: 'universal',
  env: envSet,
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + envSet.name,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: envSet.description || '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/genColor',
    '@/plugins/global',
    // '@/plugins/firebase',
    '@/plugins/t',
    '@/plugins/addClass',
    '@/plugins/vuedraggable',
    '@/plugins/formatData'
    // '@/plugins/qrReader'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    '@nuxtjs/google-tag-manager'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  googleTagManager: {
    id: envSet.gid,
    pageTracking: true
  },
  /*
  ** Build configuration
  */
  build: {
    // quiet: false,
    // splitChunks: {
    //   layouts: true
    // },
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-extend': {},
        'postcss-mixins': {},
        'postcss-custom-media': {},
        'postcss-nested': {}
      }
    },
    terser: {
      terserOptions: {
        compress: {
          drop_console:
            process.env.NODE_ENV === 'production'
        }
      }
    }
  }
}
