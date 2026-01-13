

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function FormBuilder() {
    const [title, setTitle] = useState("Untitled Form");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([
        ...questions,
        {
            id: Date.now(),
            question_text: "",
            question_type: "short",
            required: false,
            options: [],
        },
        ]);
    };

    const updateQuestion = (id, key, value) => {
        setQuestions(
        questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
        );
    };

    const deleteQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const addOption = (qid) => {
        setQuestions(
        questions.map((q) =>
            q.id === qid
            ? { ...q, options: [...q.options, ""] }
            : q
        )
        );
    };

    const updateOption = (qid, index, value) => {
        setQuestions(
        questions.map((q) =>
            q.id === qid
            ? {
                ...q,
                options: q.options.map((opt, i) =>
                    i === index ? value : opt
                ),
                }
            : q
        )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10">
        <div className="w-full max-w-3xl space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow">
            <div className="h-3 bg-purple-600 rounded-t"></div>
            <div className="p-6">
                <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-semibold w-full outline-none"
                />
                <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Form description"
                className="text-gray-600 mt-2 w-full outline-none"
                />
            </div>
            </div>

            {/* Questions */}
            {questions.map((q) => (
            <div
                key={q.id}
                className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600"
            >
                <input
                value={q.question_text}
                onChange={(e) =>
                    updateQuestion(q.id, "question_text", e.target.value)
                }
                placeholder="Question"
                className="text-lg w-full outline-none mb-4"
                />

                <select
                value={q.question_type}
                onChange={(e) =>
                    updateQuestion(q.id, "question_type", e.target.value)
                }
                className="border rounded px-3 py-2 mb-4"
                >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="mcq">Multiple Choice</option>
                <option value="checkbox">Checkboxes</option>
                </select>

                {(q.question_type === "mcq" || q.question_type === "checkbox") && (
                <div className="space-y-2">
                    {q.options.map((opt, idx) => (
                    <input
                        key={idx}
                        value={opt}
                        onChange={(e) => updateOption(q.id, idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="block w-full border-b outline-none"
                    />
                    ))}
                    <button
                    onClick={() => addOption(q.id)}
                    className="text-purple-600 text-sm"
                    >
                    + Add option
                    </button>
                </div>
                )}

                <div className="flex justify-between items-center mt-4">
                <label className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    checked={q.required}
                    onChange={(e) =>
                        updateQuestion(q.id, "required", e.target.checked)
                    }
                    />
                    <span>Required</span>
                </label>
                <button
                    onClick={() => deleteQuestion(q.id)}
                    className="text-red-500"
                >
                    <Trash2 size={18} />
                </button>
                </div>
            </div>
            ))}

            {/* Add Question */}
            <button
            onClick={addQuestion}
            className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow hover:bg-gray-50"
            >
            <Plus className="text-purple-600" />
            <span>Add Question</span>
            </button>

            {/* Save */}
            <button className="bg-purple-600 text-white px-6 py-2 rounded cursor-pointer">
            Save Form
            </button>
        </div>
        </div>
    );
}
