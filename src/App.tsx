import React from 'react';
import Header from "./component/Header/Header";
import { Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Notate from "./Pages/Notate/Notate";
import Modal from "./component/Modal/Modal";
import {RootState, useAppSelector} from "./Store/Store";
import Account from "./Pages/Account/Account";
import {useSelector} from "react-redux";
import SecondModal from "./component/SecondModal/SecondModal";



function App() {
    const stateModal = useAppSelector( state => state.modal.isOpenModal);

    const isOpenSecondModal = useSelector<RootState, boolean>(state => state.secondModal.isOpenSecondModal);

    

    return (
    <div className="section">
      <Header/>
        {isOpenSecondModal && <SecondModal/> }
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
