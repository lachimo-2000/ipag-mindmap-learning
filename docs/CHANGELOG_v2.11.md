# Changelog v2.11 — IPAM Way & GIF Focus

## Scope

- Module 1 câu 2/5: nối cặp qua click hoặc **drag pointer**; đường nối SVG vẽ trực tiếp, có highlight target, có tùy chọn nối lại. Hỗ trợ chuột/touch/pen và bàn phím qua click.
- Module 2 thay toàn bộ nội dung cũ bằng **IPAM Way** theo hai PDF do người dùng cung cấp: 4 giai đoạn/4 case, mỗi case 2 vòng kéo-thả, tổng 37 node. Có phần đọc hiểu, tình huống minh họa, thuật ngữ, câu hỏi và mô hình MindMap đã có.
- Module 3: bên trái chỉ GIF + điều hướng + nút GitMind, bỏ phần “Mục tiêu sau bài” / “Lưu ý” và nút “Phóng to GIF” trùng. GIF click để phóng to, cửa sổ toàn màn hình có **chỉ danh sách bước thao tác** bên cạnh.
- Gỡ gamification UI (XP, huy hiệu, dashboard, progress, confetti) và file JS `gamification.js` khỏi bản Full.
- Bỏ mọi nút và status “đánh dấu đã xem”, không lưu completion/progress/view của học viên. Session answers tạm thời không được lưu xuyên reload; xóa các localStorage keys cũ của riêng web app.
- Giữ lại Module 1 video gốc, 22 bài GIF và sơ đồ điều hướng Module 3.

## QA

- JavaScript syntax check (`node --check`) cho các file JS.
- Chromium smoke tests tại viewport 1440px và 390px: hai bước cho cả 4 case (8 hoạt động), nối cặp Q2 bằng click và drag, GIF modal chỉ có các bước thao tác, không lỗi page JS trong lượt thử.
- Đã xác minh trên đĩa tất cả tài nguyên video/GIF trong gói Full; không sửa binary của video module 1 hay GIF.
- Chưa test thực tế trên GitHub Pages/LMS. Nếu GitHub Browser upload full và video MP4 lớn hơn 25 MB, dùng bản Update Only hoặc Git client.

## Notes

- Bản Update Only **không bao gồm video/GIF, file không thay đổi**.
- Nếu bản cũ trong GitHub còn `js/gamification.js`, xóa thủ công nếu muốn dọn sạch. `index.html` mới không nạp file đó nên nó không chạy.
- Không có SCORM tracking/SCORM manifest trong gói này.
