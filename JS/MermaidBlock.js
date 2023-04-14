class MermaidBlock {
    static get toolbox() {
      return {
        title: 'Mermaid',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm2.34 19.46h-.08l-2.42-3.85h-3.7l3.55-5.37L6 8.44l3.3 5.2h4.11l2.43 3.82h3.7l-3.56 5.38 5.37-1.76z"/></svg>'
      };
    }
  
    static get isReadOnlySupported() {
      return true;
    }
  
    constructor({ data }) {
      this.data = data || {  mermaidCode:' graph TD;      A-->B;      A-->C;      B-->D;      C-->D;'};
  
          if(this.data.mermaidCode == undefined){
            this.data.mermaidCode = ' graph TD;      A-->B;      A-->C;      B-->D;      C-->D;';
          };
    }
  
    render() {
      const container = document.createElement('div');
      const editor = document.createElement('textarea');
      
      editor.innerHTML = this.data.mermaidCode || '';
      container.appendChild(editor);
  
      const mermaid = window.mermaid;
      
      mermaid.initialize({
        startOnLoad: false,
      });
  
      const preview = document.createElement('div');
      container.appendChild(preview);
  
      const renderMermaid = () => {
        //preview.innerHTML = '';
        try {
          mermaid.render('mermaid-preview', editor.value, (svg) => {
            preview.innerHTML = svg;          
          });
        } catch (e) {
          console.error(e);
          preview.innerHTML = 'Error rendering Mermaid chart';
        }
      };
  
      //editor.addEventListener('input', renderMermaid);
  
      editor.addEventListener('input', () => {
            this.data.mermaidCode = editor.value;
            renderMermaid();
          });
      renderMermaid();
  
      return container;
    }
  
    save(blockContent){
      console.log('save:');
      console.log(blockContent);
      console.log(this.data);
      const editor = blockContent.querySelector('textarea');
      console.log(editor.value);
      return this.data;
      return {
        mermaidCode: editor.value
      }
    }
    
  }