import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2pYp4Y7YnSdeJeGN9PhE45wrzhD",
];

export const isAdmin = () => {
    const {userId} = auth();

    if (!userId){
        return false;
    }

    return adminIds.indexOf(userId)  !== -1
}