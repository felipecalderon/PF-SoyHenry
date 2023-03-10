import Card from "./Card"
import useFetch from "../Hooks/useFetch";

//la info de cards vendrá desde api en el backend
const cards = [
    { title: 'Jr. Javascript Backend Nodejs', description: 'Buscamos un trabajador experto en express y auth token' },
    { title: 'Trainee Tailwindcss UI UX', description: 'Se necesita un experto en diseño responsive con tailwind' },
    { title: 'Senior React Tester', description: 'Se busca QA expert en el campo de react con redux toolkit' },
  ];

const Cards = () => {
    return (
    <div className="flex flex-wrap gap-3 justify-center dark:bg-slate-600 py-6">
      {cards.map((card) => (
        <Card key={card.title} title={card.title} description={card.description} />
      ))}
    </div>
    )
}

export default Cards