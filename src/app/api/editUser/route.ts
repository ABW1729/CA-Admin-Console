import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb'
import {headers} from "next/headers"
import { NextApiRequest } from "next";
export async function POST(req:Request) {
    try {
        const client=new MongoClient(process.env.MONGODB_URI ?? ' ' 
        );
     await client.connect();
     const db = client.db("test");
    const {email,newscore}= await req.json();
    console.log(req.body);
    const update = await db.collection("users").findOneAndUpdate(
      { email },
      { $set: { points: newscore } },
      { returnDocument: 'after' } 
    );
    if(!update){
        return  NextResponse.json({message:"Cant Update"}, { status: 404 });
    }

  
      return NextResponse.json({update}, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message:"Server Error" },
        { status: 500 }
      );
    }
  }