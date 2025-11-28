import Papa from 'papaparse';
import type { TheLuc } from '../types/bxh';


export const loadThelucData = async (): Promise<TheLuc[]> => {
    try {
        const response = await fetch('/data/theluc.csv');
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true, // Tự động convert string sang number
                complete: (results) => {
                    // console.log('Dữ liệu từ CSV:', results.data);
                    resolve(results.data as TheLuc[]);
                },
                error: (error: Error) => {
                    console.error('Lỗi khi đọc CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Lỗi khi fetch file CSV:', error);
        throw error;
    }
};
