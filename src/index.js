import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import CodeTool from '@editorjs/code';


import ChartBlock from './JS/ChartBlock';
import SwotBlock from './JS/SWOTBlock';
import MermaidBlock from './JS/MermaidBlock';
import MermaidTool from './JS/MermaidTool';

import TuneRewrite from './JS/TuneRewrite';

import cPreview from './JS/jason-preview';

import './styles/main.scss';
import heroimage from './assets/sample-image.png';

import AiTemplates from './JS/templates/AI/editor-js-ai-templates';
import DocTemplates from './JS/templates/AI/editor-js-doc-templates';

import API from './JS/api';

var docData = {
  blocks: [
    {
      type: "header",
      data: {
        text: "Editor.js",
        level: 2
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.'
      }
    },
    {
      type: "header",
      data: {
        text: "Key features",
        level: 3
      }
    },
    {
      type: 'list',
      data: {
        items: [
          'It is a block-styled editor',
          'It returns clean data output in JSON',
          'Designed to be extendable and pluggable with a simple API',
        ],
        style: 'unordered'
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
      }
    },
    {
      type: 'paragraph',
      data: {
        text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`
      }
    },
    {
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 3
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below'
      }
    },
    {
      type: 'paragraph',
      data: {
        text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Clean data is useful to sanitize, validate and process on the backend.'
      }
    },
    {
      type: 'delimiter',
      data: {}
    },
    {
      type: 'paragraph',
      data: {
        text: 'We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏'
      }
    },
    {
      type: 'image',
      data: {
        url: heroimage,
        caption: '',
        stretched: false,
        withBorder: true,
        withBackground: false,
      }
    }, {
      type: "mermaid2",
      data: {
        mermaidCode: `sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?`,
        caption: "Mermaid Diagram"
      }
    },
  ]
}

var docData = DocTemplates.BrandStrategy;



/**
     * To initialize the Editor, create a new instance with configuration object
     * @see docs/installation.md for mode details
     */
var editor = new EditorJS({
  /**
   * Enable/Disable the read only mode
   */
  readOnly: false,

  /**
   * Wrapper of Editor
   */
  holder: 'editorjs',

  /**
   * Common Inline Toolbar settings
   * - if true (or not specified), the order from 'tool' property will be used
   * - if an array of tool names, this order will be used
   */
  // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
  // inlineToolbar: true,

  /**
   * Tools list
   */
  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: Header,
      inlineToolbar: ['marker', 'link'],
      config: {
        placeholder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },

    /**
     * Or pass class directly without any configuration
     */
    image: SimpleImage,

    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },

    warning: Warning,

    marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M'
    },

    code: {
      class: CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },

    delimiter: Delimiter,

    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },

    linkTool: LinkTool,

    embed: Embed,

    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: 'CMD+ALT+T'
    },
    swot: {
      class: SwotBlock,
      inlineToolbar: true
    },
    chart: {
      class: ChartBlock,
      inlineToolbar: true
    },
    mermaid: {
      class: MermaidBlock,
      inlineToolbar: true
    },
    mermaid2: MermaidTool,
    TuneRewrite: TuneRewrite
  },

  /**
   * This Tool will be used as default
   */
  // defaultBlock: 'paragraph',

  tunes: ['TuneRewrite'],
  /**
   * Initial Editor data
   */
  data: docData,
  onReady: function () {

    MermaidTool.config({
      'theme': 'base',
      'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryTextColor': '#fff',
        'primaryBorderColor': '#7C0000',
        'lineColor': '#F8B229',
        'secondaryColor': '#006100',
        'tertiaryColor': '#fff'
      }
    });

    saveButton.click();
  },
  onChange: function (api, event) {
    console.log('something changed', event);
  }
});

window.editor = editor;

/**
 * Saving button
 */
const saveButton = document.getElementById('saveButton');

/**
 * Toggle read-only button
 */
const toggleReadOnlyButton = document.getElementById('toggleReadOnlyButton');
const readOnlyIndicator = document.getElementById('readonly-state');

/**
 * Saving example
 */
saveButton.addEventListener('click', function () {
  editor.save()
    .then((savedData) => {
      cPreview.show(savedData, document.getElementById("output"));
    })
    .catch((error) => {
      console.error('Saving error', error);
    });
});

/**
 * Toggle read-only example
 */
toggleReadOnlyButton.addEventListener('click', async () => {
  const readOnlyState = await editor.readOnly.toggle();

  readOnlyIndicator.textContent = readOnlyState ? 'On' : 'Off';
});

const addToEditorBtn = document.getElementById('add-to-editor-btn');
const sidebarInput = document.getElementById('sidebar-input');

var getTemplate = function (message) {
  var messageModified = AiTemplates.largeContent + ' ' + message + " include headers for each section follow by paragraph of details optionally include list of items";
  return API.getJson(messageModified);
}


var improveAI = function (message) {
  var messageModified = "Suggest Improvements for this:" + ' ' + message + "\n\r";
  return callApi(messageModified);
}

var reviewAI = function (message) {
  var messageModified = "Review this:" + ' ' + message + "\n\r";
  return callApi(messageModified);
}

var expandAI = function (message) {
  var messageModified = "Expand this:" + ' ' + message + "\n\r";
  return callApi(messageModified);
}


var SimplifyAI = function (message) {
  var messageModified = "Simplify this:" + ' ' + message + "\n\r";
  return callApi(messageModified);
}

var callApi = async function (messageInput) {
  const requestBody = {
    prompt: messageInput,
    max_tokens: 1500,
    model: 'text-davinci-003',
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ['Human:', 'AI:']
  };
  const response = await fetch(`/api/prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  console.log(data);
  return data;
}

addToEditorBtn.addEventListener('click', function () {
  const enteredText = sidebarInput.value;
  //call AI to get document template.
  var docData = getTemplate(enteredText).then(function (data) {
    editor.clear();
    editor.render(data);
  });

  return;
  const currentBlock = editor.blocks.getCurrentBlock();

  if (currentBlock) {
    editor.blocks.update(currentBlock.clientId, { text: currentBlock.text + ' ' + enteredText });
  } else {
    editor.blocks.insert('paragraph', { text: enteredText });
  }

  // Clear the input field
  sidebarInput.value = '';
});