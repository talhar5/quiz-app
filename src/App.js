import FlashcardsList from "./FlashcardsList";
import "./app.css"
import { useEffect, useRef, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  let categoryElem = useRef();
  let numberElem = useRef();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => {
        setCategories(data.trivia_categories)
      }) 
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    let amount = numberElem.current.value;
    let category = categoryElem.current.value;
    setIsLoading(true);
    setIsDataLoaded(false);
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setIsDataLoaded(true);
        setQuestions(data);
      })
      .catch(err=>{
        console.log(err.message);
        setIsLoading(false);
      })
  }

  return (
    <>
      <form className="header" action="handleForm">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select ref={categoryElem} id="category">
            {categories.map(item => <option value={item.id} key={item.name + item.id}>{item.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numberOfQuestions">Number Of Questions</label>
          <input ref={numberElem} defaultValue="10" id="numberOfQuestions" type="number" max='50' min='1' step="1" />
        </div>
        <div>
          <input type="submit" onClick={handleSubmit} value="Get Questions" />
        </div>
      </form>
      {isLoading && <div className="container">
        <div className="center">loading...</div>
      </div>}
      {isDataLoaded && <div className="container">
        <FlashcardsList questions={questions} />
      </div>}
    </>
  );
}

export default App;
