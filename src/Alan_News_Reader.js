// Introduction to the app
intent('What does this app do?', 'What can I do here?', reply('This is a news reader app.'));

// Define your News API key
const API_KEY = ''; // Replace with your actual News API key (https://newsapi.org/)
let savedArticles = []; // Initialize an empty array to store news articles

// News by SOURCE
intent('Give me the news from $(source* (.*))', (p) => {
    // Construct the News API URL
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

    if (p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
    }

    // // old code not working with request   
    // api.request(NEWS_API_URL, (error, response, body) => {
    //     const {articles} = JSON.parse(body);

    //     if (!articles.length) {
    //         p.play('Sorry, please try searching for news from a different source.');
    //         return;
    //     }

    //     savedArticles = articles;

    //     p.play({ command: 'newHeadlines', articles });
    //     p.play(`Here are the (latest|recent) ${p.source.value} news.`);
    // })

    // Fetch news articles using Axios
    api.axios.get(NEWS_API_URL)
        .then((response) => {
            let { articles } = response.data;
            if (!articles.length) {
                p.play('Sorry, please try searching for news from a different source.');
                return;
            }
            articles.forEach(element => {
                savedArticles.push(element);
            });

            // Provide the news headlines to the user
            p.play({ command: 'newHeadlines', articles });
            p.play(`Here are the (latest|recent) ${p.source.value}.`);

            // Ask the user if they want to read the headlines
            p.play('Would you like me to read the headlines?');
            p.then(confirmation);
        })
        .catch((error) => {
            console.log(error);
            p.play('Could not get articles');
        });

    // Clear the savedArticles array
    savedArticles = [];
});

// News by TERM
intent('What\'s up with $(term* (.*))', (p) => {
    // Construct the News API URL
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

    if (p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }

    // Fetch news articles using Axios
    api.axios.get(NEWS_API_URL)
        .then((response) => {
            let { articles } = response.data;
            if (!articles.length) {
                p.play('Sorry, please try searching for something else.');
                return;
            }
            articles.forEach(element => {
                savedArticles.push(element);
            });

            // Provide the news headlines to the user
            p.play({ command: 'newHeadlines', articles });
            p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);

            // Ask the user if they want to read the headlines
            p.play('Would you like me to read the headlines?');
            p.then(confirmation);
        })
        .catch((error) => {
            console.log(error);
            p.play('Could not get articles');
        });

    // Clear the savedArticles array
    savedArticles = [];
});

// News by CATEGORIES and LATEST NEWS
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
        // Construct the News API URL
        let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

        if (p.C.value) {
            NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
        }

        // Fetch news articles using Axios
        api.axios.get(NEWS_API_URL)
            .then((response) => {
                let { articles } = response.data;
                if (!articles.length) {
                    p.play('Sorry, please try searching for a different category.');
                    return;
                }
                articles.forEach(element => {
                    savedArticles.push(element);
                });

                // Provide the news headlines to the user
                p.play({ command: 'newHeadlines', articles });
                if (p.C.value) {
                    p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
                } else {
                    p.play(`Here are the (latest|recent) news.`)
                }

                // Ask the user if they want to read the headlines
                p.play('Would you like me to read the headlines?');
                p.then(confirmation);
            })
            .catch((error) => {
                console.log(error);
                p.play('Could not get articles');
            });

        // Clear the savedArticles array
        savedArticles = [];
    });

// Handle user confirmation
const confirmation = context(() => {
    intent('yes', async (p) => {
        for (let i = 0; i < savedArticles.length; i++) {
            p.play({ command: 'highlight', article: savedArticles[i] });
            p.play(`${savedArticles[i].title}`);
        }
    });

    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    });
});

// Open a specific article
intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if (p.number.value) {
        p.play({ command: 'open', number: p.number.value, articles: savedArticles })
    }
});

// Go back to news headlines
intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: {} });
});