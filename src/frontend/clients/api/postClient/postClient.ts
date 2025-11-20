import {
  PostCreateClientRequestBody,
  PostCreateClientResponse,
} from "@/app/api/client/route";
import axios, { AxiosResponse } from "axios";

const postClient = async (
  payload: PostCreateClientRequestBody
): Promise<AxiosResponse<PostCreateClientResponse>> => {
  return await axios.post<PostCreateClientResponse>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/client`,
    payload
  );
};

export default postClient;
