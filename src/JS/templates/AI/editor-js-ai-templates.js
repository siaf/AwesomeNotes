class AiTemplates {
    static largeContent =
        `,please provide the answer similar to the following json file.: 
        {
            "blocks": [
              {
                "type": "header",
                "data": {
                  "text": "titles go here",
                  "level": 2
                }
              },
              {
                "type": "paragraph",
                "data": {
                  "text": "text goes here"
                }
              },
              {
                "type": "list",
                "data": {
                  "items": [
                    "item1",
                    "item2",
                    "item3"
                  ],
                  "style": "ordered"
                }
              }
            ]
          } thanks.`;
}

export default AiTemplates;