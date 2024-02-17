"use client";


import { Console } from "console";
import React from "react";
import { useState, useEffect } from "react";
import InputSection from "@/app/inputs/Main"

import Link from 'next/link';
import Navbar from "@/app/components/Navbar";

export default function Page() {

  return (
    <div>
        <Navbar />
        <div className="text-bg-dark text-white">
          <div className="container col-xxl-8 px-4 py-5">
            <div className="row align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zionandzion.com%2Fwordpress%2Fwp-content%2Fuploads%2F2016%2F12%2Fhow-to-write-modular-htmlcss-with-twig-and-less.jpg&f=1&nofb=1&ipt=c2ace87be5b129ebf99efc830bdbe2477971b2e05ce73b56f3bdf3380246575f&ipo=images" className="shadow d-block mx-lg-auto img-fluid rounded" alt="" width="100%" height="100%" loading="lazy" />
                    
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">Flexible and modular forms at the speed of light</h1>
                    <p className="lead mt-2">Tired of not spending time to program your boring forms? Try Polyform and give it a go. You'll be impressed ;P</p>
                    <div className=" justify-content-md-start mt-2">
                        <a href="/register" className="btn btn-info btn-lg px-4 me-md-2"><i class="fa-solid fa-paper-plane"></i>Get started</a>
                        <a href="https://github.com/cucu48/hackudc24/" className="btn btn-outline-secondary btn-lg px-4"><i className="fa-brands fa-github"></i>&nbsp;Read docs</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <link rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
        </div>);
    }