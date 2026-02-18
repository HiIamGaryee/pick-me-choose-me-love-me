import api from "../utils/axiosConfig";

export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  sequence: number;
  created_at: string;
};

export const getEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events/");
  return res.data;
};

export const getEventById = async (id: number): Promise<Event> => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const adminListEvents = async (): Promise<Event[]> => {
  const res = await api.get("/admin/events/");
  return res.data;
};

export const adminCreateEvent = async (payload: Omit<Event, "id" | "created_at">): Promise<Event> => {
  const res = await api.post("/admin/events/", payload);
  return res.data;
};

export const adminUpdateEvent = async (id: number, payload: Partial<Omit<Event, "id" | "created_at">>): Promise<Event> => {
  const res = await api.put(`/admin/events/${id}`, payload);
  return res.data;
};

export const adminDeleteEvent = async (id: number): Promise<{ message: string }> => {
  const res = await api.delete(`/admin/events/${id}`);
  return res.data;
};


