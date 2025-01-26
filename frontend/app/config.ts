import dotenv from "dotenv"
dotenv.config()
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const HOOKS_URL =  process.env.NEXT_PUBLIC_HOOKS

export type zapRunsType={
    createdAt: string; // ISO 8601 format date
    id: string; // UUID
    metadata: {
      issue?: Record<string, unknown>;
      action: string;
      sender?: Record<string, unknown>;
      repository?: Record<string, unknown>;
      [key: string]: unknown; // To allow additional metadata properties
    };
    zap: {
      id: string; // UUID
      triggerId: string; // UUID
      userId: number;
    };
    zapId: string; // UUID
  };