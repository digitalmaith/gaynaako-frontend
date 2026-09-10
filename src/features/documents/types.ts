import type { DocumentStatus } from "./documentStatus";

export interface DocumentEntry {
  id: string;
  label: string;
  detail: string;
  status: DocumentStatus;
  updatedAt?: string;
}