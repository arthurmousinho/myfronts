import { Post } from "@/components/Post";

export function Feed() {
    return (
        <div className="w-full flex flex-col gap-4 items-center justify-center mt-[100px] mb-96">
            <Post />
            <Post />
        </div>
    )
}