import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/user';

export async function POST(req) {
  try {
    // ✅ Connect to MongoDB first
    await connectToDatabase();

    // Parse the incoming JSON data
    const { name, gender, specialization, description } = await req.json();

    // Validate inputs
    if (!name || !gender || !specialization || !description) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), { status: 400 });
    }

    // Check for existing doctor
    const existingUser = await User.findOne({ name, gender, specialization, description });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Doctor already exists with the same details.' }), { status: 400 });
    }

    // Save new doctor
    const newUser = new User({ name, gender, specialization, description });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'Doctor added successfully.' }), { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return new Response(JSON.stringify({ message: 'Failed to add doctor.', error: error.message }), { status: 500 });
  }
}
