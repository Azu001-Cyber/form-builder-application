import React, { useEffect, useState } from "react";
import { getForms, getForm } from "./api/formApi";
import FormBuilder from "./components/FormBuilder";
import FormRenderer from "./components/FormRenderer";

function App() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);

    useEffect(() => {
        getForms().then((res) => setForms(res.data));
    }, []);

    return (
        <div>
        <h1>Forms</h1>
        <FormBuilder />
        <ul>
            {forms.map((f) => (
            <li key={f.id} onClick={() => getForm(f.id).then((res) => setSelectedForm(res.data))}>
                {f.title}
            </li>
            ))}
        </ul>
        {selectedForm && <FormRenderer form={selectedForm} />}
        </div>
    );
}

export default App;
