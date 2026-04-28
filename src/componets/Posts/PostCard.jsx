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
  queryKey,
  queryKeyDetails,
  queryKeySinglePost,
}) {
  const postHasImage = !!post.image;
  const firstComment = post.commentsCount;

  const { id } = post;

  const { _id } = post.user;

  const { data } = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: () => getPostComments(id),
    select: (data) => data?.data.data.comments,
    enabled: isGetAllComments,
  });

  const comments = data ?? [];

  return (
    <Card fullWidth={true}>
      <AppCardHeader
        topComment={false}
        post={post}
        userCardId={_id}
        postId={id}
        queryKey={queryKey}
      />
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

      <CommentForm
        postId={id}
        queryKey={queryKey}
        queryKeySinglePost={queryKeySinglePost}
      />

      {firstComment && (
        <CommentCard comment={post.topComment} userCardId={_id} />
      )}

      {comments.map((comment) => (
        <CommentCard comment={comment} userCardId={_id} />
      ))}

      {isDetails &&
        post.commentsCount > 0 &&
        Object.keys(post.topComment).map((comment) => {
          <CommentCard comment={comment} userCardId={_id} />;
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
