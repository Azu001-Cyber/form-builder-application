import React, { useState } from "react";
import api  from "./api";

const CreateForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isQuiz, setIsQuiz] = useState(false);
    const [isPublished, setIsPublished] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
        title,
        description,
        is_quiz: isQuiz,
        is_published: isPublished,
        };

        api.post("forms/", formData)
        .then((res) => {
            alert("Form created successfully!");
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
            alert("Error creating form");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Create New Form</h2>
        <div>
            <label>Title:</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </div>

        <div>
            <label>Description:</label>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <div>
            <label>Is Quiz?</label>
            <input
            type="checkbox"
            checked={isQuiz}
            onChange={(e) => setIsQuiz(e.target.checked)}
            />
        </div>

        <div>
            <label>Publish?</label>
            <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            />
        </div>

        <button type="submit">Create Form</button>
        </form>
    );
};

export default CreateForm;
