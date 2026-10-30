import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import{Home}from'./screens/Home';
import{Kitchen}from'./screens/Kitchen';
import{loadStars,saveStars}from'./game/logic';
import type{Mode}from'./types/game';
import'./styles/main.css';
function App(){const[mode,setMode]=useState<Mode|null>(null);const[stars,setStars]=useState(loadStars);const award=(n:number)=>setStars(s=>{saveStars(s+n);return s+n});return mode?<Kitchen mode={mode} onExit={()=>setMode(null)} onAward={award}/>:<Home onStart={setMode} stars={stars}/>}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
