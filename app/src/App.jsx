import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY; 

function App() {
  const [tweet, setTweet] = useState("");
  const[sentiment, setSentiment] = useState("");

  const APIBody = {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        role: 'system',
        content: 'You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.',
      },
      {
        role: 'user',
        content: tweet,
      }
    ],
    "temperature": 0,
    "max_tokens": 256
  }

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
    });
  }

console.log(tweet);

  return (
    <div className="App">
      <div>
        <textarea
        onChange={(e) => setTweet(e.target.value)}
        placeholder='Paste your tweet here!'
        cols={50}
        rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>Get the tweet Sentiment From OpenAI API </button>
        {sentiment!== "" ?
          <h3> This Tweet is : {sentiment} </h3>
          :
          null
        }

      </div>
      
    </div>
  )
}

export default App
