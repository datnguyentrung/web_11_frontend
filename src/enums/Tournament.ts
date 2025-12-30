// 1. Định nghĩa các giá trị LOGIC (Phải khớp 100% với Database/API trả về)
export const TournamentScope = {
    EXCHANGE_EVENT: 'EXCHANGE_EVENT',
    INTERNAL_TOURNAMENT: 'INTERNAL_TOURNAMENT',
    CITY_TOURNAMENT: 'CITY_TOURNAMENT',
    NATIONAL_TOURNAMENT: 'NATIONAL_TOURNAMENT',
    NATIONAL_CHAMPIONSHIP: 'NATIONAL_CHAMPIONSHIP'
} as const;

export const TournamentState = {
    UPCOMING: 'UPCOMING',     // Sửa lại thành tiếng Anh/Code
    ONGOING: 'ONGOING',       // Sửa lại thành tiếng Anh/Code
    COMPLETED: 'COMPLETED',   // Sửa lại thành tiếng Anh/Code
    CANCELLED: 'CANCELLED'    // Sửa lại thành tiếng Anh/Code
} as const;

export const PoomsaeMode = {
    ELIMINATION: 'ELIMINATION',
    ROUND_ROBIN: 'ROUND_ROBIN'
} as const;

// Tạo Type từ các constant trên (để dùng cho TypeScript check lỗi)
export type TournamentScopeKey = keyof typeof TournamentScope;
export type TournamentStateKey = keyof typeof TournamentState;
export type PoomsaeModeKey = keyof typeof PoomsaeMode;

// ---------------------------------------------------------

// 2. Định nghĩa các giá trị HIỂN THỊ (Tiếng Việt) - Dùng để map ra UI
// Cách đặt tên thường là: TênGốc + Label hoặc Map

export const TournamentScopeLabel: Record<TournamentScopeKey, string> = {
    [TournamentScope.EXCHANGE_EVENT]: 'Giải giao hữu',
    [TournamentScope.INTERNAL_TOURNAMENT]: 'Giải nội bộ',
    [TournamentScope.CITY_TOURNAMENT]: 'Giải cấp thành phố',
    [TournamentScope.NATIONAL_TOURNAMENT]: 'Giải quốc gia',
    [TournamentScope.NATIONAL_CHAMPIONSHIP]: 'Giải vô địch quốc gia'
};

export const TournamentStateLabel: Record<TournamentStateKey, string> = {
    [TournamentState.UPCOMING]: 'Sắp diễn ra',
    [TournamentState.ONGOING]: 'Đang diễn ra',
    [TournamentState.COMPLETED]: 'Đã hoàn thành',
    [TournamentState.CANCELLED]: 'Đã hủy bỏ'
};

export const PoomsaeModeLabel: Record<PoomsaeModeKey, string> = {
    [PoomsaeMode.ELIMINATION]: 'Đấu loại trực tiếp',
    [PoomsaeMode.ROUND_ROBIN]: 'Đấu vòng tròn'
};