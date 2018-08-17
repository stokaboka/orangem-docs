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

    state = {}
    LANGUAGES = [
      {id: 'en', icon: ''},
      {id: 'ru', icon: ''}
    ]

    async initState (lang) {
      if (!lang) {
        lang = 'en'
      }
      try {
        let response = await this.HTTP.get('docs/index.json')

        let docIndex = response.data.sort((a, b) => a.order - b.order)
        this.state = Object.assign(
          {},
          this.state,
          {
            lang: lang,
            docIndex: docIndex,
            links: this.prepareLinks(docIndex, lang)
          }
        )
        return this.state
      } catch (e) {
        console.log(e.message)
        this.state = Object.assign({}, this.state)
        return this.state
      }
    }

    async loadUrl (url) {
      try {
        let response = await this.HTTP.get(url)
        return response
      } catch (e) {
        console.log(e.message)
        return ''
      }
    }

    async loadDocIndex (doc, lang) {
      try {
        let response = await this.loadUrl(this.getDocIndexUrl(doc, lang))
        let index = this.prepareDocIndex(response.data, doc, lang)
        return index
      } catch (e) {
        console.log('*** DocsApi::loadDocIndex', e)
        return []
      }
    }

    dispatch (state, action, options) {
      let title, links
      switch (action) {
        case this.ACTIONS.SET_LANG :
          if (state.docIndex) {
            links = this.prepareLinks(state.docIndex, options.lang)
            title = this.getTitle(links, options.lang, state.doc)
            this.state = Object.assign(
              {},
              state,
              {
                links: links,
                title: title,
                lang: options.lang
              }
            )
            return this.state
          } else {
            this.state = Object.assign({}, state)
            return this.state
          }

        case this.ACTIONS.SET_DOC :
          title = this.getTitle(state.links, state.lang, options.doc)
          this.state = Object.assign({},
            state,
            {
              doc: options.doc,
              title: title
            }
          )
          return this.state
      }
    }

    getTitle (links, lang, doc) {
      if (doc) {
        let _doc = doc
        let out = links.find(function (element) {
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

    prepareLinks (links, lang) {
      if (lang) {
        return links.map(function (link) {
          return {
            id: link.id,
            title: link.title[lang],
            href: `/doc/${link.id}/lang/${lang}`,
            target: link.target ? link.target : null
          }
        })
      } else {
        return links
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
              // url: _url,
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

      return out
    }

    getEmptyPageUrl (lang) {
      return `docs/404/${lang}/empty.html`
    }

    get404PageUrl (lang) {
      return `docs/404/${lang}/404.html`
    }
}

// const instance = new DocsApi()
// export { HTTP, ACTIONS, isMobileDevice, dispatch, state, initState, LANGUAGES }
export default new DocsApi()
