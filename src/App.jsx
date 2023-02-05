import React, { useState } from 'react'
import axios from 'axios';
import Form from './components/Form'

import './App.css'

function App() {


  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });

  const getRes = (data) => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: ({
        prompt: `Write a long cold email in a friendly but professional tone. Mention the purpose in the introduction, and experience in the middle and ask as a conclusion and follow the below information:
        From: ${data.myName}
        Purpose: ${data.myIntent}
        To: ${data.recipientName}
        Company Description: ${data.recipientTitle}
        Experience: ${data.mySkills}
        Ask: ${data.myDesiredOutcome}`,
        temperature: 0.5,
        max_tokens: 402,
        n: 1,
        model: "text-davinci-002"
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
        `Bearer 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`
      }
    })
      .then((res) => {
        console.log(res);
        responseHandler(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message, e);
      });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <i className="fa-regular fa-paper-plane"></i>
      <h2>Leverage the power of AI to create the ideal email pitch</h2>
      <Form getRes={getRes} />
      <>
        {loading ? (
          <span>loading...</span>
        ) : (
          obj?.choices?.map((v, i) => 
          <div className='output'>
            <h3>Your AI generated email 🥳</h3>
            <p>{v.text}</p>
          </div>)
        )}
      </>
    </div>
  )
}

export default App
