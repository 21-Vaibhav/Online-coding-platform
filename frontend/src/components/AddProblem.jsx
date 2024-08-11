import React, { useState } from "react";
import axios from "axios";


const AddProblem = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    testCases: [{ input: "", output: "" }],
    difficulty: "",
    category:"",
    order:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const newTestCases = formData.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [name]: value } : testCase
    );
    setFormData((prevData) => ({
      ...prevData,
      testCases: newTestCases,
    }));
  };

  const addTestCase = () => {
    setFormData((prevData) => ({
      ...prevData,
      testCases: [...prevData.testCases, { input: "", output: "" }],
    }));
  };

  const removeTestCase = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      testCases: prevData.testCases.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const dataToSend1 ={
            id:formData.id,
            title:formData.title,
            difficulty:formData.difficulty,
            category:formData.category,
            order:formData.order
        } 
        const dataToSend2 = {
          id: formData.id,
          title: formData.title,
          description:formData.description,
          testCases:formData.testCases,
          difficulty:formData.difficulty
        }; 
      await axios.post("http://localhost:3001/problem/", formData);
      alert("Problem added successfully");
     
       await axios.post("http://localhost:3001/problemList/", dataToSend1);
       alert("Problem added successfully");


    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
        Add New Problem
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows="6"
            required
          />
        </div>
        {formData.testCases.map((testCase, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Test Case {index + 1}
            </h3>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Input:
              </label>
              <textarea
                name="input"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Output:
              </label>
              <textarea
                name="output"
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, e)}
                className="w-full px-4 py-2 border rounded-lg"
                rows="2"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => removeTestCase(index)}
              className="text-red-500 hover:underline mt-2"
            >
              Remove Test Case
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTestCase}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Add Test Case
        </button>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Difficulty:
          </label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300">
            Order:
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Problem
        </button>
      </form>
    </div>
  );
};

export default AddProblem;
