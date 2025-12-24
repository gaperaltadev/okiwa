import instance from "@/utils/axios";

const deleteUser = async (userId: string) => {
  return await instance.delete("/api/user", { data: { uid: userId } });
};

export default deleteUser;
