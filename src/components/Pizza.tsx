import { useRef } from 'react';
import type { IngredientId,Topping } from '../types/game';
import { ingredients } from '../data/ingredients';
type Props={toppings:Topping[];selected:IngredientId|null;onPlace:(x:number,y:number)=>void;baked:boolean;interactive:boolean};
export function Pizza({toppings,selected,onPlace,baked,interactive}:Props){
 const ref=useRef<HTMLDivElement>(null);
 const place=(clientX:number,clientY:number)=>{
  if(!interactive||!selected||!ref.current)return;
  const rect=ref.current.getBoundingClientRect();
  const x=(clientX-rect.left)/rect.width*100,y=(clientY-rect.top)/rect.height*100;
  const dx=x-50,dy=y-50;
  if(dx*dx+dy*dy>40*40)return;
  onPlace(x,y);
 };
 return <div ref={ref} className={'pizza '+(baked?'baked':'')+(interactive?' interactive':'')} onPointerUp={e=>place(e.clientX,e.clientY)} aria-label="Pizza. Vælg en ingrediens og tryk på pizzaen for at placere den.">
  <div className="crust"/><div className="sauce"/><div className="pizza-cheese"/>
  {toppings.map(t=>{const ingredient=ingredients.find(i=>i.id===t.ingredient)!;return <div className={'topping topping-'+t.ingredient} key={t.id} style={{left:`${t.x}%`,top:`${t.y}%`,transform:`translate(-50%,-50%) rotate(${t.rotation}deg)`,background:ingredient.color}}>{t.ingredient==='cheese'?'✦':t.ingredient==='pepperoni'?'':t.ingredient==='olive'?'◉':t.ingredient==='corn'?'●':t.ingredient==='pepper'?'◯':t.ingredient==='mushroom'?'♣':t.ingredient==='pineapple'?'◆':'▰'}</div>})}
 </div>;
}
