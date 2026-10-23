# MindMap trong công việc — v2.12

## Nội dung cập nhật (23/10/2026)

### Module 2 — IPAM Way
- Dùng trình tự nội dung **Identify → Plan → Action → Mastery** theo lựa chọn của L&D.
- Thay toàn bộ nội dung Module 2 cũ bằng bốn bài đọc hiểu từ bản chép lời `phan1.ipamwayframework.pdf` (8 trang), gồm tổng quan tương tác dưới dạng mindmap và bài đọc theo bốn giai đoạn.
- Loại bỏ các câu hỏi ghép nhánh, các hoạt động kiểm tra đáp án, node chưa nối và các bước hoàn thành case.
- Bài mới gồm: nội dung diễn giải, mindmap các ý chính, các phần đọc hiểu, điểm chốt và điều hướng trước/sau.
- Khi nguồn không cung cấp đầy đủ năm tên của **5A / 5M** mới, không tự điền các thuật ngữ hoặc coi bản chép lời là tài liệu quy định chính thức.

### Module 3 — GitMind
- Trên trang từng bài: **chỉ để lại khối “CÁC BƯỚC THAO TÁC”** ở cột hướng dẫn. Bỏ “Chủ đề thao tác”, “Kết quả cần đạt”, “Gợi ý thực hành”.
- Bấm vào GIF sẽ mở hộp thoại toàn màn hình chỉ có ảnh động và nút đóng; không kèm cột hướng dẫn.
- Giữ nguyên 22 GIF, 22 chương và liên kết GitMind.

### Giữ nguyên
- Module 1: video và 5 câu hỏi tương tác, gồm kéo nối tại câu 2/5.
- Logo, brand palette IPA, video, GIF, cấu trúc GitHub Pages.
- Không bổ sung gamification hoặc tracking.

## Các file cập nhật
- `index.html`
- `css/styles.css`
- `js/app.js`
- `js/content.js`
- `js/learning-maps.js`
- `README.md`
- `docs/CHANGELOG_v2.12.md` (mới)
- `docs/IPAM_WAY_SOURCE_MAPPING_v2.12.md` (mới)

## Kiểm thử
- Chromium với bố cục desktop và mobile: mở lần lượt 4 bài Module 2; không xuất hiện tương tác kiểm tra/kéo thả.
- Trang từng bài GitMind chỉ có danh sách bước bên cạnh GIF, phóng to GIF mở hộp thoại toàn màn hình.
- Kiểm tra cấu trúc JS với `node --check`; không ghi nhận lỗi JS trên các lượt thử.
- Chưa kiểm thử trên website GitHub Pages đã triển khai của người dùng.
