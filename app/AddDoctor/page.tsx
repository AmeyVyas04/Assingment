'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaVenusMars, FaStethoscope, FaNotesMedical, FaHome, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface FormData {
  name: string;
  gender: string;
  specialization: string;
  description: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    specialization: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        setFormData({ name: '', gender: '', specialization: '', description: '' });
      } else {
        setErrorMessage(data.message || 'Failed to add doctor.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Animated Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center shadow-xl"
      >
        <div className="flex items-center space-x-3">
          <FaUserMd className="text-white text-3xl" />
          <h1 className="text-white text-3xl font-bold tracking-tight">MediConnect Pro</h1>
        </div>
       
        <Link href="/" legacyBehavior>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-blue-800 font-semibold px-6 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 shadow-md"
          >
            <FaHome />
            <span>Home</span>
          </motion.button>
        </Link>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2 
              }}
            >
              <FaUserMd className="text-blue-600 text-5xl" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-transparent">
            Add New Doctor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete the form below to register a new medical professional in our system.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 mt-10 border border-blue-100"
        >
          {/* Status Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start space-x-3"
              >
                <FaCheckCircle className="text-green-500 text-xl mt-1" />
                <p className="text-green-700 font-medium">{successMessage}</p>
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3"
              >
                <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                <p className="text-red-700 font-medium">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-medium">
                <FaUserMd className="mr-2 text-blue-600" />
                Doctor's Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Dr. John Smith"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-gray-50"
              />
            </motion.div>

            {/* Gender Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-medium">
                <FaVenusMars className="mr-2 text-blue-600" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-4 border text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-gray-50 appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            {/* Specialization Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-medium">
                <FaStethoscope className="mr-2 text-blue-600" />
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                placeholder="Cardiology, Neurology, etc."
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full text-black p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-gray-50"
              />
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-medium">
                <FaNotesMedical className="mr-2 text-blue-600" />
                Professional Description
              </label>
              <textarea
                name="description"
                placeholder="Brief professional background and qualifications..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-4 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-gray-50"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaUserMd />
                    <span>Register Doctor</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center mt-12"
      >
        <p className="text-sm">© {new Date().getFullYear()} MediConnect Pro. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}