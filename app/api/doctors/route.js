import connectToDatabase from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
import Doctor from '../../../models/user';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name');
    const gender = searchParams.get('gender');
    const specialization = searchParams.get('specialization');

    // Build dynamic filter object
    const filter = {};
    if (name) filter.name = name;
    if (gender) filter.gender = gender;
    if (specialization) filter.specialization = specialization;

    const doctors = await Doctor.find(filter);
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Database connection error', error }, { status: 500 });
  }
}
