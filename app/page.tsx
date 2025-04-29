'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ name: '', gender: '', specialization: '' });

  interface Doctor {
    _id: string;
    name: string;
    gender: string;
    specialization: string;
    description: string;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: e.target.value,
    }));
  };

  // Fetch doctors with or without filters
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      // Add filter parameters if they are present
      if (filter.name) queryParams.append('name', filter.name);
      if (filter.gender) queryParams.append('gender', filter.gender);
      if (filter.specialization) queryParams.append('specialization', filter.specialization);

      const url = `/api/doctors?${queryParams.toString()}`;

      const res = await fetch(url);
      const text = await res.text(); // For debugging

      console.log('Response:', text);

      if (!res.ok) throw new Error('Network response was not ok');

      const data = JSON.parse(text);
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDoctors();
  };

  // Fetch all doctors on initial load or when "Show All" is clicked
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to get the first letter of the doctor's name for the avatar
  const getAvatarLetter = (name: string) => {
    return name.charAt(0).toUpperCase(); // Get the first letter and capitalize it
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">MediConnect</h1>
        <a href="/AddDoctor">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-all">
            Add Doctor
          </button>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-6 text-center bg-gradient-to-r from-blue-200 to-blue-50">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Find Your Specialist</h2>
        <p className="text-lg text-gray-600 mb-8">Search doctors by name, gender, or specialization</p>

        {/* Search Bar */}
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 space-y-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={filter.name}
            onChange={(e) => handleFilterChange(e, 'name')}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-4">
            <select
              value={filter.gender}
              onChange={(e) => handleFilterChange(e, 'gender')}
              className="w-1/2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Specialization"
              value={filter.specialization}
              onChange={(e) => handleFilterChange(e, 'specialization')}
              className="w-1/2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleSearchSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              onClick={() => setFilter({ name: '', gender: '', specialization: '' })}
              className="text-gray-500 hover:text-blue-600 transition-all"
            >
              Show All Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-semibold mb-8 text-gray-800">Available Doctors</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-lg shadow-lg p-6 relative group hover:bg-blue-50 transition-all duration-300 ease-in-out">
                {/* Avatar/Logo - First letter of doctor's name */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {getAvatarLetter(doctor.name)}
                </div>
                <div className="mt-12 text-center">
                  <h4 className="text-xl text-gray-800 font-semibold mb-2">{doctor.name}</h4>
                  <p className="text-gray-500 mb-1">{doctor.specialization}</p>
                  <p className="text-gray-400 text-sm">{doctor.gender}</p>
                  <p className="text-gray-600 mt-4 text-lg">{doctor.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found based on your search criteria.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; 2025 MediConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
