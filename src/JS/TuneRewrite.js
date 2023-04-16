import API from "./api";

class TuneRewrite {
    static isTune = true;

    constructor({ api }) {
        this.api = api;
    }

    render() {
        return {
            icon: '<i class="material-icons">edit_square</i>',
            label: 'AI Rewrite',
            closeOnActivate: true,
            onActivate: () => {
                var api = this.api;
                const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
                const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

                if (currentBlock && currentBlock.holder) {
                    var content = currentBlock.holder.innerText;
                    var contentType = "paragraph";
                    console.log(content);

                    var messageModified = "Rewrite this " + contentType + ': ' + content + "\n\r";
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
export default TuneRewrite;