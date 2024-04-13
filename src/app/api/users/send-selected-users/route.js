import connect from "@/dbconfig/db";
import nodemailer from "nodemailer";
import User from "@/models/Userdata";
import { NextRequest, NextResponse } from "next/server";


// Connect to the database
connect();

const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agastyaemailnodemailer12@gmail.com',
        pass: 'gvkh lsuq ohqz tajv'
    }
})


export async function POST(request) {
    try {
        const requestBody = await request.text();
        const { selectedUsers } = JSON.parse(requestBody);
        console.log("request.body:", selectedUsers);
    
        
        const emailBody = selectedUsers.map(user => `
        <div style="font-family: Arial, sans-serif; background-color: #282c35; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);">
    <h2 style="color: #ffffff; margin-bottom: 10px; font-size: 24px;">Name: ${user.name}</h2>
    <p style="color: #dddddd; margin-bottom: 5px; font-size: 16px;">Email: ${user.email}</p>
    <p style="color: #dddddd; margin-bottom: 5px; font-size: 16px;">Phone Number: ${user.PhoneNumber}</p>
    <p style="color: #dddddd; margin-bottom: 5px; font-size: 16px;">Hobbies: ${user.Hobbies}</p>
</div>
<br/>
    `).join('');
        // Send email
        const info = await transporter.sendMail({
            from: '"Agastya 👻" <agastyaemailnodemailer12@gmail.com>', // sender address
            to: " buildspace.00@gmail.com, info@redpositive.in", 
            subject: 'Selected Users Data',
            text: `helloo world`,
            html: emailBody,
        }
    );
    console.log("Email sent:", info);
            // Process the selectedUsers data here
        return NextResponse.json({message: "Selected users sent successfully"}, {status: 200});

    }catch (error) {
        console.log("Error:", error);
        return NextResponse.json(
            { message: "error while sending mail" },
            { status: 400 }
          );
    }
}