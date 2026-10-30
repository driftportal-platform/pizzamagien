import type { IngredientId } from '../types/game';
import { ingredients } from '../data/ingredients';
export function IngredientTray({selected,onSelect}:{selected:IngredientId|null;onSelect:(id:IngredientId)=>void}){
 return <div className="ingredient-tray" aria-label="Ingredienser">{ingredients.map(i=><button className={'ingredient '+(selected===i.id?'chosen':'')} key={i.id} onClick={()=>onSelect(i.id)} aria-pressed={selected===i.id}><span className="ingredient-emoji">{i.emoji}</span><span>{i.name}</span></button>)}</div>;
}
