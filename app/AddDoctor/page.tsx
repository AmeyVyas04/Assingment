'use client';

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer motion for animations

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    specialization: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Doctor added successfully!');
        setFormData({ name: '', gender: '', specialization: '', description: '' }); // Clear the form
      } else {
        setErrorMessage(data.message || 'Failed to add doctor.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      {/* Navbar */}
      <nav className="bg-blue-800 p-6 flex justify-between items-center shadow-lg">
        <h1 className="text-white text-3xl font-semibold">MediConnect</h1>
        <a href="/">
          <button className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-md hover:bg-blue-200 transition duration-200 ease-in-out">
            Home
          </button>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Add a New Doctor</h2>
        <p className="text-lg text-gray-600 mb-10">Fill in the details below to add a new doctor to our database.</p>

        {/* Form to add doctor */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-10 space-y-8">
          {/* Success/Error Messages with Framer Motion Animation */}
          {successMessage && (
            <motion.p
              className="text-green-600 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {successMessage}
            </motion.p>
          )}
          {errorMessage && (
            <motion.p
              className="text-red-600 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            {/* Name Input with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="text-gray-700 font-semibold "></label>
              <motion.input
                type="text"
                name="name"
                placeholder="Enter Doctor's Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
              />
            </motion.div>

            {/* Gender Select with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <label className="text-gray-700 font-semibold"></label>
              <motion.select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </motion.select>
            </motion.div>

            {/* Specialization Input with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <label className="text-gray-700 font-semibold"></label>
              <motion.input
                type="text"
                name="specialization"
                placeholder="Enter Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
              />
            </motion.div>

            {/* Description Input with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <label className="text-gray-700 font-semibold"></label>
              <motion.input
                type="text"
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-4 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
              />
            </motion.div>

            {/* Submit Button with animation */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-4 mt-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {loading ? 'Adding Doctor...' : 'Add Doctor'}
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
}
