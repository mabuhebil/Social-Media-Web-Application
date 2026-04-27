import { CardBody, CardHeader, Image } from "@heroui/react";
import AppCardHeader from "../Shared/AppCardHeader/AppCardHeader";

export default function CommentCard({ comment, userCardId }) {
  return (
    <>
      <AppCardHeader topComment={comment} userCardId={userCardId} />
      <CardBody className="space-y-4">
        <p>{comment.content}</p>
      </CardBody>
    </>
  );
}
