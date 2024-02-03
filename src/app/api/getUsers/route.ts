import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb';
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI ?? ' ');

    try {
      await client.connect();
    } catch (connectError) {
      console.error('Error connecting to the database:', connectError);
      return NextResponse.json({ message: "Error connecting to the database" }, { status: 500 });
    }

    const db = client.db("test");
    // const uniqueUsers = await db.collection('users').distinct('email');
    // // Now, fetch the complete user details based on unique email addresses
    // const users = await db.collection('users').find({ email: { $in: uniqueUsers } }).toArray();
    // const users = await db.collection('users').find({}, { projection: { name: 1, email: 1, phoneNumber: 1, points: 1 } }).toArray();


const uniqueEmails = await db.collection('users').distinct('email');
const uniqueUsers = await db.collection('users').aggregate([
  {
    $match: { email: { $in: uniqueEmails } }
  },

    {
      $sort: { _id: 1 } // Sort based on the _id field in ascending order
    }
  
]).toArray();
    return NextResponse.json({ uniqueUsers }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } 
  }

