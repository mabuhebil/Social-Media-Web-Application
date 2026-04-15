import { CardBody, CardHeader, Image } from "@heroui/react";

export default function AppCardHeader({ topComment, post }) {
  return (
    <>
      <CardHeader className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          <Image
            alt={topComment ? topComment.commentCreator.name : post.user.name}
            height={topComment ? 40 : 80}
            radius="full"
            src={topComment ? topComment.commentCreator.photo : post.user.photo}
            width={topComment ? 40 : 80}
          />

          <div className="flex flex-col">
            <p className="text-md">
              {topComment ? topComment.commentCreator.name : post.user.name}
            </p>
            <p className="text-small text-default-500">
              {topComment ? topComment.createdAt : post.createdAt}
            </p>
          </div>
        </div>
      </CardHeader>
    </>
  );
}
