using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api
{
    class prompt
    {
        private readonly ILogger _logger;

        public prompt(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<prompt>();
        }

        [Function("prompt")]
        public async Task<HttpResponseData> GetPrompt([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req,
    FunctionContext context)
        {
            var _logger = context.GetLogger("message");
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            // Get the request body
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string prompt = data?.prompt;
            string apiKey = Environment.GetEnvironmentVariable("ApiKey");

            using (HttpClient httpClient = new HttpClient())
            {
                // Set the API endpoint
                httpClient.BaseAddress = new Uri("https://api.openai.com/");

                // Set the authorization header
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                // Set the content type header
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Set the request body
                string aiRequestBody = JsonConvert.SerializeObject(new
                {
                    prompt = prompt,
                    max_tokens = 1500,
                    model = "text-davinci-003",
                    temperature = 0.9,
                    top_p = 1,
                    frequency_penalty = 0,
                    presence_penalty = 0.6,
                    stop = "['Human:', 'AI:']"
                });

                // Send the request
                HttpResponseMessage response = await httpClient.PostAsync("/v1/completions", new StringContent(aiRequestBody, Encoding.UTF8, "application/json"));

                // Handle the response
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    dynamic responseObject = JsonConvert.DeserializeObject(responseBody);
                    string chatOutput = responseObject.choices[0].text;

                    // Create the HTTP response
                    var httpResponse = req.CreateResponse(HttpStatusCode.OK);
                    httpResponse.Headers.Add("Content-Type", "text/plain; charset=utf-8");
                    httpResponse.WriteString(chatOutput);

                    return httpResponse;
                }
                else
                {
                    _logger.LogError($"An error occurred while making the request. Status code: {response.StatusCode}");
                    return req.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
        }
    }
}
