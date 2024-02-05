import { FilterQuery } from "mongoose";
import Session from "../models/sessions.model";
import {
  FilterSessionsQuery,
  UpdateSessions,
} from "../schemas/sessions.schemas";
import { Service } from "typedi";

@Service()
class SessionRepository {
  async getSessions(filterSet: FilterSessionsQuery["query"]) {
    const filters: FilterQuery<any> = filterSet || {};
    const sessions = await Session.find(filters);

    return sessions;
  }
  async createSession({
    user,
    userAgent,
  }: {
    user: string;
    userAgent: string;
  }) {
    return await Session.create({ user, userAgent });
  }
  async getSession(filterSet: FilterSessionsQuery["query"]) {
    const filters: FilterQuery<any> = filterSet || {};
    const session = await Session.findOne(filters);

    return session;
  }
  async updateSession(
    filter: UpdateSessions["params"],
    update: UpdateSessions["body"]
  ) {
    await Session.updateMany(filter, update);
  }
}

export default SessionRepository