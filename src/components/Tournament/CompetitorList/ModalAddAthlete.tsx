import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, List, Tag, Spin } from "antd";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

import type { Student } from '@/types/training/StudentType';

import { searchStudents } from '@/api/training/StudentAPI';

type PropType = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

// Search chỉ tra tên 'Chi' hoặc tương tự em nhé, không cần gõ full tên

export default function ModalAddAthlete({
  isModalOpen,
  handleOk,
  handleCancel,
}: PropType) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState<Student[]>([]);
  const [filteredAthlete, setFilteredAthlete] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 1. Nếu không có giá trị search thì reset luôn
    if (!searchValue) {
      setFilteredAthlete([]);
      setLoading(false);
      return;
    }

    // 2. Thiết lập bộ đếm giờ (Debounce)
    const timerId = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const newController = new AbortController();
      abortControllerRef.current = newController;
      const { signal } = newController;

      const fetchStudents = async () => {
        setLoading(true);
        try {
          const response = await searchStudents(searchValue, signal);
          // Kiểm tra nếu component chưa bị unmount hoặc signal chưa abort mới set state
          if (!signal.aborted) {
            setFilteredAthlete(response); // response thường đã là data rồi, bỏ bớt await dư
          }
        } catch (error: unknown) {
          // Bỏ qua lỗi nếu nguyên nhân là do ta chủ động huỷ (AbortError)
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('Request cũ đã bị huỷ để ưu tiên request mới');
          } else {
            console.error('Lỗi mạng hoặc server:', error);
          }
        } finally {
          // Chỉ tắt loading nếu request này chưa bị huỷ
          if (!signal.aborted) {
            setLoading(false);
          }
        }
      }

      fetchStudents();
    }, 300); // <--- Đợi 300ms sau khi ngừng gõ mới chạy hàm bên trong

    return () => clearTimeout(timerId); // <--- Clear timeout khi searchValue thay đổi hoặc component unmount
  }, [searchValue]);

  const handleAddAthlete = (student: Student) => {
    setSelectedAthlete([...selectedAthlete, student]);
    setSearchValue("");
    setFilteredAthlete([]);
  };

  const handleRemoveAthlete = (studentId: string) => {
    setSelectedAthlete(selectedAthlete.filter((s) => s.personalInfo.idAccount !== studentId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredAthlete.length > 0) {
      handleAddAthlete(filteredAthlete[0]);
    }
  };

  const handleModalOk = () => {
    console.log("vđv đã chọn:", selectedAthlete);
    handleOk();
    setSelectedAthlete([]);
    setSearchValue("");
    setFilteredAthlete([]);
  };

  const handleModalCancel = () => {
    handleCancel();
    setSelectedAthlete([]);
    setSearchValue("");
    setFilteredAthlete([]);
  };

  return (
    <Modal
      title="Thêm vận động viên"
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      width={600}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm tên vận động viên..."
          prefix={<SearchOutlined />}
          suffix={loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : null}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ marginBottom: 8 }}
        />

        {loading && searchValue && (
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <div style={{ marginTop: 8, color: '#666' }}>Đang tìm kiếm...</div>
          </div>
        )}

        {!loading && filteredAthlete.length > 0 && (
          <List
            bordered
            size="small"
            style={{
              maxHeight: 200,
              overflow: "auto",
              backgroundColor: "#fff",
            }}
            dataSource={filteredAthlete}
            renderItem={(student) => (
              <List.Item
                style={{ cursor: "pointer", padding: "8px 12px" }}
                onClick={() => handleAddAthlete(student)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                }}
              >
                <div>
                  <strong>{student.personalInfo.name}</strong>
                  <span style={{ marginLeft: 8, color: "#888" }}>
                    ({student.academicInfo.idBranch})
                  </span>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      <div>
        <h4 style={{ marginBottom: 12 }}>Danh sách đã chọn:</h4>
        {selectedAthlete.length === 0 ? (
          <p style={{ color: "#999", fontStyle: "italic" }}>
            Chưa có vận động viên nào được chọn
          </p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {selectedAthlete.map((athlete) => (
              <Tag
                key={athlete.personalInfo.idAccount}
                closable
                onClose={() => handleRemoveAthlete(athlete.personalInfo.idAccount)}
                color="blue"
                style={{ fontSize: 14, padding: "4px 8px" }}
              >
                {athlete.personalInfo.name} ({athlete.academicInfo.idBranch})
              </Tag>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
