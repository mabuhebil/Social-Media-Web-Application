import { Input } from "@heroui/react";
import React from "react";
import AppButton from "./Shared/AppButton/AppButton";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { addNewComment } from "./Services/comments.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentForm({ postId, queryKey }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const queryClientObj = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payLoad) => addNewComment(payLoad),
    onSuccess: () => {
      queryClientObj.invalidateQueries({queryKey:queryKey})
    },
  });

  async function createComment(data) {
    const payLoad = {
      content: data.content,
      postId: postId,
    };

    mutation.mutate(payLoad);
  }

  return (
    <form
      onSubmit={handleSubmit(createComment)}
      className="p-4 flex gap-x-4 items-start"
    >
      <div className="w-full">
        <Input
          className="w-full"
          placeholder="Enter your comment"
          type="text"
          variant="bordered"
          {...register("content", {
            required: { value: true, message: "comment Requird" },
            maxLength: { value: 255, message: "Max 255 Char" },
          })}
        />

        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}
      </div>
      <AppButton
        type="submit"
        isIconOnly
        aria-label="Send"
        color="primary"
        variant="faded"
      >
        <IoMdSend />
      </AppButton>
    </form>
  );
}
