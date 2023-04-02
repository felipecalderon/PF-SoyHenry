import React, { useEffect } from "react";
import Footer from '../Footer/Footer'
import Profile from "./Profile";
import ProfileRecruiter from "./ProfileRecruiter";
import { ResumenOfertas } from "./ResumenOfertas";
import { NavLanding } from '../NavLanding/NavLanding';
import { CardsOfertasDb } from "./CardsOfertasDb";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from '../../redux/slices/userRegisterSlice'
import { saveOffers } from "../../redux/slices/recruiterSlice";
import NotFound from "../NotFound/NotFound";

export const DashboardEmpresa = () => {
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    dispatch(saveUser(userData))    
    const {offers} = useSelector((state) => state.recruiterSlice)
    
    useEffect(() => {
        axios.get(`/jobsdb/${userData?.Companies instanceof Array ? userData?.Companies[0].id : userData?.Companies?.id}`)
        .then(res => {
            dispatch(saveOffers(res.data.Offers))
            console.log(res.data.Offers);
        })
    }, []) // eslint-disable-line

    const menuUserProfile = [
        {
            name: 'Inicio',
            link: '/'
        },
        {
            name: 'Sobre nosotros',
            link: '/about'
        },
        {
            name: 'Ofertas',
            link: '/offers'
        }
    ]

    if(!userData) return <NotFound/>
        return (
            <div className="bg-primary-light dark:bg-secondary-dark pt-20 h-full">
                <NavLanding menu={menuUserProfile} />
                <h2 className="text-center pt-6 mb-4 text-2x font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
                    Bienvenido {userData.names}
                </h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 py-6">
                    <div className="col-span-1 row-span-1 w-full md:w-1/2 pl-8">
                        <ProfileRecruiter/>
                    </div>
                <div className="col-span-1 row-span-1 w-full md:w-1/2 pl-8">
                    {offers && <ResumenOfertas offers={offers}/>}
                </div>
                <div className="col-span-1 row-span-2 flex md:block ml-[2.5rem]">
                    <div className="pt-1">
                        <Profile/>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1">
                    <div className="w-full h-full">
                        <CardsOfertasDb  />
                    </div>
                </div>
                    <div className="col-span-2 row-span-1"></div>
                </div>
                <Footer />
            </div>
        )
    }