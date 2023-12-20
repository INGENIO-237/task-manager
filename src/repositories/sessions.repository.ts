import { FilterQuery } from "mongoose";
import Session from "../models/session.model";
import { FilterSessionsQuery } from "../schemas/sessions.schemas";

export const SessionRepository = {
  getSessions: async (filterSet: FilterSessionsQuery["query"]) => {
    const filters: FilterQuery<any> = filterSet || {};
    const sessions = await Session.find(filters);

    return sessions;
  },
  createSession: async ({
    user,
    userAgent,
  }: {
    user: string;
    userAgent: string;
  }) => await Session.create({ user, userAgent }),
  getSession: async (filterSet: FilterSessionsQuery["query"]) => {
    const filters: FilterQuery<any> = filterSet || {};
    const session = await Session.findOne(filters);

    return session;
  },
};
