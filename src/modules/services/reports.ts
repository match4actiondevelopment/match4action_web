import axios from "axios";
import { http } from "../config/http";

export interface ReportRow {
  key: string; initiativeId: string; organisationId: string;
  volunteerName: string | null; volunteerEmail: string | null;
  roleName: string; organisationName: string | null; appliedAt: string | null;
  status: string; applicationSource: string; opportunityLocation: string | null; legacy: boolean;
}
export interface ReportFilters {
  range: string; from: string; to: string; role: string;
  status: string; location: string; source: string;
}
export interface ReportData {
  rows: ReportRow[]; total: number; page: number; pageSize: number;
  summary: { day: number; week: number; month: number; undated: number };
  timezone: string; start: string | null; endExclusive: string | null;
}
export interface ReportRole { _id: string; name: string; organisation: string | null }

function params(filters: ReportFilters) {
  const p: Record<string, string> = { range: filters.range };
  if (filters.range === "custom") { p.from = filters.from; p.to = filters.to; }
  for (const key of ["role", "status", "location", "source"] as const) {
    if (filters[key].trim()) p[key] = filters[key].trim();
  }
  return p;
}
async function failure(error: unknown): Promise<never> {
  if (axios.isCancel(error)) throw error;
  if (axios.isAxiosError(error)) {
    let data = error.response?.data;
    if (typeof Blob !== "undefined" && data instanceof Blob) {
      try { data = JSON.parse(await data.text()); } catch { data = null; }
    }
    throw new Error(typeof data?.message === "string" ? data.message : "Could not load the report. Please try again.");
  }
  throw error;
}
async function get<T>(url: string, query?: Record<string, string>, signal?: AbortSignal): Promise<T> {
  try {
    const { data } = await axios.get(url, { baseURL: http.defaults.baseURL,
      withCredentials: true, params: query, signal });
    if (!data?.success) throw new Error("Invalid report response.");
    return data.data as T;
  } catch (error) { return failure(error); }
}
export const fetchReport = (filters: ReportFilters, page: number, signal?: AbortSignal) =>
  get<ReportData>("/reports", { ...params(filters), page: String(page), pageSize: "25" }, signal);
export const fetchReportRoles = (signal?: AbortSignal) => get<ReportRole[]>("/reports/roles", undefined, signal);
export const fetchReportDetail = (key: string, signal?: AbortSignal) =>
  get<ReportRow>(`/reports/applications/${encodeURIComponent(key)}`, undefined, signal);
export async function downloadReport(filters: ReportFilters) {
  try {
    const result = await axios.get("/reports/export", { baseURL: http.defaults.baseURL,
      withCredentials: true, params: params(filters), responseType: "blob" });
    const url = URL.createObjectURL(result.data);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "volunteer-applications.csv";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) { return failure(error); }
}