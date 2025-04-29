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

   
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, 'i') };
    if (gender) filter.gender = { $regex: new RegExp(gender, 'i') };
    if (specialization) filter.specialization = { $regex: new RegExp(specialization, 'i') };

    const doctors = await Doctor.find(filter);
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Database connection error', error }, { status: 500 });
  }
}
