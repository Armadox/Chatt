import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { MemberRole, PrismaClient } from "@prisma/client";
import sharp from "sharp";

const UPLOAD_DIR = path.resolve(process.cwd(), "public/uploads");
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const serverId = formData.get("serverId") as string;
    const inviteCode = formData.get("inviteCode") as string;


    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!name || !serverId) {
      return NextResponse.json({
        success: false,
        message: "Server not found!",
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Convert the uploaded image to WebP format using sharp
    const webpFileName = `${inviteCode}.webp`;
    const webpFilePath = path.resolve(UPLOAD_DIR, webpFileName);

    if(inviteCode){
      await prisma.server.update({
        where:{
          id: serverId
        },
        data:{
          name: name
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
