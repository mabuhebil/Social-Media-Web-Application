import PostCard from "./PostCard";
import Loader from "../Shared/Loader/Loader";
import { Alert } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Services/posts.services";

export default function PostListing() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: getAllPosts,
  });

    console.log("DataFromGetAllPost", data);

  if (isError) {
    return (
      <section className="py-12">
        <div className="w-full max-w-100 md:max-w-1/2 mx-auto space-y-4">
          <Alert
            color={"danger"}
            title={error.response ? error.response.data.error : error.message}
          />
        </div>
      </section>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="py-12">
      <div className="w-full max-w-100 md:max-w-1/2 mx-auto space-y-4">
        {data &&
          data.data.data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </section>
  );
}
