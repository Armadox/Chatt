"use client"

import { getCurrentAccount, getCurrentUser } from "@/app/api/helpers/utils";
import { Account } from "@prisma/client";
import { ChangeEvent, useRef, useState } from "react";
import Brushed from "../Brushed";

interface ServerCreatorProps{
    account: Account | null
}

const ServerCreator:React.FC<ServerCreatorProps> = ({account}) => {

    if(!account){
        return(<>...Loading</>)
    }


    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const userId = account.userId;

    const handleImageUploadClick = () => {
      fileInputRef.current?.click();
    };

    const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setImage(file);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0];
        setImage(file);
      }
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (image === null) {
        setMessage("Please select a file to upload.");
        return;
      }
      
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("userId", userId); // You can append text data to the FormData as well

      try {
        const response = await fetch("/api/createServer", {
          method: "POST",
          // Don't set headers, let the browser handle it for FormData
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully!");
          setMessage("File uploaded successfully!");
        } else {
          const errorData = await response.json();
          console.log(`Error: ${errorData.message}`);
          setMessage(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.log("Error submitting form:", err);
        setMessage("An error occurred. Please try again.");
      }
    };

    

      return (
        <div className="min-w-[18rem] max-w-[24rem]">
          <Brushed brush={"1"}>
          <form onSubmit={handleSubmit} className="py-5">
            <div className="flex flex-col items-center m-5 gap-2">
              <div className="text-xl">Create your Server</div>
              <div className="mb-4">
                <div
                  className="cursor-pointer bg-white w-[8rem] h-[8rem] rounded-full overflow-hidden"
                  onDragOver={handleDragOver}
                  onDrop={handleFileDrop}
                  onClick={handleImageUploadClick}
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="h-[100%] w-[100%] object-contain bg-center"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-row items-center justify-center text-black"><span>+</span></div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={updateImage}
                  />
                </div>
              </div>
              <label>Server Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-4 text-black"
              />
              <div className="invert hover:invert-0">
                <Brushed brush={"2"}><button type="submit">Sign Up</button></Brushed>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
          </Brushed>
        </div>
      );
    
}
 
export default ServerCreator;