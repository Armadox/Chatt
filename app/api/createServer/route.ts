import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { MemberRole, PrismaClient } from "@prisma/client";
import sharp from "sharp";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads");
const prisma = new PrismaClient();

async function generateRandomCode(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let unique = false
  let code = "";

  while(unique === false){
    code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const existingCode = await prisma.server.findUnique({
      where:{
        inviteCode : code
      }
    });
    if (!existingCode) {
      unique = true;
    }
  }

  return code;
}


export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as String;
    const userId = formData.get("userId") as String;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!name || !userId) {
      return NextResponse.json({
        success: false,
        message: "Account not found!",
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Creating the inviteCode:
    const inviteCode = await generateRandomCode(10)

    // Convert the uploaded image to WebP format using sharp
    const webpFileName = `${inviteCode}.webp`;
    const webpFilePath = path.resolve(UPLOAD_DIR, webpFileName);

    if(inviteCode){
      await prisma.server.create({
        data:{
            name: name as string,
            inviteCode: inviteCode as string,
            userId: userId as string,
            serverImage: `${inviteCode}.webp` as string,
            channels:{
              create:[
                {name: "general", userId: userId as string}
              ]
            },
            members:{
              create:[
                {userId: userId as string, role: MemberRole.ADMIN}
              ]
            }
          }
        })
    }
    

    await sharp(buffer)
      .webp({ quality: 80 }) // Convert to WebP with quality 80
      .toFile(webpFilePath); // Save the WebP file

    return NextResponse.json({
      success: true,
      message: "Server Created!",
      fileName: webpFileName, // Use the WebP file name
      filePath: `/uploads/${webpFileName}`, // Return the WebP file path
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({
      success: false,
      message: "File upload failed",
    });
  }
};
