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

    async init (app) {
      this.app = app
      try {
        let response = await this.HTTP.get('docs/index.json')
        this.setDocs(response.data)
        this.prepareDocs()
      } catch (e) {
        console.log(e.message)
      }
    }

    async loadUrl (url) {
      if (url) {
        try {
          let response = await this.HTTP.get(url)
          return response.data
        } catch (e) {
          console.log(e.message)
          return ''
        }
      } else {
        return ''
      }
    }

    async loadDocIndex (doc, lang) {
      try {
        let response = await this.loadUrl(this.getDocIndexUrl(doc, lang))
        let index = this.prepareDocIndex(response, doc, lang)
        return index
      } catch (e) {
        console.log('*** DocsApi::loadDocIndex', e)
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
            href: `/doc/${link.id}/lang/${this.state.lang}`,
            target: link.target ? link.target : null
          }
        }, this)
        this.state = Object.assign({}, this.state, {docs})
      } else {
        this.state = Object.assign({}, this.state, {docs: []})
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
          }

          let _href = _section
            ? `/doc/${doc}/article/${_article}/section/${_section}/lang/${lang}`
            : `/doc/${doc}/article/${_article}/lang/${lang}`

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

    getArticleUrl (doc, section, article, lang) {
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

    getEmptyPageUrl (lang) {
      return `docs/404/${lang}/empty.html`
    }

    get404PageUrl (lang) {
      return `docs/404/${lang}/404.html`
    }
}
let api = new DocsApi()
export {api}
