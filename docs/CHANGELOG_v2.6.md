# CHANGELOG — v2.6 · Module 3 Mindmap Overview + Brand Review

**Baseline:** `IPA_Mindmap_WebApp_v2.5_Updated_Module2_Module3.zip`.

## Thay đổi

1. Bỏ danh sách các thẻ/chapter ở trang tổng quan Module 3. Thay bằng sơ đồ MindMap HTML/SVG gồm 6 nhóm và 22 bài.
2. Nhấp vào nhóm để mở/thu gọn các nhánh con. Nhấp bài để mở trang nội dung tương ứng.
3. Kéo vùng trống để pan, lăn chuột để zoom vào vị trí con trỏ, nút `+ / − / Vừa khung / Mở tất cả / Thu gọn`.
4. Bản mobile có thêm trình chọn nhóm để tránh thu nhỏ sơ đồ đến mức khó đọc.
5. Kiểm tra lại các mã HEX của IPA Group theo file Brand Identity Skill; áp màu chính xác cho mindmap mới.
6. Giữ các thành phần khác từ v2.5: Module 1, Module 2, 22 chương/GIF Module 3 và cấu trúc tài nguyên.
7. Chỉnh nút ngoài trang `Mở trang chủ GitMind` thành CTA rõ tương phản; không chỉnh lại ảnh nền.

## Các file thay đổi

- `index.html` — nạp `js/gitmind-overview.js`.
- `js/app.js` — mount/unmount mindmap vào trang Module 3.
- `js/gitmind-overview.js` — mã tạo sơ đồ tương tác độc lập.
- `css/styles.css` — giao diện, responsive, màu và states.
- `docs/BRAND_PALETTE_AUDIT_v2.6.md` — bảng màu, font và giới hạn đối chiếu.
- `docs/CHANGELOG_v2.6.md`.

## QA

- Desktop 1440px và mobile 390px qua Chromium bằng hình thức nhúng source vào trang kiểm thử (môi trường thử nghiệm chặn truy cập localhost).
- Đã xác minh 6 nhóm, mở 22 bài, zoom, kéo map, điều hướng tới bài 3.1, quay về Module 2; không có exception JavaScript hay tràn ngang ở hai kích thước đã thử.
- Chưa kiểm thử trực tiếp trên URL GitHub Pages sau khi người dùng deploy.
