<template>
    <div class="doc-container">
        <doc-index class="doc-index"
                :index="index"
                :lang="lang"
        />
        <doc-viewer class="doc-viewer"
                    :lang="lang"
        />
    </div>
</template>

<script>

import DocIndex from './DocIndex'
import DocViewer from './DocViewer'

export default {
  name: 'DocContainer',
  components: {
    DocIndex,
    DocViewer
  },

  props: {

  },

  data () {
    return {
      doc: {
        type: String,
        required: true
      },
      section: {
        type: String,
        required: false
      },
      article: {
        type: String,
        required: false
      },
      lang: {
        type: String,
        required: true
      }
    }
  }
}
</script>

<style scoped>
    .doc-container{
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        top: 41px;
    }

    .doc-container > * {
        padding: 10px;
        flex: 1 100%;
    }

    .doc-index {
        overflow-x: auto;
        overflow-y: auto;

        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;

        margin: 40px 20px 10px 10px;
    }

    .doc-viewer {
        min-height: 90vh;
        margin: 40px 0 0 0;
        padding: 10px 20px 10px 10px;
        border-left: lightgray solid 1px;
    }

    @media all and (min-width: 600px) {
        .doc-index {
            flex: 1 auto;
            min-height: 0;
        }
    }

    @media all and (min-width: 800px) {
        .doc-viewer {
            flex: 3 0px;
        }
        .doc-index {
            order: 1;
            min-height: 0;
        }
        .doc-viewer {
            order: 2;
        }
        /*.footer {*/
            /*order: 3;*/
        /*}*/
    }

</style>
