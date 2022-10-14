import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { apiAdress } from '../../utils/common';
import data from '../../utils/data';
import { Modal } from '../modal/modal';

function App() {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(apiAdress)
      .then(res => {
        if (res.ok) { return res.json() }
        else { return Promise.reject(res.status); }
      })
      .then(res => {setIngredients(res.data);})
      .catch(err => console.error(err))
  }, []);

  return (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
      {/* <Modal>
        {<p>Работает</p>}
      </Modal> */}
    </>
  );
}

export default App;
