import { getCurrentAccount, getServer } from "@/app/api/helpers/utils";
import MenuList from "@/app/components/MenuList";
import { redirect } from "next/navigation";

const ChannelIdLayout = async ({children} : {children: React.ReactNode}) => {

    return (
        <div className="h-full flex-1">
            {children}
        </div>
    );
}
 
export default ChannelIdLayout;