
import React, { useEffect, useState } from "react";
import {getForm, submitResponse} from "../api";
import { useParams } from "react-router-dom";

const FormDetail = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        getForm(id).then((res) => setForm(res.data));
    }, [id]);

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = () => {
        const responseData = {
        form_id: id,
        answers: Object.entries(answers).map(([questionId, answerText]) => ({
            question_id: questionId,
            answer_text: answerText,
        })),
        };
        submitResponse(responseData).then(() => alert("Response submitted!"));
    };

    if (!form) return <p>Loading...</p>;

    return (
        <div>
        <h2>{form.title}</h2>
        {form.questions.map((q) => (
            <div key={q.id}>
            <p>{q.question_text}</p>
            {q.question_type === "mcq" || q.question_type === "checkbox" ? (
                q.options.map((opt) => (
                <label key={opt.id}>
                    <input
                    type={q.question_type === "mcq" ? "radio" : "checkbox"}
                    name={q.id}
                    value={opt.id}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                    {opt.option_text}
                </label>
                ))
            ) : (
                <input
                type="text"
                onChange={(e) => handleChange(q.id, e.target.value)}
                />
            )}
            </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FormDetail;
