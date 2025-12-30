import { endpoints } from '@/api/endpoints';
import axiosInstance from '@/api/axiosInstance';

export const searchStudents = async (query: string, signal: AbortSignal) => {
    try {
        // const response = await axiosInstance.get(endpoints.student.search, {
        //     params: { query },
        //     signal: signal
        // });
        // console.log('Student search response:', response.data.data); // Debug log
        // return response.data.data;
        return [
            {
                "personalInfo": {
                    "name": "Trương Quỳnh Chi",
                    "idAccount": "TKD13GS017",
                    "idNational": "HV_chitq_170612",
                    "birthDate": "2013-05-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 1,
                    "beltLevel": "II_DANG",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Đinh Chí Dũng",
                    "idAccount": "TKD13GS202",
                    "idNational": "HV_dungdc_040516",
                    "birthDate": "2016-05-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 3,
                    "beltLevel": "C1",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Nguyễn Chí Hải",
                    "idAccount": "TKD13GS268",
                    "idNational": "HV_hainc_140812",
                    "birthDate": "2013-02-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 2,
                    "beltLevel": "C3",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Trần Đỗ Linh Chi",
                    "idAccount": "TKD13GS277",
                    "idNational": "HV_chitdl_090211",
                    "birthDate": "2011-09-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 2,
                    "beltLevel": "C4",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Đoàn Thùy Chi",
                    "idAccount": "TKD13GS336",
                    "idNational": "",
                    "birthDate": "2018-07-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 4,
                    "beltLevel": "C9",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Nguyễn Hoàng Quỳnh Chi",
                    "idAccount": "TKD13GS393",
                    "idNational": "",
                    "birthDate": "2008-04-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 4,
                    "beltLevel": "C10",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Đặng Đình Chí Công",
                    "idAccount": "TKD13GS470",
                    "idNational": "",
                    "birthDate": "2014-06-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 5,
                    "beltLevel": "C10",
                    "classSessions": []
                }
            },
            {
                "personalInfo": {
                    "name": "Phan Mai Chi",
                    "idAccount": "TKD13GS522",
                    "idNational": "",
                    "birthDate": "2017-10-01",
                    "isActive": true
                },
                "academicInfo": {
                    "idBranch": 5,
                    "beltLevel": "C10",
                    "classSessions": []
                }
            }
        ]
    } catch (error) {
        console.error(`Error searching students by name "${query}":`, error);
        throw error;
    }
}