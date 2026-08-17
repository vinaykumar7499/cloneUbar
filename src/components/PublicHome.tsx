'use client'
import { useState } from "react";
import AuthModal from "./AuthModal";
import HeroSection from "./HeroSection";
import VehicleSlider from "./VehicleSlider";

const PublicHome = () => {
const [authopen,setauthopen]=useState(false)

    return (
        <>
            <HeroSection/>
            <VehicleSlider/>
            <AuthModal open={authopen} onClose={()=>setauthopen(true)} />
        </>
    );
};

export default PublicHome;
