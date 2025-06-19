import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const now = new Date();
    const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const lastDayFormatted = firstDay.slice(0, 8) + String(lastDay).padStart(2, '0');

    const response = await fetch(
        `http://127.0.0.1:8090/api/collections/transaction/records?expand=customer&sort=-created&skipTotal=true`
    );

    return { transactions: await response.json() };
};
