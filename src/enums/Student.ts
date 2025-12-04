// --- PHẦN 1: LOGIC (Dùng để so sánh, lưu DB, bắn API) ---
export const BeltLevel = {
    C10: 'C10',
    C9: 'C9',
    C8: 'C8',
    C7: 'C7',
    C6: 'C6',
    C5: 'C5',
    C4: 'C4',
    C3: 'C3',
    C2: 'C2',
    C1: 'C1',
    I_DANG: 'I_DANG',
    II_DANG: 'II_DANG',
    III_DANG: 'III_DANG',
    IV_DANG: 'IV_DANG',
    V_DANG: 'V_DANG',
} as const;

// Tạo Type cho Key
export type BeltLevelKey = keyof typeof BeltLevel;


// --- PHẦN 2: HIỂN THỊ (Dùng để map ra giao diện tiếng Việt) ---
export const BeltLevelLabel: Record<BeltLevelKey, string> = {
    [BeltLevel.C10]: 'Trắng',
    [BeltLevel.C9]: 'Vàng 1',
    [BeltLevel.C8]: 'Vàng 2',
    [BeltLevel.C7]: 'Xanh Lá',
    [BeltLevel.C6]: 'Xanh Dương 1',
    [BeltLevel.C5]: 'Xanh Dương 2',
    [BeltLevel.C4]: 'Đỏ 1',
    [BeltLevel.C3]: 'Đỏ 2',
    [BeltLevel.C2]: 'Đen 3',
    [BeltLevel.C1]: 'Đen 4',
    [BeltLevel.I_DANG]: 'Đẳng 1',
    [BeltLevel.II_DANG]: 'Đẳng 2',
    [BeltLevel.III_DANG]: 'Đẳng 3',
    [BeltLevel.IV_DANG]: 'Đẳng 4',
    [BeltLevel.V_DANG]: 'Đẳng 5',
};