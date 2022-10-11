import React from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import data from '../../utils/data';

function App() {
  return (
    <div >
      <AppHeader />
      <BurgerConstructor data={data}/>
    </div>
  );
}

export default App;
