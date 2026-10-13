# IPA Group MindMap Web App — v2.7 (Update Only)

## Nội dung chỉnh sửa

1. **Mở đầu toàn màn hình:** Ẩn sidebar, topbar và hành trình khi người học vừa truy cập. Nội dung được trình bày lần lượt bằng hiệu ứng typing text, cuối cùng xuất hiện nút **Sẵn sàng bắt đầu hành trình**. Khi bấm, tiêu đề chuyển dần về dạng chủ đề trung tâm và đến trang mindmap giới thiệu 3 module với các nhánh xuất hiện lần lượt.
2. **Trang chủ sau mở đầu:** Xóa chữ **TRẢI NGHIỆM HỌC TẬP** trên sidebar và bỏ nút **Thực hành 5 case** ở màn hình trang chủ cũ. Thay các thẻ module bằng mindmap 3 nhánh. Có thể cuộn để phóng to/thu nhỏ, kéo canvas, mở/thu nhánh và mở module từ node.
3. **Module 2 / 2.0 Tổng quan:** Biến danh sách case thành mindmap 5 nhánh, mỗi nhánh mở được phần giới thiệu và liên kết đến case.
4. **Module 2 / 2.1–2.5:** Thay màn hình chia đôi bằng **một canvas mindmap duy nhất** gồm central topic, nhánh nhận và node tự do. Hỗ trợ drag/drop, click node rồi click nhánh, đổi nhánh, kéo về vùng chưa kết nối, zoom/pan, kiểm tra, phản hồi cụ thể sau khi kiểm tra, làm lại. Nút qua bước/hoàn thành chỉ xuất hiện khi đã kiểm tra và đáp án đạt yêu cầu.
5. **Case 2:** Giữ bước phân biệt dữ kiện/giả thuyết và bước phân loại bằng chứng cần/không cần; cả hai đều trực quan bằng node trong mindmap.
6. **Case 3–4:** Nhánh sâu *Truyền thông* và *Chi tiết để tra cứu* được nối từ nhánh cha của chúng trong mindmap, không phải nối thẳng chủ đề trung tâm.
7. **Nhận diện IPA Group:** Các nhóm/node được tạo màu theo bộ màu #59798F, #C4AA78, #3E5B6C, #9F8668, #D0BB93, #DCCCAE, #E7DDC9. Giữ font số hóa có hỗ trợ dấu tiếng Việt từ bản trước.
8. **Module 1 / 1.1:** Gỡ dòng chú thích thông số kỹ thuật dưới video theo yêu cầu điều chỉnh gần nhất; không đổi MP4.
9. **Module 3:** Không thay đổi các bài hướng dẫn, ảnh động hay sơ đồ GitMind v2.6.

## File có thay đổi và cần upload vào root repository

- `index.html` — xóa nhãn sidebar cũ, tải thêm `js/learning-maps.js`.
- `css/styles.css` — hiệu ứng intro, home/case mindmap và responsive.
- `js/app.js` — điều hướng intro → home, overview module 2, tương tác case.
- `js/learning-maps.js` — **file mới**, renderer mindmap overview/case, pan, zoom, drag-drop, typing text.
- `docs/CHANGELOG_v2.7.md` — nhật ký cập nhật này.

**Không upload lại:** MP4, các GIF GitMind, logo, hình ảnh, `js/gitmind-overview.js`, `js/content.js`, `js/gitmind-chapters.js`, `js/quiz-module1.js`.

## Cách cập nhật GitHub Pages

**Chỉ giải nén và upload các file/thư mục _bên trong_ ZIP vào thư mục gốc repository.**

Đúng: `/index.html`, `/css/styles.css`, `/js/app.js`, `/js/learning-maps.js`.

Sai: `/IPA_Mindmap_WebApp_v2.7_UpdateOnly/index.html` hoặc `/IPA_Mindmap_Learning_WebApp/index.html`.

Commit changes; kiểm tra Actions / Pages; sau đó Ctrl+F5 trên website. Nếu vẫn hiện giao diện cũ, xác minh Github Pages publish branch `main`, path `/(root)` và bản gốc đã thực sự bị ghi đè.

## QA thực hiện

- Chromium: desktop 1440px/1600px; mobile 390px.
- Intro typing → nút CTA → trang chủ và menu.
- Mindmap 3 module; mindmap 5 case; điều hướng vào bài.
- Tất cả 5 case và 6 bước (Case 2 có 2 bước); thao tác chọn-click, drag/drop thực, phản hồi sai và sửa đáp án; chỉ cho tiếp tục sau CHECK.
- Module 3: sơ đồ 6 nhóm v2.6 vẫn hiển thị.
- Không ghi nhận JS uncaught errors trong các lượt thử.

Lưu ý: Đây là kiểm thử nạp mã vào browser trong môi trường chạy thử, **không phải** kiểm chứng bản GitHub Pages đã deploy trên tài khoản người dùng.
