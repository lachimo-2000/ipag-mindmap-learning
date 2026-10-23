# MindMap trong công việc — IPA Group (v2.11)

Web app tĩnh (HTML/CSS/JavaScript) với ba module, dùng để chia sẻ qua GitHub Pages hoặc phát triển tiếp để đóng gói LMS.

## Hành trình học

1. **Module 1 — Vì sao & Khi nào:** video MindMap, 5 câu hỏi tương tác. **Câu 2/5** cho phép kéo để nối (mouse/touch/stylus) hoặc bấm lần lượt hai cột để ghép, vẽ đường nối ngay khi chọn.
2. **Module 2 — IPAM Way:** học 4 giai đoạn `Identify → Plan → Accountability → Management` qua mindmap tổng quan, phần đọc hiểu mở rộng và 8 hoạt động phân loại node trên canvas. Các mô hình đi kèm: 5I/TAC, 5P/OTOOB, 5A/RACI, 5M và kết quả quản trị.
3. **Module 3 — GitMind:** 22 bài hướng dẫn bằng GIF, bước thao tác và liên kết mở GitMind. Click GIF để mở cửa sổ lớn gồm **ảnh động + duy nhất các bước thao tác**.

## Không tracking

Phiên bản này **không có gamification, XP, huy hiệu, bảng thành tích, nút đánh dấu đã xem hoặc cơ chế lưu completion**. Đáp án Module 1 và trạng thái phân loại đang thao tác Module 2 chỉ tồn tại trong bộ nhớ phiên đang mở, để hoạt động tương tác, và sẽ mất khi tải lại trang. Mã mới không lưu kết quả học vào `localStorage`; những khóa cũ của chính web app được xóa khi mở trang.

**Lưu ý:** Đây là website tĩnh; chưa có SCORM API hoặc LMS tracking. Nếu đóng gói SCORM sau này, cần thống nhất trước nguyên tắc đánh giá và tracking (hiện yêu cầu là không theo dõi completion).

## Cấu trúc file

- `index.html`: khung web app, điều hướng và cửa sổ xem GIF.
- `css/styles.css`: màu IPA Group, UI/UX, responsive, animation.
- `js/app.js`: điều hướng, Module 2, bài GitMind và trạng thái tạm thời.
- `js/quiz-module1.js`: 5 câu hỏi, drag-to-connect ở Câu 2/5.
- `js/content.js`: **nội dung IPAM Way** 4 giai đoạn, bài đọc và dữ liệu 37 node kéo-thả.
- `js/learning-maps.js`: vẽ mindmap, zoom/pan, kéo thả node và kiểm tra.
- `js/gitmind-chapters.js`: danh mục 22 bài GitMind.
- `js/gitmind-overview.js`: mindmap tổng quan GitMind.
- `assets/`: ảnh, logo, video bài 1.1 và các GIF.
- `docs/`: tài liệu nguồn / changelog.

**Đã bỏ sử dụng `js/gamification.js`**. File này không được nạp vào HTML và không có trong full ZIP v2.11.

## Nguồn Module 2

- `IPAM Work` (PDF, 1 trang) — sơ đồ khái quát.
- `TÀI LIỆU HƯỚNG DẪN IPAM WAY FRAMEWORK – MÔ HÌNH TƯ DUY QUẢN TRỊ MỤC TIÊU v1.1` (PDF, 6 trang) — nguồn cấu trúc chính.
- Mapping: `docs/IPAM_WAY_SOURCE_MAPPING_v2.11.md`.

Các tình huống ứng dụng trong thẻ là ví dụ học tập do nhóm xây dựng để giúp người học sử dụng mô hình; không phải dữ liệu vận hành thật hoặc chính sách được phê duyệt.

## Đăng lên GitHub Pages

Bộ full ZIP v2.11 đặt **`index.html` ngay trong thư mục gốc của ZIP**. Giải nén và kéo các file/thư mục *bên trong* vào root repository nếu GitHub Pages publish từ `/ (root)`. Không upload thư mục cha hoặc nguyên file ZIP.

Bản **Update Only** chỉ có các file thay đổi; giải nén ở thư mục root repo để ghi đè đúng đường dẫn, sau đó commit và kiểm tra Actions/Pages. File `js/gamification.js` cũ có thể xóa thủ công cho sạch repository (không xóa cũng không được chạy vì `index.html` không tham chiếu).

Nếu video lớn hơn giới hạn upload qua GitHub website, hãy giữ video đã có sẵn trong repo và dùng bản Update Only, hoặc sử dụng Git để upload bộ full. Các file GIF/video cần hiện diện đúng đường dẫn.
