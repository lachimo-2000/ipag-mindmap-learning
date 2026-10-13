# v2.10 — Learning UX, 4 case, XP & Completion Journey

## Thay đổi

- **Module 2:** loại bỏ hoàn toàn case “Giải thích toàn cảnh”; 4 case còn lại được đánh lại từ 2.1–2.4. Sửa tổng quan, nhánh sơ đồ, chữ mô tả, nội dung Intro, kết quả tổng kết và progress.
- **Canvas tương tác:** chuyển các node chưa kết nối từ hàng xa bên dưới sơ đồ thành một khay card ngay **bên phải bên trong cùng cửa sổ mindmap** trên desktop; mobile thành khay ngang ở dưới canvas. Không cần phải zoom còn 30% để tìm thẻ. Node được chuyển DOM giữa khay và sơ đồ mà không re-render cả trang.
- **Pointer drag:** kéo thả dùng Pointer Events cho mouse/touch/pen; pan tự động khi giữ node gần mép viewport; vẫn hỗ trợ chọn node rồi click nhánh. Giữ zoom/pan khi thao tác và phản hồi.
- **Sidebar:** nút mở/thu sidebar trên desktop; giữ hành vi drawer trên mobile. Sidebar không hiển thị tại Intro/finale.
- **Gamification:** XP một lần trên mốc quiz/case/chapter; 3 huy hiệu hoàn thành +50 XP/học phần, hiệu ứng stamp 3D tilt rồi bay vào thanh progress.
- **Micro-dashboard:** tại trang chủ hiển thị XP đếm tăng, thời gian học ước tính và tỉ lệ đúng dựa trên các lượt kiểm tra trong Module 2; CTA bài tiếp theo.
- **Module 3 kết thúc:** sau bài 3.22, nếu đã hoàn thành cả 3 học phần, hiển thị màn chúc mừng fullscreen, một lượt confetti Canvas 2D không dùng CDN hoặc GIF, nút Quay về bài học.
- **CTA:** thêm hiệu ứng glow nhẹ cho nút bài tiếp theo ở Module 2, Module 3 và Dashboard.
- **Documentation:** cập nhật README về phiên bản, 4 case, chức năng và giới hạn dữ liệu.

## File đã cập nhật

- `index.html`
- `css/styles.css`
- `js/app.js`
- `js/content.js`
- `js/learning-maps.js`
- `js/gamification.js` *(file mới)*
- `README.md`
- `docs/CHANGELOG_v2.10.md` *(file mới)*

## Nguyên tắc tiến độ / XP

- Hoàn thành Module 1: đã nộp 5 câu hỏi (không mặc định đồng nghĩa trả lời đúng hết).
- Hoàn thành Module 2: đã xếp đúng, kiểm tra và kết thúc cả 4 case; Case 2 có 2 bước.
- Hoàn thành Module 3: đã truy cập đủ 22 bài hướng dẫn. Đây là tiêu chí theo dõi đã xem, **không đo được việc thực hành thật trong GitMind**.
- XP chỉ nhận lần đầu theo mỗi mốc: 10 XP/câu Module 1, 25 XP/case Module 2, 4 XP/bài Module 3, 50 XP/huy hiệu học phần.
- Độ chính xác Module 2 được tính trên những lượt *Kiểm tra đáp án* đã thực hiện; nếu sửa rồi kiểm tra lại sẽ được tính như lượt kiểm tra bổ sung. Dữ liệu chỉ nằm ở localStorage của trình duyệt.
- Thời gian học được ước tính từ tab đang hiển thị, chỉ tính trong 2 phút sau tương tác gần nhất, được cộng mỗi 15 giây.

## Kiểm tra

- Kiểm tra cú pháp JavaScript với Node.js cho toàn bộ file thay đổi.
- Kiểm thử Chromium desktop (1440×900) và mobile (390×844): hiển thị khay thẻ và sơ đồ; click-thẻ/chọn nhánh; kéo node bằng chuột và phản hồi đúng/sai.
- Kiểm thử xuyên suốt 5 câu Quiz Module 1 → cả 4 case Module 2 (5 bước) → 22 bài Module 3 → màn chúc mừng; không ghi nhận lỗi JavaScript.
- Chưa kiểm thử build/deploy trên URL GitHub Pages thực tế của người dùng; cần xác nhận trên site sau khi commit.
