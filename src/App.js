import './App.css';
import Header from './Components/Header';
import {Routes, Route } from 'react-router-dom';
import Home from './Tabs/Home';
import Genres from './Tabs/Genres';
import Authors from './Tabs/Authors';
import Books from './Tabs/Books';
import BookInfo from './Components/BookInfo';
import CreateBook from './Components/BookCreate';
import UpdateBook from './Components/BookUpdate';

function App() {
  return (
    <>
    <Header />
    <header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Books" element={<Books />}></Route>
        <Route path="/Genres" element={<Genres />}></Route>
        <Route path="/Authors" element={<Authors />}></Route>
        <Route path="/Info/:id" element={<BookInfo />}></Route>
        <Route path="/CreateBook" element={<CreateBook />}></Route>
        <Route path="/UpdateBook/:id" element={<UpdateBook />}></Route>
      </Routes>
    </header>
    </>
  );
}

export default App;
