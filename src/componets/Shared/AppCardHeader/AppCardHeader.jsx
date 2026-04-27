import {
  Button,
  CardHeader,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useContext } from "react";

import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

export default function AppCardHeader({ topComment, post, userCardId }) {
  const { userId } = useContext(AuthContext);

  const isTheSameId = userId == userCardId;

  return (
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

      {isTheSameId && (
        <Dropdown className="min-w-fit">
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <HiDotsVertical />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem key="new" className="flex  gap-0.5">
              <MdDelete />
              <p>Delete</p>
            </DropdownItem>
            <DropdownItem key="copy" className="flex gap-0.5">
              <MdEdit />
              <p>Edit</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </CardHeader>
  );
}
