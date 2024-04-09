import connect from "@/dbconfig/db";
import User from "@/models/Userdata";
import { NextResponse } from "next/server";


connect()


export async function PUT(request, { params }) {
    try {
       
      const { id } = params;
      console.log("id",id);

        const body = await request.json();
        console.log("Request Body:", body);

        const { name, email, PhoneNumber, Hobbies } = body;
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("PhoneNumber:", PhoneNumber);
        console.log("Hobbies:", Hobbies);

        const result = await User.updateOne({ _id: id }, {
            name, email, PhoneNumber, Hobbies
        });

        console.log("Update Result:", result);

        if (result.nModified > 0) {
            return NextResponse.json({ message: "user updated" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "updated the data that already exists" }, { status: 200 });
        }
    } catch (error) {
        console.error("Error while updating the user:", error);
        return NextResponse.json({ message: "error while updating the User" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
       const { id } = params;
       console.log(id);
      const user = await User.findById(id);
      if(!user){
        return NextResponse.json({ message: "user not found" }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
     return NextResponse.json({ message: "error in the id route file" }, { status: 500 });
    }
   }
   export async function DELETE(request,{params}) {
    try {
      const { id } = params;
      console.log("DELETEIID:",id);
      await User.findByIdAndDelete(id);
      return NextResponse.json({ message: "user deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }}  