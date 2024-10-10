"use client"

import { getCurrentAccount, getCurrentUser } from "@/app/api/helpers/utils";
import { Account, Member, Server, User } from "@prisma/client";
import { ChangeEvent, useRef, useState } from "react";
import Brushed from "../Brushed";
import Image from "next/image";
import MemberCard from "../MemberCard";

interface MemberWithAccount extends Member {
  profile:{
    user:{
      name: string | null;
      email: string | null;
      image: string | null
    }
    userId: string;
  };
}

interface MemberMenuProps{
  members: MemberWithAccount[] | null;
  currentRole: "GUEST" | "MODERATOR" | "ADMIN" | undefined;
  serverId: string;
}

const MemberMenu:React.FC<MemberMenuProps> = ({members, currentRole, serverId}) => {
    const [open, setOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<MemberWithAccount | null>(null);
    
    if(!members){
      return null
    }

    const allMembers = Object.keys(members).map((key: any) => members[key]);

    const admins = allMembers.filter((member) => member.role !== "GUEST");
    const guests = allMembers.filter((member) => member.role === "GUEST");

    const handleMemberClick = (member: MemberWithAccount) => {
      setSelectedMember(member);
    };

    const handleClose = () => {
      console.log("SELECTED: ", selectedMember)
      setSelectedMember(null);  
    };

    return (
      <div className="w-[14rem]">
        <form>
          <div>{allMembers.length} USERS</div>
          ADMINS:
          {admins.map((member) => (
              <div key={member.id} className="flex items-center" onClick={() => handleMemberClick(member)}>
                {member.profile.user.image && <Image src={member.profile.user.image} alt={""} width={30} height={30} className="rounded-full"/>}
                <div>{member.profile.user.name}</div>
              </div>
            ))}
            MEMBERS:
            {guests.map((member) => (
              <div key={member.id} className="flex items-center" onClick={() => handleMemberClick(member)}>
                {member.profile.user.image && <Image src={member.profile.user.image} alt={""} width={30} height={30} className="rounded-full"/>}
                <div>{member.profile.user.name}</div>
              </div>
            ))}
        </form>
        {/* AAAA */}
        {selectedMember && (
          <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50" onClick={handleClose}/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <button 
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={handleClose}
                >
                  X
                </button>
                <MemberCard name={selectedMember.profile.user.name} 
                            email={selectedMember.profile.user.email} 
                            memberId={selectedMember.id} 
                            image={selectedMember.profile.user.image}
                            memberRole={selectedMember.role}
                            currentRole={currentRole}
                            serverId={serverId}/>             
              </div>
            </div>
          </>
        )}
      </div>
    );
    
}
 
export default MemberMenu;