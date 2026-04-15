import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaCommentAlt, FaShare, FaThumbsUp } from "react-icons/fa";
import CommentCard from "../Comments/CommentCard";
import AppCardHeader from "../Shared/AppCardHeader/AppCardHeader";
import { Link } from "react-router-dom";
import CommentForm from "../CommentForm";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "../Services/comments.services";

// function handelGetComments(){

// }

export default function PostCard({
  post,
  isDetails,
  isGetAllComments = false,
}) {
  const postHasImage = !!post.image;
  const firstComment = post.commentsCount;

  const { id } = post;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: () => getPostComments(id),
    select: (data) => data?.data.data.comments,
    enabled: isGetAllComments,
  });

  const comments = data ?? [];

  console.log("dataFromGetPostComments", comments);
  return (
    <Card fullWidth={true}>
      <AppCardHeader topComment={false} post={post} />
      <Divider />
      <CardBody>
        <p>{post.body}</p>
        {postHasImage && (
          <Image
            alt={post.body}
            height={400}
            radius="sm"
            src={post.image}
            width={"100%"}
            className="object-cover"
          />
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <button className="flex flex-col items-center">
          <FaThumbsUp />
          Like
        </button>
        <button className="flex flex-col items-center">
          <FaCommentAlt />
          Comment
        </button>
        <button className="flex flex-col items-center">
          <FaShare />
          Share
        </button>
      </CardFooter>

      <CommentForm postId={id} />

      {firstComment && <CommentCard comment={post.topComment} />}

      {comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}

      {isDetails &&
        post.commentsCount > 0 &&
        Object.keys(post.topComment).map((comment) => {
          <CommentCard comment={comment} />;
        })}

      {!isDetails && post.commentsCount > 1 && (
        <Link
          to={`/post-details/${post.id}`}
          className="text-blue-700 p-4 text-center"
        >
          View All Comments
        </Link>
      )}
    </Card>
  );
}
