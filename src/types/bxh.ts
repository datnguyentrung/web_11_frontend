export interface Bxh {
    date: Date;
    studentId: string;
    studentName: string;
    branch: string;
    duration: number;
    amount: number;
    level: number;
    hlv: string;
    accept: boolean;
    rank?: number;
}

export interface TheLuc {
    level: number;
    time: number;
    amount: number;
    count10s: number;
}