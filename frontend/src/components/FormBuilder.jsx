import React, { useState } from "react";
// import CreateForm from "../CreateForm"; // your API helper
import api, {createForm} from "../api";

const FormBuilder = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isQuiz, setIsQuiz] = useState(false);
    const [questions, setQuestions] = useState([]);

    // Add a new question
    const addQuestion = () => {
        setQuestions([
        ...questions,
        {
            id: Date.now(),
            question_text: "",
            question_type: "short",
            required: false,
            options: [],
            answers: [],
        },
        ]);
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    // Update question text/type
    const updateQuestion = (id, field, value) => {
        setQuestions(
        questions.map((q) =>
            q.id === id ? { ...q, [field]: value } : q
        )
        );
    };

    // Add option to a question
    const addOption = (questionId) => {
        setQuestions(
        questions.map((q) =>
            q.id === questionId
            ? {
                ...q,
                options: [
                    ...q.options,
                    { id: Date.now(), option_text: "", is_correct: false },
                ],
                }
            : q
        )
        );
    };

    // Update option text
    const updateOption = (questionId, optionId, field, value) => {
        setQuestions(
        questions.map((q) =>
            q.id === questionId
            ? {
                ...q,
                options: q.options.map((opt) =>
                    opt.id === optionId ? { ...opt, [field]: value } : opt
                ),
                }
            : q
        )
        );
    };

    // Submit form + questions + options
    const handleSubmit = async () => {
        try {
        // Step 1: Create form
        const formRes = await createForm(
            { title, description, is_quiz: isQuiz, is_published:true },
        );
        const formId = formRes.data.id;

        // Step 2: Create questions
        for (const q of questions) {
            const questionRes = await api.post(
            "/api/questions/",
            {
                form_id: formId,
                question_text: q.question_text,
                question_type: q.question_type,
                required: q.required,
            }
            );

            const questionId = questionRes.data.id;

            // Step 3: Create options (if applicable)
            for (const opt of q.options) {
            await api.post(
                "http://localhost:8000/api/options/",
                {
                question_id: questionId,
                option_text: opt.option_text,
                is_correct: opt.is_correct,
                },
            );

            }

            for (const ans of q.answers || []){
                await api.post(
                    "/api/answers/",
                    {
                        question_id: questionId, 
                        answer_text: ans.answer_text,
                    },
                );
            }
            alert('Form created successfully');
        }
    }catch(err){
        console.error(err);
        console.log(err.response.data)
        alert("Error creating form ")
    }
};
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">

        <input
            type="text"
            placeholder="Untitled form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-purple-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-purple-700 focus:outline-none"
        />
        <textarea
            placeholder="Form description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md  p-2 mb-4 focus:ring-2 focus:ring-purple-700 focus:outline-none"
        />

        <label className="flex items-center space-x-2 mb-6 text-gray-700">
            <input
            type="checkbox"
            checked={isQuiz}
            onChange={(e) => setIsQuiz(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-purple-700"
            />
            <span> Quiz?</span>
        </label>

        <h3 className="text-xl font-medium mb-3 text-gray-800">Questions</h3>
        {questions.map((q) => (
            <div key={q.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }} 
            className="border border-gray-300 rounded-md p-4 mb-4 bg-gray-50">

                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 font-medium">Question</span>
                    <button onClick={() => deleteQuestion(q.id)} className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-500">
                        Delete
                    </button>
                </div>

            <input
                type="text"
                placeholder="Question text"
                value={q.question_text}
                onChange={(e) => updateQuestion(q.id, "question_text", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-purple-700 focus:outline-none"
            />
            <select
                value={q.question_type}
                onChange={(e) => updateQuestion(q.id, "question_type", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-purple-700 focus:outline-none"
            >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="mcq">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
            </select>

            <label className="flex items-center space-x-2 mb-3 text-gray-700">
                <input
                type="checkbox"
                checked={q.required}
                onChange={(e) => updateQuestion(q.id, "required", e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-purple-700"
                />
                <span> Required?</span>
            </label>

            {(q.question_type === "short" || q.question_type === "paragraph") && ( 
                <div className="mt-3"> 
                    <h4 className="text-lg font-medium mb-2 text-gray-700">Answer</h4> 
                    <textarea 
                    placeholder={ q.question_type === "short" ? 
                        "Short answer text" : "Paragraph answer text" 

                    }
                    value={q.answers?.[0]?.answer_text || ""} 
                    onChange={(e) => updateQuestion(q.id, "answers", 
                        [{ answer_text: e.target.value }]) 
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-700 focus:outline-none"
                    rows={q.question_type === "paragraph" ? 4 : 1} />
                </div> 
            )} 
            
            {(q.question_type === "mcq" || q.question_type === "checkbox") && (
                <div className="mt-3">
                <h4 className="text-lg font-medium mb-2 text-gray-700">Options</h4>
                {q.options.map((opt) => (
                    <div key={opt.id} 
                    className="flex items-center space-x-2 mb-2">
                    <input
                        type="text"
                        placeholder="Option text"
                        value={opt.option_text}
                        onChange={(e) =>
                        updateOption(q.id, opt.id, "option_text", e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-700 focus:outline-none"
                    />

                    <label className="flex items-center space-x-1 text-gray-700">
                        
                        <input
                        type="checkbox"
                        checked={opt.is_correct}
                        onChange={(e) =>
                            updateOption(q.id, opt.id, "is_correct", e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-purple-700"
                        />
                        <span>Correct?</span>
                    </label>
                    </div>
                ))}
                <button onClick={() => addOption(q.id)} 
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Option</button>
                </div>
            )}
            </div>
        ))}
        <div className="flex space-x-3 mt-6">
            <button onClick={addQuestion}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:text-black">Add Question</button>

            <button onClick={handleSubmit}
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:text-black">Publish</button>
        </div>
        </div>
    );
};

export default FormBuilder;
