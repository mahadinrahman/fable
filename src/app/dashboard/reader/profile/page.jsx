'use client';
import { authClient } from "@/lib/auth-client";
import { PersonFill } from "@gravity-ui/icons";
import { Avatar, Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;

        await authClient.updateUser({
            name,
            image
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-6 text-zinc-100">
            
            {/* প্রোফাইলカード */}
            <div className="w-full max-w-sm bg-zinc-900/70 border border-zinc-800/80 shadow-[0_0_50px_rgba(145,70,255,0.11)] p-6 rounded-2xl backdrop-blur-md">
                <h1 className="text-xl font-bold text-center tracking-tight text-zinc-200 mb-8">My Profile</h1>
                
                {/* প্রোফাইল ইমেজ সেকশন */}
                <div className="flex flex-col items-center mb-6">
                    {/* ইমেজ থেকে এক্সট্রা ব্যাকগ্রাউন্ড এবং রিং বাদ দেওয়া হয়েছে */}
                    <Avatar className="w-24 h-24 ring-4 ring-zinc-800/40 shadow-inner">
                        <Avatar.Image alt="User Image" src={user?.image} className="object-cover" />
                        <Avatar.Fallback className="text-3xl font-bold bg-zinc-800 text-zinc-300">
                            {user?.name ? user.name[0].toUpperCase() : "U"}
                        </Avatar.Fallback>
                    </Avatar>
                    
                    <h2 className="text-xl text-zinc-100 font-bold mt-4 tracking-tight">
                        {user?.name || "Loading..."}
                    </h2>
                    <p className="text-sm text-zinc-500 font-mono mt-1">
                        {user?.email || "No email available"}
                    </p>
                </div>

                {/* মডাল এবং আপডেট ট্রিগার */}
                <Modal>
                    {/* আপডেট প্রোফাইল বাটন গ্রাডিয়েন্ট */}
                    <div className="flex justify-center mt-4">
                        <Button className="w-full bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white font-semibold py-2.5 rounded-xl transition duration-300 opacity-90 hover:opacity-100 shadow-lg shadow-[#9146FF]/20">
                            Update Profile
                        </Button>
                    </div>
                    
                    <Modal.Backdrop className="bg-black/70 backdrop-blur-sm">
                        <Modal.Container placement="center">
                            
                            {/* মডাল ডায়ালগ */}
                            <Modal.Dialog className="w-full max-w-md bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl overflow-hidden shadow-2xl">
                                <Modal.CloseTrigger className="text-zinc-400 hover:text-white" />
                                
                                <Modal.Header className="border-b border-zinc-800/60 pb-4 flex items-center gap-3">
                                    <Modal.Icon className="bg-gradient-to-r from-[#9146FF]/10 to-[#FF007A]/10 text-[#FF007A] p-2 rounded-xl border border-[#9146FF]/20">
                                        <PersonFill className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading className="text-lg font-bold text-zinc-200">Edit Profile Details</Modal.Heading>
                                </Modal.Header>
                                
                                <Modal.Body className="p-6">
                                    <Surface className="bg-transparent">
                                        <form onSubmit={onSubmit} className="flex flex-col gap-5">
                                            
                                            {/* নাম পরিবর্তন ফিল্ড */}
                                            <div className="flex flex-col gap-2">
                                                <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Full Name</Label>
                                                <Input 
                                                    defaultValue={user?.name} 
                                                    name="name" 
                                                    type="text"
                                                    placeholder="Enter your name" 
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#9146FF]/50 text-zinc-200 rounded-xl px-4 py-2.5 outline-none transition text-sm"
                                                />
                                            </div>

                                            {/* ইমেজ ইউআরএল ফিল্ড */}
                                            <div className="flex flex-col gap-2">
                                                <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Avatar URL</Label>
                                                <Input 
                                                    defaultValue={user?.image} 
                                                    name="image" 
                                                    type="text"
                                                    placeholder="Paste image URL" 
                                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#FF007A]/50 text-zinc-200 rounded-xl px-4 py-2.5 outline-none transition text-sm"
                                                />
                                            </div>

                                            {/* ফুটার বাটন অ্যাকশন */}
                                            <Modal.Footer className="border-t border-zinc-800/60 pt-4 flex gap-3 mt-4">
                                                <Button slot="close" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-2 rounded-xl transition text-sm">
                                                    Cancel
                                                </Button>
                                                <Button slot="close" type="submit" className="flex-1 bg-gradient-to-r from-[#9146FF] to-[#FF007A] text-white font-semibold py-2 rounded-xl transition text-sm shadow-xl opacity-90 hover:opacity-100">
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>

                                        </form>
                                    </Surface>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>
        </div>
    );
};

export default ProfilePage;