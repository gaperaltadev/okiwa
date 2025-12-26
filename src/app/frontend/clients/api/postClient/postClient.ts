import {
  PostCreateClientRequestBody,
  PostCreateClientResponse,
} from "@/app/api/client/route";
import instance from "@/utils/axios";
import { AxiosResponse } from "axios";

const postClient = async (
  payload: PostCreateClientRequestBody
): Promise<AxiosResponse<PostCreateClientResponse>> => {
  return await instance.post<PostCreateClientResponse>(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/client`,
    payload
  );
};

export default postClient;
