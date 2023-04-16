import API from "./api";
class TuneAI {
    static isTune = true;

    constructor({ api, data, config, block }) {
        this.api = api;
        this.config = config;
        this.data = data;
        this.block = block;
    }

    render() {
        return {
            icon: '<span class="material-symbols-outlined">' + this.config.icon + '</span>',
            label: this.config.label,
            closeOnActivate: true,
            onActivate: () => {
                var api = this.api;
                const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
                const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

                if (currentBlock && currentBlock.holder) {
                    var content = currentBlock.holder.innerText;
                    
                    console.log(content);

                    var messageModified = this.config.promptPrefix + ': ' + content + "\n\r";
                    
                    API.getText(messageModified).then(function (result) {
                        api.blocks.update(currentBlock.id, { text: result });
                    });
                }
            }
        };
    }

    save() {
        return {};
    }
}

export default TuneAI;