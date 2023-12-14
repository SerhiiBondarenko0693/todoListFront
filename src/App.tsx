import React from 'react';
import Header from "./component/Header/Header";
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Notate from "./Pages/Notate/Notate";
import Modal from "./component/Modal/Modal";



function App() {
  return (
    <div className="section">
      <Header/>
      <Modal/>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notate" element={<Notate />} />
        </Routes>
    </div>
  );
}

export default App;
