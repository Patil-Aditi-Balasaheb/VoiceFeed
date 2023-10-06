import alanBtn from '@alan-ai/alan-sdk-web';
import { useState, useEffect } from 'react';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import banner from "./banner.png"

const alanKey = process.env.REACT_APP_ALAN_AI_API_KEY;

function App() {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    var alanBtnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtnInstance.playText('Please try that again.');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtnInstance.playText('Opening.');
          }
        }
      }
    })
  }, [])
  return (
    <div style={{paddingBottom:'5vh'}}>
      <div style={{
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column-reverse',
        textAlign: 'center',
      }}>
        <img src={banner} style={{
          height: '30vmin',
          borderRadius: '15%',
          padding: '0 5%',
          margin: '2% 0',
        }} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;