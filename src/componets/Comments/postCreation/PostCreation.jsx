import { Avatar, Card, CardBody, Textarea } from "@heroui/react";
import { CiImageOn } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
export default function PostCreation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isExicedImage, setISExicedImage] = useState(null);

  const ImageInput = useRef();
  const TextArea = useRef();

  function handelChangeFile(e) {
    setISExicedImage(URL.createObjectURL(e.target.files[0]));
  }

  function handleCloseImage() {
    setISExicedImage(null);
    ImageInput.current.value = "";
  }

  function handelAddPost() {
    const postObj = new FormData();

    if (TextArea.current.value) {
      postObj.append("body", TextArea.current.value);
    }

    if (ImageInput.current.files[0]) {
      postObj.append("image", ImageInput.current.files[0]);
    }
    return axios.request({
      url: `https://route-posts.routemisr.com/posts`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")} `,
      },
      data: postObj,
    });
  }
  const { isPending, mutate } = useMutation({
    mutationFn: handelAddPost,
  });
  return (
    <>
      <section className="pt-12 ">
        <div className="w-full max-w-100 md:max-w-1/2 mx-auto space-y-4">
          <Card>
            <CardBody className="flex flex-row items-center gap-5">
              <Avatar
                alt="John Doe"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />
              <div
                onClick={onOpen}
                className="bg-gray-600 p-2 rounded-full px-5 w-full"
              >
                <p className="text-white">what is in your mind mohamed</p>
              </div>
            </CardBody>
          </Card>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Post
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-row items-center gap-5">
                      <Avatar
                        alt="John Doe"
                        src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                      />
                      <p>mohamed</p>
                    </div>
                    <Textarea
                      ref={TextArea}
                      placeholder="whats on your mind , mohamed"
                    />

                    {isExicedImage && (
                      <div className="relative">
                        <img
                          src={isExicedImage}
                          alt="hero ui img"
                          className="rounded-xl"
                        />
                        <IoCloseCircleOutline
                          className="absolute top-3 text-3xl text-white end-3"
                          onClick={handleCloseImage}
                        />
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter className="flex items-center">
                    <label>
                      <CiImageOn className="text-2xl" />
                      <input
                        ref={ImageInput}
                        type="file"
                        hidden
                        onChange={handelChangeFile}
                      />
                    </label>
                    <Button
                      color="danger"
                      variant="light"
                      disabled={isPending}
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button color="primary" onPress={mutate}>
                      Post
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>{" "}
        </div>
      </section>
    </>
  );
}
