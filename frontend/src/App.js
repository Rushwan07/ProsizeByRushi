// src/App.jsx
import Nav from "./components/Navbar/Nav";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/home"
import Search from "./pages/Search/Search";
import Clothes from "./components/Clothes/clothes";
import ViewCloth from "./components/ViewCloth/viewcloth";
import Cart from "./components/Cart/cart";
import Favorite from "./components/Favorite/favorite";
import Message from "./pages/Message/Message";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Nav setQuery={setQuery} query={query} />
        <Routes>
          <Route
            path="/"
            element={query ? <Search query={query} setQuery={setQuery} /> : <Home />}
          />
          <Route
            path="/clothes"
            element={query ? <Search query={query} setQuery={setQuery}  /> : <Clothes />}
          />
          <Route
            path="/view/:id"
            element={query ? <Search query={query} setQuery={setQuery}  /> : <ViewCloth />}
          />
          <Route
            path="/cart"
            element={query ? <Search query={query} setQuery={setQuery}  /> : <Cart />}
          />
          <Route
            path="/favorite"
            element={query ? <Search query={query} setQuery={setQuery}  /> : <Favorite />}
          />
          <Route
            path="/message/:token"
            element={query ? <Search query={query} setQuery={setQuery}  /> : <Message />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
