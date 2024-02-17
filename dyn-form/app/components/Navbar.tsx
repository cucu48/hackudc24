"use client";

import React from "react";

import Link from 'next/link';

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="">PolyForm</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item m-3">
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item m-3">
                            <Link href="/register">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item m-3">
                            <Link href="/incidence">
                                Incidence
                            </Link>
                        </li>
                        <li className="nav-item m-3">
                            <Link href="/discharge">
                                Discharge
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}