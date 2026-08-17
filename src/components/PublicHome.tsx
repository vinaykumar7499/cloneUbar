'use client';

import { useState } from "react";
import AuthModal from "./AuthModal";
import HeroSection from "./HeroSection";
import VehicleSlider from "./VehicleSlider";
import Navbar from "./Nav";

const PublicHome = () => {
    const [authopen, setauthopen] = useState(false);

    return (
        <>
            <Navbar openAuth={() => setauthopen(true)} />
            <HeroSection openAuth={() => setauthopen(true)} />
            <VehicleSlider />
            <AuthModal open={authopen} onClose={() => setauthopen(false)} />
        </>
    );
};

export default PublicHome;
