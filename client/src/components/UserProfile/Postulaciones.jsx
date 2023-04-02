import React from 'react'
import logofusionajob from '../../assets/logofusionajob.png'
import { useEffect ,useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Postulaciones() {
    const navigate=useNavigate()
    const idUser = JSON.parse(localStorage.getItem("userLogin")).Postulants[0].userId
    const [data,SetData]=useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
              const res1 = await axios.get(`/aplicates/${idUser}`);
              const res2 = await axios.get(`/applyapioffer/${idUser}`);
              SetData([...res1.data, ...res2.data]);
              console.log([...res1.data, ...res2.data])
              console.log([...res1.data, ...res2.data][0])

              console.log(data);
            } catch (err) {
              console.log(err);
              console.log("Algo salió mal dentro de Postulaciones.jsx");
            }
          };
          fetchData()
    }, [])
    

return (

    <>
        {
            data?.length ? <>
<div className='h-1043px overflow-y-auto'  style={{maxHeight:" 1040px"}}>
    {/* <select className='bg-white rounded-xl  border mb-4 text-center flex justify-around'>
        <option value="">send</option>
    </select> */}
    {data.map((el)=>
<div className="bg-white rounded-xl p-4 border mb-4 text-center flex justify-around" >
    <h2 className="text-lg font-bold cursor-pointer"
     onClick={()=>navigate(`/detail/${el.offerId}?title=${el.Offer?el.Offer.title:el.title}`)}>
        {el.Offer?el.Offer.title:el.title}</h2>
        <div className="text-sm text-gray-400"> 
        <h2>Status</h2>
        {el.status ? el.status[0].toUpperCase()+el.status.slice(1) :"Sin especificar"}</div>
        </div>)}
</div>
            
            </>:<div className='flex flex-col justify-around w-full h-2/3'>
      <h2 className="text-3xl font-bold text-white mb-3 text-center">Aún no te has postulado a ningún trabajo </h2>
    <p className='text-gray-400 text-2xl text-center'>¡Explora las oportunidades de trabajo disponibles y postúlate para empezar a construir tu carrera!</p>
    <img src={logofusionajob} alt='logo' className="text-center" />
    </div>
    
        }
        
    </>
)
}

export default Postulaciones
/**
 * Offer
: 
{date_post: '31/03/2023 18:04:05', id: 1, title: 'Buscamos Cocinero', requeriments: 'Debe hacer altos sandwiches', functions: 'hacer sandwiches', …}
createdAt
: 
"2023-03-31T21:05:18.087Z"
id
: 
1
offerId
: 
1
status
: 
"send"
updatedAt
: 
"2023-03-31T21:05:18.087Z"
userId
: 
"bc8aae10-17d7-4c1f-b736-3e39424d144b"
 */