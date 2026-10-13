# Changelog v2.3 — GitMind learning content

- Đối chiếu tài liệu `How to use GitMind?` chính thức.
- Việt hóa nội dung bài 3.1–3.6 thành mục tiêu, ngữ cảnh, ba bước, phím tắt, kết quả, lưu ý và liên kết nguồn.
- Giữ nguyên các hoạt động tương tác TRY/CHECK v2.2, luồng điều hướng, quiz Module 1 và năm tình huống Module 2.
- Bổ sung accordion tài liệu gợi nhớ trong TRY.
- Điều chỉnh placeholder video chưa có để dành không gian ưu tiên hướng dẫn chữ; không sửa các đường dẫn video hiện có.
- Tách content ra `LEARNING_CONTENT.gitmindGuide` để L&D tự sửa nội dung mà không can thiệp logic.
- Tài liệu nguồn/giới hạn: `docs/MODULE3_GITMIND_CONTENT_VI.md`.

## QA
- `node --check`: pass cho `app.js` và `content.js`.
- Chromium qua nạp HTML/CSS/JS trực tiếp (local file navigation bị môi trường hạn chế): đã kiểm tra cả 6 bài, WATCH và TRY, mở liên kết nguồn; kiểm tra 1440px/390px, không lỗi JS và không tràn ngang.
- Chưa thực hiện kiểm thử thực tế GitHub Pages, video MP4 trên máy người học hoặc đối chiếu giao diện GitMind live.
