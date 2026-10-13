# MindMap Learning Web App — v2.8 Update Only

Ngày cập nhật: 13/10/2026

## Thay đổi

- **Trang chủ — sơ đồ 3 module:** bố trí chủ đề trung tâm về trái, cả 3 nhánh module ở phải; nối cùng cấp bằng một màu Gold IPA `#C4AA78`, cấp mô tả bằng IPA Blue `#59798F`. Tăng kích thước hiển thị khi fit canvas.
- **Không phát lại toàn bộ animation khi mở nhánh:** mở/thu nội dung chỉ tạo/hủy phần mô tả và nhánh nối cấp hai; giữ nguyên các node cấp một và trạng thái zoom/pan.
- **Hover và focus:** các thẻ nhánh nền trắng chuyển sang màu Gold IPA với chữ trắng và bóng chữ để dễ nhìn; biểu tượng điều khiển tương phản.
- **Module 2 · Trang tổng quan:** bố trí 5 case đều ở phía phải, central node ở trái, với đường nối cùng màu cho nhánh cấp một. Không hiển thị số `2.0` trước mục `Tổng quan Module 2` trong menu; các case vẫn đánh số `2.1`–`2.5`.
- **Màn hình mở đầu:** luôn có nút **Bỏ qua** để vào thẳng trang chủ. Tiêu đề được hiển thị với typing, ba dòng thông điệp xuất hiện lần lượt bằng fade-up và không còn chữ đậm riêng ở dòng đầu.
- **Luồng mở đầu 2 bước:** nút đầu tiên đổi thành **Khám phá nội dung tổng quan**; tiêu đề MindMap hiện tại thu nhỏ và di chuyển (morph) thành central node, sau đó ba nhánh nội dung xuất hiện lần lượt. Cuối cùng mới xuất hiện **Bắt đầu ngay** để vào trang chủ có menu.
- Thêm bố cục màn hình nhỏ và tôn trọng tùy chọn giảm chuyển động (`prefers-reduced-motion`).

## Các file có thay đổi

- `js/app.js`
- `js/learning-maps.js`
- `css/styles.css`
- `docs/CHANGELOG_v2.8.md` (file mới)

**Không thay đổi:** video Full HD Module 1, GIF, nội dung 22 chương GitMind, các file hình ảnh, `js/content.js`, `js/gitmind-overview.js`, `js/quiz-module1.js`, `index.html`.

## Cập nhật GitHub

Giải nén ZIP; upload **các file và thư mục bên trong ZIP** vào thư mục gốc của repo đang chạy v2.7, đúng các đường dẫn như trên; commit rồi kiểm tra GitHub Actions/Pages. Không upload thêm thư mục bao ngoài ZIP.

## Đã kiểm thử

- Chromium 1440×900 và 390×844: intro → explore → home, Bỏ qua, mindmap 3 module và 5 case, mở/thu chi tiết, điều hướng vào Case 1.
- Cả 5 case của Module 2 (bao gồm 2 bước case tìm nguyên nhân); Module 1, Module 3 smoke tests.
- Gold hover, đường nhánh cùng cấp đồng màu, DOM root không bị thay thế khi mở chi tiết, viewport transform giữ nguyên.

Chưa kiểm thử URL GitHub Pages sau khi người dùng tự deploy.
