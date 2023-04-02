import React from 'react'
import logofusionajob from '../../assets/logofusionajob.png'
import { useEffect ,useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Postulaciones() {
    const navigate=useNavigate()
    const idUser = JSON.parse(localStorage.getItem("userLogin")).id
    const [data,SetData]=useState([])
    const verdetalle =(id)=>{
    
        
}

    useEffect(() => {
        axios.get(`/aplicates/${idUser}`)
        .then((res)=>{
            SetData(res.data)
            console.log(res.data)
        })
       .catch((err)=>{
        console.log(err)
        console.log("AlGO salio mal dentro de Postulaciones.jsx")
       }) 
    }, [])
    
    useEffect(()=>{
        axios.get(`/applyapioffer/${idUser}`)
        .then((res)=>{
            SetData((prevData) => [...prevData, ...res.data]);
        })
       .catch((err)=>{
        console.log(err)
       }) 

    },[])
    
return (

    <>
        {
            data?.length ? <>
<div className='h-1043px overflow-y-auto'  style={{maxHeight:" 1040px"}}>{data.map((el)=><h2 className="bg-white rounded-xl p-4 border mb-4 text-center"
    onClick={verdetalle}>{el.Offer.title}</h2>)}</div>
            
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