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

export default function PostCard({ post, isDetails }) {
  const postHasImage = !!post.image;
  const firstComment = post.commentsCount;
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

      <CommentForm />

      {firstComment && <CommentCard comment={post.topComment} />}

      {isDetails &&
        post.commentsCount > 0 &&
        Object.keys(post.topComment).map((comment) => {
          <CommentCard comment={comment} />;
        })}

      {!isDetails && post.commentsCount > 1 && (
        <Link to={`/post-details/${post.id}`} className="text-blue-700 p-4 text-center">
          View All Comments
        </Link>
      )}
    </Card>
  );
}
