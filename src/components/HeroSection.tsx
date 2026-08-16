'use client'
import { motion } from 'motion/react'
const HeroSection = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/heroImage.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/80 "></div>

            <div className="relative z-10 min-h-screen flex flex-col
            item-center justify-center px-4  text-center">

                <motion.div
                initial={{opacity:0,y:30}}
                animate={{}}
                transition={{}}
                >

                </motion.div>


            </div>

        </div>
    );
};

export default HeroSection;
