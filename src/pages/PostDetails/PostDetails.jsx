import { getSinglePost } from "../../componets/Services/posts.services";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@heroui/react";
import Loader from "../../componets/Shared/Loader/Loader";
import PostCard from "../../componets/Posts/PostCard";
2;

export default function PostDetails() {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single-post", postId],
    queryFn: () => getSinglePost(postId),
    select: (data) => data?.data.data.post,
  });


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
        {data && <PostCard post={data} isDetails={true} isGetAllComments={true} queryKey={["single-post", postId]}/>}
      </div>
    </section>
  );
}
