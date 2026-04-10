import api from "./api";

export const createDemoUser = async () => {
  const res = await api.get("/test/demo-user");
  return res.data;
};

export const joinQueue = async ({ department, isPriority }) => {
  const user = await createDemoUser();
  await api.post("/queue/join", {
    userId: user._id,
    department,
    isPriority,
  });
  return { userId: user._id };
};

export const fetchQueueStatus = async (userId) => {
  const res = await api.get(`/queue/status/${userId}`);
  return res.data;
};

export const checkInQueue = async (userId) => {
  const res = await api.post("/queue/checkin", { userId });
  return res.data;
};
