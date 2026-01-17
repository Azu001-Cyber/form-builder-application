import React, { useState } from "react";
import CreateForm from "../CreateForm"; // your API helper
import axios from "axios";

const FormBuilder = ({ token }) => {
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
        },
        ]);
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
        const formRes = await CreateForm(
            { title, description, is_quiz: isQuiz },
            token
        );
        const formId = formRes.data.id;

        // Step 2: Create questions
        for (const q of questions) {
            const questionRes = await axios.post(
            "http://localhost:8000/api/questions/",
            {
                form_id: formId,
                question_text: q.question_text,
                question_type: q.question_type,
                required: q.required,
            },
            { headers: { Authorization: `Bearer ${token}` } }
            );

            const questionId = questionRes.data.id;

            // Step 3: Create options (if applicable)
            for (const opt of q.options) {
            await axios.post(
                "http://localhost:8000/api/options/",
                {
                question_id: questionId,
                option_text: opt.option_text,
                is_correct: opt.is_correct,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            }
        }

        alert("Form created successfully!");
        } catch (err) {
        console.error(err);
        alert("Error creating form");
        }
    };

    return (
        <div>
        <h2>Create Form</h2>
        <input
            type="text"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            placeholder="Form Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <label>
            Quiz?
            <input
            type="checkbox"
            checked={isQuiz}
            onChange={(e) => setIsQuiz(e.target.checked)}
            />
        </label>

        <h3>Questions</h3>
        {questions.map((q) => (
            <div key={q.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <input
                type="text"
                placeholder="Question text"
                value={q.question_text}
                onChange={(e) => updateQuestion(q.id, "question_text", e.target.value)}
            />
            <select
                value={q.question_type}
                onChange={(e) => updateQuestion(q.id, "question_type", e.target.value)}
            >
                <option value="short">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="mcq">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
            </select>
            <label>
                Required?
                <input
                type="checkbox"
                checked={q.required}
                onChange={(e) => updateQuestion(q.id, "required", e.target.checked)}
                />
            </label>

            {(q.question_type === "mcq" || q.question_type === "checkbox") && (
                <div>
                <h4>Options</h4>
                {q.options.map((opt) => (
                    <div key={opt.id}>
                    <input
                        type="text"
                        placeholder="Option text"
                        value={opt.option_text}
                        onChange={(e) =>
                        updateOption(q.id, opt.id, "option_text", e.target.value)
                        }
                    />
                    <label>
                        Correct?
                        <input
                        type="checkbox"
                        checked={opt.is_correct}
                        onChange={(e) =>
                            updateOption(q.id, opt.id, "is_correct", e.target.checked)
                        }
                        />
                    </label>
                    </div>
                ))}
                <button onClick={() => addOption(q.id)}>Add Option</button>
                </div>
            )}
            </div>
        ))}
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={handleSubmit}>Save Form</button>
        </div>
    );
};

export default FormBuilder;
