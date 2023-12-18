import { FilterQuery } from "mongoose";
import Session from "../models/session.model";
import { FilterSessionsQuery } from "../schemas/sessions.schemas";

export const SessionRepository = {
  getSessions: async (filter: FilterSessionsQuery["query"]) => {
    const filters: FilterQuery<any> = filter || {};
    const sessions = await Session.find(filters);

    return sessions;
  },

  createSession: async ({
    user,
    userAgent,
  }: {
    user: string;
    userAgent: string;
  }) => {
    
  },
};
