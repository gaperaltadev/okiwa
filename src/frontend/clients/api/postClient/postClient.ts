import {
  PostCreateClientRequestBody,
  PostCreateClientResponse,
} from "@/app/api/client/route";
import axios, { AxiosResponse } from "axios";

const postClient = async (
  payload: PostCreateClientRequestBody
): Promise<AxiosResponse<PostCreateClientResponse>> => {
  return await axios.post<PostCreateClientResponse>("/api/client", payload);
};

export default postClient;
