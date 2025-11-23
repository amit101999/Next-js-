import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Event from '@database/event.ts'

export async function POST(req: NextResponse) {
    try {
        await connectDB();
        const formData = await req.formData()
        let event
        try {
            event = Object.fromEntries(formData.entries());
        } catch (err) {
            return NextResponse.json({ message: "invalid JSON data format" }, { status: 400 })
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "event creation failed" }, { status: 500 })
    }
}