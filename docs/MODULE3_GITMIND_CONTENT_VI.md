# Bộ nội dung học Module 3 — Việt hóa từ hướng dẫn GitMind

**Phiên bản:** v2.3 · 12/10/2026

**Nguồn tham chiếu:** [GitMind — How to use GitMind?](https://gitmind.com/faq/how-to-use-gitmind.html)

Đây là **bản biên soạn lại phục vụ đào tạo nội bộ**, không phải bản dịch hoặc sao chép toàn bộ trang nguồn. Giữ tên chức năng GitMind (New, Tab, Enter, Style, Insert, Share, Export) khi cần để học viên tìm đúng UI.

## Nội dung đã tích hợp

| Bài | Phần nguồn gốc | Nội dung đưa lên web app | TRY / CHECK cũ |
|---|---|---|---|
| 3.1 Khởi tạo MindMap | File Management → Create new | Tạo file mới; xác định và đặt tên Central Topic cụ thể cho cuộc họp | Giữ nguyên mô phỏng sửa Central Topic và câu hỏi về độ cụ thể |
| 3.2 Xây dựng cấu trúc | Edit node → Add node; Outline mode | Tab (child), Enter (sibling), Shift+Tab (parent), chọn node và toolbar | Giữ nguyên tạo Main/Sub Branch |
| 3.3 Sắp xếp lại các node | Edit node → Move/Delete node | Kéo thả để đổi nhánh cha, Alt+↑/↓, Delete | Giữ nguyên chuyển Budget approved |
| 3.4 Thể hiện mối quan hệ | Relationship → Add/Edit | Insert tạo quan hệ; Space chỉnh nhãn; điều chỉnh đầu nối | Giữ nguyên quan hệ depends on |
| 3.5 Làm rõ thông tin | Theme / Change layout / Customize style / Insert icon / Insert note | Layout, style, icon, note phục vụ nhận biết nội dung | Giữ nguyên Decision vs Action |
| 3.6 Chia sẻ và xuất bản | Share & Collaborate / Export | Phân biệt quyền xem và sửa, xuất ảnh/PDF | Giữ nguyên simulator Share, chưa có simulator Export |

## Phân biệt thông tin nguồn và hướng dẫn nội bộ

- **3.1 — Rename:** Nguồn mô tả *Rename file*, không mô tả cụ thể cách thao tác đổi chữ trên *Central Topic*. Nội dung về cách đặt tên theo mục đích là ứng dụng L&D từ Module 2; không được trích như bước thao tác GitMind đã được nguồn xác thực.
- **3.3 — Collapse/Expand:** Trang nguồn trong phạm vi đọc có Move/Delete node, không đưa ra thao tác thu gọn/mở rộng chi tiết. Tính năng chưa được bổ sung hướng dẫn chính thức trong v2.3.
- **3.4 — Relationship:** Đường kết nối không chứng minh quan hệ nhân quả/phụ thuộc; đó là thông tin do người tạo biểu đạt và cần hợp lý.
- **3.5 — Style:** Hướng dẫn công cụ có nhiều tùy chọn trang trí, nhưng bài học ưu tiên tiêu chí nhận diện thông tin, không yêu cầu quá nhiều màu.
- **3.6 — Share:** Tài liệu nói rõ người có link có thể xem hoặc sửa. Chỉ cấp quyền phù hợp; môi trường nội bộ cần tuân thủ chính sách bảo mật. Simulator hiện chưa triển khai Export thực tế.
- **Tính năng ngoài phạm vi:** GitMind AI, Planet, Watermark, formulas, split screen, comments, migration, advanced file management… được chủ động không đưa vào 6 bài nền tảng.

## Kiến trúc cập nhật

- Nội dung trong `js/content.js`, đối tượng `LEARNING_CONTENT.gitmindGuide.lessons['01'..'06']`.
- UI dựng tự động bởi `gitmindGuidePanel` trong `js/app.js`.
- CSS bổ sung ở cuối `css/styles.css`, dùng lại palette IPA Group.
- Trong **WATCH**, học viên xem video nếu đã có, đồng thời có tài liệu 3 bước tiếng Việt. Khi chưa có video, hướng dẫn chữ vẫn đủ để học tiếp.
- Trong **TRY**, có mục thu gọn **“Xem lại cách thao tác và phím tắt”**; không làm lại toàn bộ hướng dẫn.
- **CHECK** và các simulator hiện tại được giữ nguyên, không làm mất tiến độ v2.2.
- Source video tiếp tục thay độc lập qua `assets/videos/module-3/micro-01.mp4` … `micro-06.mp4`.

## Chưa triển khai

Không có video mới hoặc giọng đọc được tạo trong lần cập nhật này. Nguồn web là tài liệu thao tác, không phải nguồn footage. Bài 3.6 chưa có TRY mô phỏng xuất PDF; để hoàn thiện toàn diện sẽ cần bổ sung ở phiên bản sau.

## QA tối thiểu khi deploy

1. Mở sáu bài Module 3, xem hướng dẫn 3 bước từng bài.
2. Click liên kết tham chiếu và xác nhận mở nguồn GitMind.
3. Chuyển WATCH → TRY và mở accordion xem lại hướng dẫn.
4. Thực hành và kiểm tra Check của mỗi bài.
5. Thay MP4 có cùng tên, kiểm tra playback qua HTTP(S).
6. Kiểm tra text không tràn trên desktop/mobile.
