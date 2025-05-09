'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: e.target.value,
    }));
  };

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filter.name) queryParams.append('name', filter.name);
      if (filter.gender) queryParams.append('gender', filter.gender);
      if (filter.specialization) queryParams.append('specialization', filter.specialization);

      const res = await fetch(`/api/doctors?${queryParams.toString()}`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const getAvatarLetter = (name: string) => name.charAt(0).toUpperCase();

  return (
    <>
      <Head>
        <title>MediConnect | Find Doctors</title>
        <meta name="description" content="Search and manage doctor profiles easily with MediConnect. Find specialists by name, gender, or specialization." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 md:p-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold">MediConnect</h1>
          <Link href="/AddDoctor">
            <button className="bg-white text-blue-600 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-100 transition-all">
              Add Doctor
            </button>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-6 text-center bg-gradient-to-r from-blue-200 to-blue-50">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Find Your Specialist</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">Search doctors by name, gender, or specialization</p>

          {/* Search & Filter Card */}
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-4 md:space-y-6">
            <input
              type="text"
              placeholder="Search by Name"
              value={filter.name}
              onChange={(e) => handleFilterChange(e, 'name')}
              className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={filter.gender}
                onChange={(e) => handleFilterChange(e, 'gender')}
                className="w-full md:w-1/2 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full md:w-1/2 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
              <button
                onClick={handleSearchSubmit}
                className="w-full md:w-auto flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button
                onClick={() => setFilter({ name: '', gender: '', specialization: '' })}
                className="w-full md:w-auto text-gray-500 hover:text-blue-600 transition-all"
              >
                Show All Doctors
              </button>
            </div>
          </div>
        </section>

        {/* Doctors List */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 text-center md:text-left">Available Doctors</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor._id} className="bg-white rounded-lg shadow-lg p-6 relative group hover:bg-blue-50 transition-all duration-300 ease-in-out">
                  <div className="absolute top-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold">
                    {getAvatarLetter(doctor.name)}
                  </div>
                  <div className="mt-16 text-center">
                    <h4 className="text-lg md:text-xl text-gray-800 font-semibold mb-2">{doctor.name}</h4>
                    <p className="text-gray-500 mb-1">{doctor.specialization}</p>
                    <p className="text-gray-400 text-sm">{doctor.gender}</p>
                    <p className="text-gray-600 mt-2 md:mt-4 text-sm md:text-base">{doctor.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No doctors found based on your search criteria.</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6 text-center">
          <p>&copy; 2025 MediConnect. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
