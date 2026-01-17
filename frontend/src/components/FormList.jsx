
import React, { useEffect, useState } from "react";
import { getForms } from "../formApi"

const FormList = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        getForms().then(res => {
            setForms(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setForms([]));
    }, []); 

    return (
        <div>
        <h2>Available Forms</h2>
        <ul>
            {forms.map((form) => (
            <li key={form.id}>
                <h3>{form.title}</h3>
                <p>{form.description}</p>
                <a href={`/formly/${form.id}`}>Take Form</a>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default FormList;
