export const fetchGetAllTournaments = {
    "statusCode": 200,
    "error": null,
    "message": "CALL API SUCCESS",
    "data": [
        {
            "idTournament": "5df55583-6eed-4dfd-8250-ba8ab70385ad",
            "tournamentName": "Giải Hệ Thống mùa Đông 2025",
            "tournamentDate": "2025-10-12",
            "location": "Hệ Thống",
            "tournamentScope": "INTERNAL_TOURNAMENT",
            "tournamentState": "ONGOING"
        },
        {
            "idTournament": "80bfdbb9-c9d4-40a7-80c3-c20df28506b9",
            "tournamentName": "Giải Đại Hội Thể Dục Thể Theo Thủ Đô Năm 2025",
            "tournamentDate": "2025-11-18",
            "location": null,
            "tournamentScope": "CITY_TOURNAMENT",
            "tournamentState": "COMPLETED"
        },
        {
            "idTournament": "2f0cef13-1e31-4975-8468-5b8505e4acae",
            "tournamentName": "Giải Vô Địch Taekwondo Các Câu Lạc Bộ Quốc Gia",
            "tournamentDate": "2025-09-11",
            "location": null,
            "tournamentScope": "NATIONAL_TOURNAMENT",
            "tournamentState": "COMPLETED"
        },
        {
            "idTournament": "555bf9f4-b5ff-47cf-8d59-13f22e5a9c3b",
            "tournamentName": "Festival Taekwondo Hà Nội mở rộng – Cúp Thăng Long Lần thứ 2 - Năm 2026",
            "tournamentDate": "2026-01-24",
            "location": "Nhà thi đấu Bắc Từ Liêm - Số 08 phố Võ Quý Huân, phường Phú Diễn, Hà Nội",
            "tournamentScope": "CITY_TOURNAMENT",
            "tournamentState": "UPCOMING"
        }
    ]
}

export const fetchGetTournamentById = {
    "statusCode": 200,
    "error": null,
    "message": "CALL API SUCCESS",
    "data": {
        "tournamentName": "Giải Hệ Thống mùa Đông 2025",
        "tournamentDate": "2025-10-12",
        "location": "Hệ Thống",
        "tournamentScope": "INTERNAL_TOURNAMENT",
        "tournamentState": "ONGOING",
        "idTournament": "5df55583-6eed-4dfd-8250-ba8ab70385ad"
    }
}