"use client";

import { Console } from "console";
import React from "react";
import { useState, useEffect } from "react";
import InputSection from "@/app/inputs/Main";
import Navbar from "@/app/components/Navbar";

export default function Page() {
    const [inputValues, setInputValues] = useState({}); // Estado para almacenar los valores de los elementos
    const [formGroups, setFormGroups] = useState({});
    const [formNames, setFormNames] = useState({});

    const url = "https://ed5f37a0-4bf2-45ff-a76c-2485bfe78b9a.mock.pstmn.io";
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            fetch(url + "/api/v1/formTypes/2")
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    // console.log(data);
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

                });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    //Emmagatzenem els inputs de les entrades en un vector

    useEffect(
        function dependence() {
            // implement a function to change the display value of the elements
            // console.log(inputValues);
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
                        // console.log("SHOW", id, fatherValue);



                        if(document.getElementById(id)?.getAttribute("required") && document.getElementById(id)?.getAttribute("novalidate")){
                            document.getElementById(id)?.removeAttribute("novalidate");
                        }
                        document.getElementById(id)?.setAttribute("style", "display:block");
                    } else {
                        // console.log("HIDE", id, fatherValue);
                        document.getElementById(id)?.setAttribute("style", "display:none");
                        if(document.getElementById(id)?.getAttribute("required")){
                            document.getElementById(id)?.setAttribute("novalidate", "true");
                        }
                        // console.log(trueelem);
                    }
                }
            }
        },
        [inputValues]
    );




    return (
        <div>
            <Navbar />
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
        </div>
    );
}


