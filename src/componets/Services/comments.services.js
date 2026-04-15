import axios from "axios";

// export async function addNewComment(data) {
//   return axios.request({
//     url: "https://linked-posts.routemisr.com/comments",
//     method: "post",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("user_token")}`,
//     },
//     data: data,
//   });
// }

export async function addNewComment(data) {
  const token = localStorage.getItem("user_token");

  return axios.post(
    `https://route-posts.routemisr.com/posts/${data.postId}/comments`,
    {
      content: data.content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

}
export async function getPostComments(id) {
  const token = localStorage.getItem("user_token");

  if (!token) throw new Error("No token found");

  return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
