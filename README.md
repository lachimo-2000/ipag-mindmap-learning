# MindMap trong công việc — IPA Group (v2.12)

Web app tĩnh (HTML/CSS/JavaScript) với ba module, dùng để chia sẻ qua GitHub Pages hoặc phát triển tiếp để đóng gói LMS.

## Hành trình học

1. **Module 1 — Vì sao & Khi nào:** video MindMap, 5 câu hỏi tương tác. **Câu 2/5** cho phép kéo để nối (mouse/touch/stylus) hoặc bấm lần lượt hai cột để ghép, vẽ đường nối ngay khi chọn.
2. **Module 2 — IPAM Way:** học 4 giai đoạn `Identify → Plan → Action → Mastery` qua mindmap tổng quan và bốn bài đọc hiểu theo bản chia sẻ mới nhất. Không có phần kéo-thả, bài tập hay chấm đáp án trong Module 2; các khái niệm 5A/5M không được tự mở rộng khi bản chép lời thiếu danh sách đầy đủ.
3. **Module 3 — GitMind:** 22 bài hướng dẫn bằng GIF, bước thao tác và liên kết mở GitMind. Click GIF để mở **ảnh động toàn màn hình**, không có bảng hướng dẫn bên cạnh trong chế độ xem lớn.

## Không tracking

Phiên bản này **không có gamification, XP, huy hiệu, bảng thành tích, nút đánh dấu đã xem hoặc cơ chế lưu completion**. Đáp án Module 1 chỉ tồn tại trong bộ nhớ phiên đang mở và sẽ mất khi tải lại trang. Module 2 không có bài tập hay dữ liệu hoàn thành. Mã mới không lưu kết quả học vào `localStorage`; những khóa cũ của chính web app được xóa khi mở trang.

**Lưu ý:** Đây là website tĩnh; chưa có SCORM API hoặc LMS tracking. Nếu đóng gói SCORM sau này, cần thống nhất trước nguyên tắc đánh giá và tracking (hiện yêu cầu là không theo dõi completion).

## Cấu trúc file

- `index.html`: khung web app, điều hướng và cửa sổ xem GIF.
- `css/styles.css`: màu IPA Group, UI/UX, responsive, animation.
- `js/app.js`: điều hướng, Module 2, bài GitMind và trạng thái tạm thời.
- `js/quiz-module1.js`: 5 câu hỏi, drag-to-connect ở Câu 2/5.
- `js/content.js`: **nội dung IPAM Way** 4 giai đoạn và bài đọc theo bản chép lời mới nhất.
- `js/learning-maps.js`: mindmap tổng quan, zoom/pan, hiệu ứng intro; không còn bài kéo-thả Module 2.
- `js/gitmind-chapters.js`: danh mục 22 bài GitMind.
- `js/gitmind-overview.js`: mindmap tổng quan GitMind.
- `assets/`: ảnh, logo, video bài 1.1 và các GIF.
- `docs/`: tài liệu nguồn / changelog.

**Đã bỏ sử dụng `js/gamification.js`**. File này không được nạp vào HTML và không có trong full ZIP v2.11.

## Nguồn Module 2 (v2.12)

- `phan1.ipamwayframework.pdf` — bản chép lời IPAM Way gần nhất do người dùng cung cấp (8 trang, TurboScribe).
- Tên bốn giai đoạn được người dùng chốt: **Identify → Plan → Action → Mastery**.
- Nội dung được diễn đạt lại từ những luận điểm thực sự có trong bản chép lời. Bản ghi không liệt kê trọn bộ năm tên của 5A/5M phiên bản mới; web app không tự bổ sung.
- Mapping/những điểm chưa đủ căn cứ: `docs/IPAM_WAY_SOURCE_MAPPING_v2.12.md`.

Module 2 chỉ có nội dung học để đọc và xem MindMap, **không có phân loại node, bài tập, chấm điểm hoặc completion**.

## Đăng lên GitHub Pages

Bộ full ZIP v2.11 (nguồn nền) đặt **`index.html` ngay trong thư mục gốc của ZIP**. Giải nén và kéo các file/thư mục *bên trong* vào root repository nếu GitHub Pages publish từ `/ (root)`. Không upload thư mục cha hoặc nguyên file ZIP.

Bản **Update Only** chỉ có các file thay đổi; giải nén ở thư mục root repo để ghi đè đúng đường dẫn, sau đó commit và kiểm tra Actions/Pages. File `js/gamification.js` cũ có thể xóa thủ công cho sạch repository (không xóa cũng không được chạy vì `index.html` không tham chiếu).

Nếu video lớn hơn giới hạn upload qua GitHub website, hãy giữ video đã có sẵn trong repo và dùng bản Update Only, hoặc sử dụng Git để upload bộ full. Các file GIF/video cần hiện diện đúng đường dẫn.
