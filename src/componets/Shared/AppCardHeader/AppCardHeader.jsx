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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function AppCardHeader({
  topComment,
  post,
  postId,
  userCardId,
  commentId,
  IsComment,
  queryKey,
}) {
  const { userId } = useContext(AuthContext);

  const isTheSameId = userId == userCardId;

  const endPoint = IsComment ? "comment" : "post";

  function handelDeletePost() {
    return axios.request({
      url: `https://route-posts.routemisr.com/posts/${postId}`,
      method: "Delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")} `,
      },
    });
  }

  function handelDeleteComment() {
    console.log("id:", postId);
    return axios.request({
      url: `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      method: "Delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")} `,
      },
    });
  }

  const queryClient = useQueryClient();
  const { mutate: handelDelete } = useMutation({
    mutationFn: () => {
      return IsComment ? handelDeleteComment() : handelDeletePost();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      queryClient.invalidateQueries({ queryKey: queryKey });
      toast.success(`Deleting ${endPoint} been successfuly`, {
        autoClose: 2000,
        closeOnClick: true,
      });
    },
    onError: () => {
      toast.error(`deleting ${endPoint}faild`, {
        autoClose: 2000,
        closeOnClick: true,
      });
    },
  });

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
            <DropdownItem
              key="new"
              className="flex  gap-0.5"
              onClick={handelDelete}
            >
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
