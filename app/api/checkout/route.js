import { db } from "@/config/db";
import { checkout } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";




export async function POST(req) {
    try {
        const data = await req.json()
            const { firstName, lastName, email,  phone, checkInDate, checkOutDate, travelers, price } = data;

        if (!firstName || !lastName   || !email  || !phone || !checkInDate || !checkOutDate || !travelers || !price ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    } 

    const result = await  db.insert(checkout).values({
      firstName,
      lastName,
      email,
      phone,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      travelers,
      price,
    }).returning(checkout)

    return NextResponse.json({success:true ,checkout: result[0]}, { status: 201 })

    } catch (error) {
     console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function  GET(req){

    try{
          const destination = await db.select().from(checkout)

    return NextResponse.json({success:true,data:destination})
    }catch(error){
          console.error("❌ Error Fetching destination:", error);
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }
  
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      return NextResponse.json({ success: false, error: "Missing or invalid id" }, { status: 400 });
    }

    const deleted = await db
      .delete(checkout)
      .where(eq(checkout.id, id))
      .returning({ id: checkout.id });

    if (deleted.length === 0) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deleted[0].id });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
