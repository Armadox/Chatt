import Image from "next/image";
import { useState } from "react";
import Brushed from "../Brushed";

interface MemberMenuProps{
    name: string | null,
    email: string | null,
    memberId: string,
    image: string | null,
    memberRole: "GUEST" | "MODERATOR" | "ADMIN" | undefined,
    currentRole: "GUEST" | "MODERATOR" | "ADMIN" | undefined,
    serverId: string;
}

const MemberCard:React.FC<MemberMenuProps> = ({name, email, memberId, image, currentRole, serverId, memberRole}) => {
    const [role, setRole] = useState(memberRole);
    console.log("MY CURRENT ROLE: ", currentRole)

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRole(e.target.value as "GUEST" | "MODERATOR" | "ADMIN");
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
        const response = await fetch("/api/editMember", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId,
            serverId,
            role,
          }),
        });
        if (response.ok) {
          console.log("Role updated successfully");
        } else {
          console.error("Failed to update role");
        }
      }catch(err){
        console.error("Error submitting form:", err);
      }
    }

    return (           
          <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-bold mb-4">{name}</h2>
              <p>{email}</p>
              {image && (
                <Image 
                  src={image} 
                  alt={name || "Selected User"} 
                  width={100} 
                  height={100} 
                  className="rounded-full"
                />
              )}
              {(currentRole === "MODERATOR" || currentRole === "ADMIN") &&
              <>
              <select value={role} onChange={handleRoleChange}>
                <option value="GUEST">GUEST</option>
                <option value="MODERATOR">MODERATOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <Brushed brush={"2"}><button type="submit">Update Role</button></Brushed>
              </> 
              }
          </form>
     );
}
 
export default MemberCard;