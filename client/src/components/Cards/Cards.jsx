import Card from "./Card"
import useFetch from "../Hooks/useFetch";
import {getPostList} from '../../redux/slices/postSlices'
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

const url = 'http://localhost:3001/home?language=javascript'
const Cards = () => {
    const dispatch = useDispatch()
    const { postJobs } = useSelector((state) => state.postSlice) 
    const {data, isLoading} = useFetch(url)

    useEffect(() => {
        dispatch(getPostList(data))
    }, [dispatch, data])

    return (
    <div className="flex flex-wrap gap-3 justify-center dark:bg-slate-600 py-6">
      { 
      postJobs?.slice(0,6).map((card) => (
        <Card key={card.title} title={card.title} description={card.description} />
          ))
      }
    </div>
    )
}

export default Cards