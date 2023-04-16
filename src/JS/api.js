class API {
    static getJson = async function (messageInput) {
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

      static getText = async function (messageInput) {
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
        const data = await response.text();
        console.log(data);
        return data;
      }
}


export default API;