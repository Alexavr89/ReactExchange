import { useEffect } from 'react';
import './App.css';
import {EurUah, UsdUah} from './component/slice';
import {useSelector, useDispatch} from 'react-redux';

function App() {
const fetchEur = useSelector(x=>x.rate.eur.data);
const fetchUsd = useSelector(y=>y.rate.usd.data);
const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(EurUah());
    dispatch(UsdUah());
  }, [dispatch]);
  if (!fetchEur) return "Loading...";
  if (!fetchUsd) return "Loading...";
  return (
    <div className="App">
      <header className="App-header">
        <div className='header'>
        <span>USD/UAH - {fetchUsd}</span>
        <span>EUR/UAH - {fetchEur}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
