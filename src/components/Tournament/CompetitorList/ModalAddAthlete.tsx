import React, { useState } from "react";
import { Modal, Input, List, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type PropType = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

// Đây là dữ liệu mẫu có gì anh bỏ đi xong gọi api qua đấy nhé
const allAthlete = [
  { id: 1, name: "Nguyễn Văn An", class: "10A1" },
  { id: 2, name: "Trần Thị Bình", class: "10A2" },
  { id: 3, name: "Lê Văn Cường", class: "10A1" },
  { id: 4, name: "Phạm Thị Dung", class: "10A3" },
  { id: 5, name: "Hoàng Văn Em", class: "10A2" },
  { id: 6, name: "Vũ Thị Phương", class: "10A1" },
  { id: 7, name: "Đỗ Văn Giang", class: "10A3" },
  { id: 8, name: "Ngô Thị Hà", class: "10A2" },
];

export default function ModalAddAthlete({
  isModalOpen,
  handleOk,
  handleCancel,
}: PropType) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState<typeof allAthlete>([]);
  const [filteredAthlete, setFilteredAthlete] = useState<typeof allAthlete>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      const filtered = allAthlete.filter(
        (athlete) =>
          athlete.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedAthlete.some((s) => s.id === athlete.id)
      );
      setFilteredAthlete(filtered);
    } else {
      setFilteredAthlete([]);
    }
  };

  const handleAddAthlete = (student: (typeof allAthlete)[0]) => {
    setSelectedAthlete([...selectedAthlete, student]);
    setSearchValue("");
    setFilteredAthlete([]);
  };

  const handleRemoveAthlete = (studentId: number) => {
    setSelectedAthlete(selectedAthlete.filter((s) => s.id !== studentId));
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
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ marginBottom: 8 }}
        />

        {filteredAthlete.length > 0 && (
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
                  <strong>{student.name}</strong>
                  <span style={{ marginLeft: 8, color: "#888" }}>
                    ({student.class})
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
                key={athlete.id}
                closable
                onClose={() => handleRemoveAthlete(athlete.id)}
                color="blue"
                style={{ fontSize: 14, padding: "4px 8px" }}
              >
                {athlete.name} ({athlete.class})
              </Tag>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
