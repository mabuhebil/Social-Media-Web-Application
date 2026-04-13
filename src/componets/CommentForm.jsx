import { Input } from "@heroui/react";
import React from "react";
import AppButton from "./Shared/AppButton/AppButton";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { addNewComment } from "./Services/comments.services";
import img1 from "../../src/assets/Image1.webp";
export default function CommentForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  async function createComment(data) {
    const payLoad = {
      content: data.content,
      post: "664d4330c99473930fa0ed8d",
    };
    // console.log("click", data);
    const x = await addNewComment(payLoad);
    console.log(x);
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
