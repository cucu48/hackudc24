"use client";


import { Console } from "console";
import React from "react";
import { useState, useEffect } from "react";
import InputSection from "@/app/inputs/Main"

import Link from 'next/link';
import Navbar from "@/app/components/Navbar";

export default function Form({ type }) {
    const context = { type };

    const [inputValues, setInputValues] = useState({}); // Estado para almacenar los valores de los elementos
    const [formGroups, setFormGroups] = useState({});
    const [formNames, setFormNames] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const url = "https://71411636-b9d7-47b5-b1f6-3173afabf738.mock.pstmn.io";
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            fetch(url + "/api/v1/formTypes/"+context.type)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);

                    for (const element of data.form_fields) {
                        setInputValues((prevState) => ({
                            ...prevState,
                            [element.field_id]: [element.field_default_value, element],
                        }));
                    }

                    if (data.form_groups) {
                        for (const group of data.form_groups) {
                            setFormNames((prevState) => ({
                                ...prevState,
                                [group.group_id]: [group.group_name],
                            }));
                        }

                        const fields_by_groups = data.form_fields.reduce((groups, field) => {
                            const group = groups[field.field_group] || [];
                            return {
                                ...groups,
                                [field.field_group]: [...group, field],
                            };
                        }, {});

                        //Ordena los campos por cada grupo
                        for (const groupKey in fields_by_groups) {
                            fields_by_groups[groupKey].sort((a, b) => a.field_order - b.field_order);
                        }
                        setFormGroups(fields_by_groups);
                    }else{
                        setFormGroups({0: data.form_fields});
                    }

                    for (const element of data.form_fields) {
                        setInputValues((prevState) => ({
                            ...prevState,
                            [element.field_id]: [element.field_default_value, element],
                        }));
                    }
                    setIsLoading(false); // Set loading to false on error

                });
        } catch (error) {
            setIsLoading(false); // Set loading to false on error
            console.error("Error fetching data:", error);
        }
    }, []);

    //Emmagatzenem els inputs de les entrades en un vector

    useEffect(
        function dependence() {
            // implement a function to change the display value of the elements

            for (const a of Object.entries(inputValues)) {
                const id = a[0];
                const elem = a[1];

                const value = elem[0];
                const trueelem = elem[1];

                if (trueelem.field_dependent_on) {
                    const fatherValue = inputValues[trueelem.field_dependent_on.field_id];
                    if (
                        fatherValue &&
                        fatherValue[0] === trueelem.field_dependent_on.field_value
                    ) {

                        if(document.getElementById(id)?.getAttribute("required") && document.getElementById(id)?.getAttribute("novalidate")){
                            document.getElementById(id)?.removeAttribute("novalidate");
                        }
                        document.getElementById(id)?.setAttribute("style", "display:block");
                    } else {

                        document.getElementById(id)?.setAttribute("style", "display:none");
                        if(document.getElementById(id)?.getAttribute("required")){
                            document.getElementById(id)?.setAttribute("novalidate", "true");
                        }
                    }
                }
                setIsLoading(false); // Set loading to false on error
            }
        },
        [inputValues]
    );

    if (isLoading) {
        return <p>Loading...</p>; // You can also replace this with a loading spinner or any other loading indicator
    }

    return (
        <div>
            <form action={data.form_callback_url} method={data.form_method} className="container">
                <div>
                    <h1 className="mt-5">{data.form_type_name}</h1>
                    <p>{data.form_type_description}</p>
                </div>
                <InputSection formGroups={formGroups} formNames={formNames} setInputValues={setInputValues} />
                <input type="submit" value="Send form" className="btn btn-info" />
                <p className="text-black-50">
                    This form requires to be filled following each requirement.
                </p>
            </form>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
        </div>
    );
}


