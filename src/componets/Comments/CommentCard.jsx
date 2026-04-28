import { CardBody, CardHeader, Image } from "@heroui/react";
import AppCardHeader from "../Shared/AppCardHeader/AppCardHeader";

export default function CommentCard({ comment, userCardId }) {
  const { _id } = comment;
  return (
    <>
      <AppCardHeader
        topComment={comment}
        userCardId={userCardId}
        commentId={_id}
        IsComment={true}
        postId={comment.post}
      />
      <CardBody className="space-y-4">
        <p>{comment.content}</p>
      </CardBody>
    </>
  );
}
