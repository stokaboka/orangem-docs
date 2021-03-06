/*
Copyright Igor Khorev igorhorev@gmail.com
*/

import axios from 'axios'

// const isMobileDevice = function () {
//     return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
// }

class DocsApi {
    HTTP = axios.create({
      baseURL: '/'
    })

    ACTIONS = {
      SET_LANG: 'SET_LANG',
      SET_DOC: 'SET_DOC',
      LOAD_DOC: 'LOAD_DOC'
    }

    LANGUAGES = [
      {id: 'en', icon: ''},
      {id: 'ru', icon: ''}
    ]

    _docs = null

    state = {
      logo: 'Orangem::DocViewer',
      title: '',
      doc: '',
      docs: [],
      article: '',
      section: '',
      lang: this.LANGUAGES[0].id
    }

    app = null

    default = {
      doc: '',
      article: ''
    }

    async init (app) {
      this.app = app
      try {
        let response = await this.HTTP.get('docs/index.json')
        this.setDocs(response.data)
        this.prepareDocs()

        this.checkRouteParametersAndShowDefaultDocument()
      } catch (e) {
        // console.log(e.message)
      }
    }

    checkRouteParametersAndShowDefaultDocument () {
      let _href = ''
      if (!this.app.$route.params.doc && !this.app.$route.params.lang) {
        if (this.default.doc) {
          if (this.default.article) {
            _href = this.getHref({
              doc: this.default.doc,
              article: this.default.article,
              lang: this.state.lang
            })
            // this.app.$router.push(`/doc/${this.default.doc}/article/${this.default.article}/lang/${this.state.lang}`)
          } else {
            _href = this.getHref({
              doc: this.default.doc,
              lang: this.state.lang
            })
            // this.app.$router.push(`/doc/${this.default.doc}/lang/${this.state.lang}`)
          }
        }
      } else if (!this.app.$route.params.article) {
        if (this.default.article) {
          let d = this.state.doc ? this.state.doc : this.default.doc
          if (d) {
            _href = this.getHref({
              doc: d,
              article: this.default.article,
              lang: this.state.lang
            })
            // this.app.$router.push(`/doc/${d}/article/${this.default.article}/lang/${this.state.lang}`)
          }
        }
      }
      if (_href) {
        this.app.$router.push(_href)
      }
    }

    async loadUrl (url) {
      let response = null
      if (url) {
        try {
          response = await this.HTTP.get(url)
          return response.data
        } catch (e) {
          response = await this.load404Page()
          return response.data ? response.data : response
        }
      } else {
        response = await this.loadEmptyPage()
        return response.data ? response.data : response
      }
    }

    async load404Page () {
      let response = await this.loadServicePage(this.get404PageUrl())
      return response
    }

    async loadEmptyPage () {
      let response = await this.loadServicePage(this.getEmptyPageUrl())
      return response
    }

    async loadServicePage (url) {
      try {
        let response = await this.HTTP.get(url)
        return response
      } catch (e) {
        // console.log(e.message)
        return e.message
      }
    }

    async loadDocIndex (doc, lang) {
      try {
        let response = await this.loadUrl(this.getDocIndexUrl(doc, lang))
        let index = this.prepareDocIndex(response, doc, lang)
        this.checkRouteParametersAndShowDefaultDocument()
        return index
      } catch (e) {
        // console.log('DocsApi::loadDocIndex', e)
        return []
      }
    }

    getTitle (doc) {
      if (doc) {
        let _doc = doc
        let out = this.state.docs.find(function (element) {
          if (element.id === _doc) {
            return element
          }
        })

        if (out) {
          return out.title
        } else {
          return ''
        }
      } else {
        return ''
      }
    }

    setDocs (docs) {
      this._docs = docs.sort((a, b) => a.order - b.order)
    }

    setLang (lang) {
      this.state = Object.assign({}, this.state, {lang})
      let newRoute = Object.assign(
        {},
        this.app.$route.params,
        {lang}
      )
      this.app.$router.push({params: newRoute})
    }

    prepareDocs () {
      if (this._docs) {
        let docs = this._docs.map(function (link) {
          return {
            id: link.id,
            title: link.title[this.state.lang],
            // href: `/doc/${link.id}/lang/${this.state.lang}`,
            href: this.getHref({doc: link.id, lang: this.state.lang}),
            target: link.target ? link.target : null
          }
        }, this)
        this.state = Object.assign({}, this.state, {docs})
      } else {
        this.state = Object.assign({}, this.state, {docs: []})
      }

      if (this.state.docs.length > 0) {
        this.default.doc = this.state.docs[0].id
      }
    }

    prepareDocIndex (data, doc, lang, parent) {
      if (data) {
        return data.map(function (elem) {
          let _title = elem.title[lang] ? elem.title[lang] : ''
          let _article = ''
          let _section = ''

          if (parent) {
            _article = parent.id
            _section = elem.id
          } else {
            _article = elem.id
            if (!this.default.article) {
              this.default.article = _article
            }
          }

          let _href = this.getHref({
            doc: doc,
            article: _article,
            section: _section,
            lang: lang
          })
          // _section
          // ? `/doc/${doc}/article/${_article}/section/${_section}/lang/${lang}`
          // : `/doc/${doc}/article/${_article}/lang/${lang}`

          return Object.assign(
            {},
            elem,
            {
              title: _title,
              href: _href,
              content: this.prepareDocIndex(elem.content, doc, lang, elem)
            }
          )
        }, this)
      } else {
        return []
      }
    }

    getDocIndexUrl (doc, lang) {
      return `docs/${doc}/index.json`
    }

    getHref (options) {
      let out = ''
      if (options.doc) {
        out = out + `/doc/${options.doc}`
        if (options.article) {
          out = out + `/article/${options.article}`
          if (options.section) {
            out = out + `/section/${options.section}`
          }
        }
        if (options.lang) {
          out = out + `/lang/${options.lang}`
        }
      }

      return out
    }

    getArticleUrl (doc, article, section, lang) {
      let out = ''

      if (article || section) {
        if (doc) {
          out = out + `docs/${doc}`
        }

        if (lang) {
          out = out + `/${lang}`
        } else {
          out = out + '/en'
        }

        if (section) {
          if (article) {
            out = out + `/${article}/${section}.html`
          }
        } else {
          if (article) {
            out = out + `/${article}.html`
          }
        }
      }
      return out
    }

    getEmptyPageUrl () {
      return `docs/404/${this.state.lang}/empty.html`
    }

    get404PageUrl () {
      return `docs/404/${this.state.lang}/404.html`
    }
}
let api = new DocsApi()
export {api}
