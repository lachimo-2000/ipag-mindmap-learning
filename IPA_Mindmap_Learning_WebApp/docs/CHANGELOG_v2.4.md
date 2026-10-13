# v2.4 — Module 3: 22 chương GitMind có hình/GIF

Ngày: 12/10/2026

## Phạm vi nâng cấp

- **Không thay đổi** nội dung/logic Module 1 và Module 2, logo, Brand IPA Group, hay video Module 1.
- Cập nhật Module 3 với **22 chương hướng dẫn**, đánh số học tập **3.1–3.22**. Số chương GitMind gốc cũng được hiển thị để tiện kiểm chứng.
- Nguồn biên soạn: bộ `GitMind_Module3_27_Chapters_Learning_SourcePack_VI.zip` đã tạo trong phiên trước; nội dung trong app được biên soạn lại bằng tiếng Việt, không phải sao chép nguyên văn.
- Bỏ **mục 01, 12, 13, 20, 27 theo thứ tự mục trong bộ 27 phần**, tương ứng:
  1. Giới thiệu GitMind
  2. Chèn biểu tượng
  3. Chèn sticker
  4. Sao chép định dạng
  5. Chuyển dữ liệu giữa tài khoản
- 22 chapter còn lại đều có minh họa tải từ **file người dùng đính kèm** `Gif file.zip`: **21 GIF động + 1 WEBP tĩnh**. Các asset nằm trong `assets/gitmind-chapters/`.
- Mỗi chapter có Mục đích, 3 bước thao tác tóm lược, lưu ý, bài tập gắn với công việc và trình tự **Xem hướng dẫn → Thử áp dụng → Nhận phản hồi**.
- Các câu thử áp dụng biên soạn mới và vị trí câu trả lời đúng được phân bổ khác nhau.
- **Giữ nguyên sáu simulator 3.1–3.6 trước đây** dưới nhãn **Luyện thao tác** (LT1–LT6), vẫn có WATCH → TRY → CHECK và cơ chế import MP4 qua `assets/videos/module-3/`.
- Nhóm menu Module 3 có danh sách bài theo nhóm nhỏ có thể bật/tắt; breadcrumb, Back/Home và trạng thái học hoạt động như trước.

## Các tệp mới/sửa

**Mới:**

- `js/gitmind-chapters.js` — dữ liệu 22 chương, hướng dẫn và bài kiểm tra.
- `assets/gitmind-chapters/` — 22 hình/GIF và README cập nhật.
- `docs/MODULE3_22_CHAPTERS_MAPPING.json` — mapping, minh họa và nội dung để truy vết.
- `docs/SOURCE_PACK_README.md` — nguồn học liệu và phạm vi.

**Đã sửa:**

- `index.html` — nạp dữ liệu hướng dẫn.
- `js/app.js` — 22 bài, điều hướng, WATCH–TRY–CHECK, lưu tiến độ.
- `css/styles.css` — UI cho trang học liệu và GIF responsive.
- `README.md` — hướng dẫn nâng cấp.

## GitHub Pages và cập nhật

- Giải nén gói ZIP và upload **nội dung bên trong** `IPA_Mindmap_Learning_WebApp` vào root repository. **Không** upload thêm một lớp thư mục lồng nhau nếu repo hiện đặt `index.html` ở root.
- Có thể dùng `v2.4_Module3_UpdateOnly.zip` nếu Module 1 đã tồn tại trên GitHub: chỉ upload những tệp được cập nhật và các GIF mới; **không upload lại video 59 MB**.
- Muốn thay GIF: ghi đè đúng tên trong `assets/gitmind-chapters/`; không cần sửa HTML/JS. Nếu muốn thay nội dung chữ/quiz, chỉnh dữ liệu trong `js/gitmind-chapters.js`.
- Các video micro cũ vẫn được nạp từ `assets/videos/module-3/micro-01.mp4` ... `micro-06.mp4` nếu được cung cấp.
- GitHub Pages thường truy cập công khai; cần cân nhắc cấp quyền tái sử dụng GIF của GitMind trước khi xuất bản rộng rãi.

## QA

- Browser Chromium: hoàn thành thử luồng nội dung và CHECK cho **22/22 chapter** với lựa chọn đúng; thử trang chủ, Module 1 quiz, Module 2 Meeting và bài mô phỏng LT6: **không có page errors**.
- Desktop 1440px và mobile 390px: thử WATCH → TRY → CHECK bài đầu và cuối, breadcrumb, Back, menu. Không thấy tràn ngang ở trang được kiểm tra.
- 22/22 media tồn tại. File GIF được kiểm tra hợp lệ và có nhiều frame.
- **Giới hạn QA:** trình duyệt kiểm thử nội dung bằng DOM injected do môi trường thử nghiệm chặn localhost, chưa mở website GitHub Pages thật. Cần kiểm thử đường dẫn file và GIF thực tế sau khi deploy.
