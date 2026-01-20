
import React, { useEffect, useState } from "react";
import { getForms } from "../api"

const FormList = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        getForms().then(res => {
            setForms(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => setForms([]));
    }, []); 

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Available Forms</h2>
        {forms.length === 0 ? (
            <p className="text-gray-500">No Available Forms</p>
        ): (
        <ul className="space-y-4">
            {forms.map((form) => (
            <li key={form.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-700 mb-2">{form.title}</h3>
                <p className="text-gray-600 mb-3">{form.description}</p>
                <a href={`/formly/${form.id}`} className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">Take Form</a>
            </li>
            ))}
        </ul>

        )}
        </div>
    );
};

export default FormList;
