import React from "react";
import PostListing from "../../componets/Posts/PostListing";
import PostCreation from "../../componets/Comments/postCreation/PostCreation";

export default function Home() {
  return (
    <>
      {/* add post form*/}
      {/* post listing*/}

      <PostCreation />
      <PostListing />
    </>
  );
}
