import { CreateUserRequestBody } from "@/app/api/user/route";
import instance from "@/utils/axios";

const postUser = async (payload: CreateUserRequestBody) => {
  return await instance.post("/api/user", payload);
};

export default postUser;
