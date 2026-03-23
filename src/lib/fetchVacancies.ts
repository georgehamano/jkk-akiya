import type { VacancyData } from "@/types/vacancy";

const VACANCIES_URL =
  process.env.NEXT_PUBLIC_VACANCIES_URL ||
  "https://raw.githubusercontent.com/georgehamano/jkk-akiya-data/main/vacancies.json";

export async function fetchVacancies(): Promise<VacancyData | null> {
  try {
    const res = await fetch(VACANCIES_URL, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as VacancyData;
  } catch {
    return null;
  }
}
