"use client";


import { Console } from "console";
import React from "react";
import { useState, useEffect } from "react";
import InputSection from "@/app/inputs/Main";


import { useRouter } from 'next/router'

import Navbar from "@/app/components/Navbar";

export default function Page() {

    // LAnding page for selling rasberry pi

    return (
        <div>
            <Navbar />
            <h1>Register your Rasberry PI!</h1>
            <p>ASD!</p>
            <img src="https://www.raspberrypi.org/app/uploads/2021/05/Raspberry-Pi-4-2GB.png" alt="Raspberry Pi" width="300" height="300"></img>
            <p>Unleash the power of a mini-computer for only $35!</p>
            <p>Why buy a Raspberry Pi?</p>
            <ul>
                <li>More computing power than your grandma's fruitcake</li>
                <li>It won't disappear mysteriously in the middle of the night (unlike your TV remote)</li>
                <li>Not just for geeks - even your cat can learn to code on it (probably)</li>
            </ul>
            <button>
                <a href={"/register"}></a>
                Snag Your Berry Now!
            </button>
        </div>
    );
}


