import React from "react";
import aboutImage1 from '../img/About us-1.png';
import aboutImage2 from '../img/About us-2.jpg';



const About = ()=>{
    return (
        <div className="font-bold pt-28">
            <h1 className="text-center text-4xl text-#40513B bold underline mb-4">What are we ? </h1>
            <br/>
            <div className="flex flex-col md:flex-row  px-4 justify-center items-center">
                <img src={aboutImage1} className="h-64 w-64 object-fit-cover mx-4" alt="" ></img>
                <div className="p-4 w-1/2">
                   <p className="text-black">
                      Our main goal with this website is to promote proper E-waste recycling by offering incentives for each recycled 
                      product. By embracing reverse logistics, we encourage industries to actively recycle and make purchases from our 
                      platform, aligning with their profit-making objectives and supporting responsible e-waste disposal.
                    </p>
                    <p className="text-black">
                      The user-friendly interface allows for easy scheduling of pickups or drop-offs, streamlining the recycling process. 
                      Users earn credits based on the materials recycled, primarily precious metals, using an efficient AI-driven credit 
                      calculation system. These credits are redeemable through popular UPI platforms or other secure banking sources.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  px-4 justify-center items-center">
              <div className="p-4 w-1/2">
                <p className="text-black">
                Our approach extends to individuals and industries through an Extended Producer Responsibility (EPR) program, offering 
                incentives and fostering a sense of responsibility towards the environment. Thorough Aadhar verification ensures security
                 and reliability for every appointed collector, adding an extra layer of trust. Our collectors actively spread awareness 
                 about e-waste recycling, making our platform a hub for sustainable practices.
                </p>
                <p className="text-black">
                  Join us in creating a greener, more sustainable future, one e-waste item at a time. Your active involvement 
                  can drive positive change and contribute to a healthier planet.
                </p>
              </div>
              <img src={aboutImage2}className="h-72 w-72 object-fit-contain mx-4" alt=""></img>
                
            </div>
            
            
    </div>
            
    )
}
export default About;