# IPA Group · MindMap trong công việc — v2.10

Web app đào tạo tĩnh HTML/CSS/JavaScript. Dự án gồm ba học phần, sử dụng màu sắc theo brand IPA Group.

## Học phần

1. **Module 1 — Vì sao & Khi nào:** video bài học và 5 câu hỏi tương tác.
2. **Module 2 — Thực hành MindMap:** 4 case liên tiếp: 2.1 Ghi chú cuộc họp, 2.2 Tìm nguyên nhân (2 bước), 2.3 Bắt đầu dự án, 2.4 Cùng ra quyết định. Người học kéo/chọn thẻ trong **khay node ngay bên cạnh sơ đồ**, kết nối vào nhánh, nhấn Kiểm tra và nhận phản hồi đúng/sai trực tiếp trên node.
3. **Module 3 — Học GitMind:** tổng quan dạng mindmap, 22 bài kèm hình động. Truy cập `https://gitmind.com/` để thực hành trên công cụ thật.

## Tính năng v2.10

- Nút **Ẩn/Hiện menu** trên desktop; menu dạng drawer trên mobile.
- Điều hướng các sơ đồ bằng pan/zoom; node kéo thả bằng Pointer Events (chuột, touch, bút); kéo đến sát mép canvas để di chuyển sơ đồ trong lúc giữ node. Trên điện thoại dùng khay node ngang phía dưới canvas hoặc chọn node rồi bấm nhánh.
- XP, huy hiệu hoàn thành ba học phần, bảng thành tích ngắn và nút bài tiếp theo. Huy hiệu có hiệu ứng bay về thanh tiến trình.
- Kết thúc toàn hành trình: màn hình chúc mừng fullscreen và một lượt confetti Canvas 2D nhẹ, không phụ thuộc CDN/GIF.
- Tiến độ và số liệu trải nghiệm được lưu **chỉ trên trình duyệt thiết bị** qua `localStorage`; không phải điểm LMS chính thức, không đồng bộ tài khoản và không nhận dạng người học. Thời gian học là **ước tính hoạt động của tab**, không phải giờ đào tạo được xác nhận.

## Deploy GitHub Pages từ repository hiện tại

1. Tải và giải nén bản **Update Only v2.10**.
2. Trong GitHub repository, ở branch Pages đang dùng (`main` nếu đúng cấu hình), kéo **nội dung bên trong** thư mục giải nén vào đúng root. **Không đưa cả thư mục ZIP thành một thư mục con mới.**
3. Kiểm tra vị trí `index.html`, `css/styles.css`, `js/app.js`, `js/content.js`, `js/learning-maps.js`, `js/gamification.js` và `docs/CHANGELOG_v2.10.md`.
4. Commit, đợi GitHub Actions deploy thành công. Tải lại trang bằng Ctrl+F5 nếu trình duyệt còn lưu cache.
5. Giữ nguyên thư mục `assets/`: video `assets/videos/module-1/module-01.mp4` và 22 ảnh động GitMind không thay đổi.

## Mã nguồn chính

- `index.html`: cấu trúc trang, tải CSS/JS, nút sidebar và thanh tiến trình.
- `css/styles.css`: giao diện responsive, màu/hiệu ứng và định dạng node.
- `js/content.js`: nội dung 4 case Module 2.
- `js/app.js`: điều hướng trang, trạng thái và tiến trình học.
- `js/learning-maps.js`: sơ đồ tổng quan, canvas kéo thả, pan/zoom.
- `js/gamification.js`: XP, dashboard, badge và pháo giấy canvas.
- `js/quiz-module1.js`: 5 dạng câu hỏi Module 1.
- `js/gitmind-chapters.js` / `js/gitmind-overview.js`: 22 bài GitMind và mindmap mục lục.
- `docs/`: changelog và tài liệu nguồn.

## Giới hạn / lưu ý vận hành

- Website tĩnh không có backend, tài khoản học tập hay tích hợp LMS; người học đổi thiết bị hoặc xóa browser storage có thể mất tiến độ.
- Module 3 dùng GIF hướng dẫn và thao tác trên GitMind thực tế, **không phải một simulator GitMind hoàn chỉnh**.
- Font Montserrat/Inter là lựa chọn web an toàn cho tiếng Việt, không thay cho các file webfont thương hiệu có bản quyền.
- GIF/video trích từ nguồn bên ngoài cần được rà soát quyền sử dụng trước khi triển khai công khai.
