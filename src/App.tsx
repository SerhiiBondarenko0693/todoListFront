import React from 'react';
import Header from "./component/Header/Header";
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Notate from "./Pages/Notate/Notate";
import Modal from "./component/Modal/Modal";
import {useAppSelector} from "./Store/Store";
import Account from "./Pages/Account/Account";



function App() {
    const stateModal = useAppSelector( state => state.modal.isOpenModal);

    

    return (
    <div className="section">
      <Header/>
        {stateModal && <Modal/>}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notate" element={<Notate />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    </div>
  );
}

export default App;
