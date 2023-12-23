import { FilterQuery } from "mongoose";
import Session from "../models/sessions.model";
import {
  FilterSessionsQuery,
  UpdateSessions,
} from "../schemas/sessions.schemas";

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
  updateSession: async (
    filter: UpdateSessions["params"],
    update: UpdateSessions["body"]
  ) => {
    await Session.updateMany(filter, update);
  },
};
