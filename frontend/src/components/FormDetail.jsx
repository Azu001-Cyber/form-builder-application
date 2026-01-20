
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

    if (!form) {
        return <p className="text-center text-gray-500 mt-10 animate-pulse">Loading form...</p>; 
    } 

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">{form.title}</h2>
            <div className="space-y-6">
                {form.questions.map((q) => (

                    <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p 
                    className="text-gray-700 font-medium mb-3">{q.question_text}</p>

                    {q.question_type === "mcq" || q.question_type === "checkbox" ? (
                        <div className="space-y-2">
                            {q.options.map((opt) => (
                            <label key={opt.id}
                            
                            className="flex items-center space-x-2 text-gray-600">
                                <input
                                type={q.question_type === "mcq" ? "radio" : "checkbox"}
                                name={q.id}
                                value={opt.id}
                                onChange={(e) => handleChange(q.id, e.target.value)}
                                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:rign-purple-700"
                                />
                                <span>{opt.option_text}</span>
                            </label>
                        
                            ))}
                        </div>
                    ) : (
                        <input
                        type="text"
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-700 focus:outline-none"
                        placeholder={
                            q.question_type === "short"
                            ? "Enter short answer":"Enter detailed response"
                        }
                        />
                    )}
                    </div>
                ))}
                
            </div>
                <div className="mt-8 flex justify-center">
                    <button onClick={handleSubmit}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium">Submit</button>
                </div>
        </div>
    );
};

export default FormDetail;
