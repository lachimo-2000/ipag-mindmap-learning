# MindMap as a Skill — IPA Group v2.1

Ứng dụng HTML/CSS/JavaScript tĩnh, tiếp tục từ bản v2.0.

## Mở và triển khai

1. Giải nén ZIP. Mở thư mục `IPA_Mindmap_Learning_WebApp`.
2. Để dùng trên GitHub Pages, đưa **nội dung bên trong** thư mục này vào root repository: `index.html`, `css`, `js`, `assets`, `.nojekyll`, `docs`, `video-setup.html`. Tránh tạo thêm một tầng thư mục ngoài.
3. Giữ cấu trúc thư mục, không đưa tất cả ảnh/video ra root. Code đọc tài nguyên theo đường dẫn tương ứng.
4. Chọn repository → Settings → Pages → branch chứa source → root để triển khai. Nếu video lớn vượt giới hạn upload web, dùng công cụ Git được công ty cho phép hoặc nhờ IT đưa file vào repository.
5. Kiểm tra trên website thực tế theo checklist `docs/CHANGELOG_QA_v2.1.md`.

Bản **HTML Preview** đi kèm là một file độc lập có CSS/JS, logo và ảnh nền nhúng sẵn. Preview ưu tiên thử tương tác; video Module 1 được giữ nguyên trong ZIP, không nhúng vào preview để file nhẹ hơn. Tải xuống rồi mở bằng Edge/Chrome để xem thử. Preview phục vụ xem thử; ZIP là bản để cập nhật source và video lâu dài.

## Thay video mà không sửa code

- Module 1: thay `assets/videos/module-1/module-01.mp4` bằng file mới có cùng tên.
- Module 3: đưa sáu MP4 vào `assets/videos/module-3/` với tên `micro-01.mp4` đến `micro-06.mp4`. Tên file đã gắn với bài 3.1–3.6. Các file `.placeholder.txt` là ghi chú, không phải video.
- Giữ MP4 tương thích trình duyệt, ưu tiên H.264/AAC. Không tự giảm chất lượng nguồn trong lần sửa này.
- Nếu dùng YouTube, mở `video-setup.html`, điền URL, tải `video-library.json` rồi thay `assets/videos/video-library.json`.
- Commit/Push thay đổi và refresh trang. Nếu vẫn thấy bản cũ, dùng Ctrl+F5. Các thay đổi video trong ZIP/repo không tự cập nhật file HTML Preview độc lập.

## Thay ảnh trang chủ

Thay file `assets/images/ipa-building.png` bằng ảnh mới, giữ đúng tên và đuôi PNG. Code dùng lớp phủ mờ để chữ dễ đọc.

## Cập nhật nội dung

- `js/content.js`: tên bài, quiz, mô tả kỹ năng; phần `activities` chứa thẻ thông tin, nhánh và giải thích của Module 2.
- Các đoạn dẫn chuyện theo bước và simulator ở `js/app.js`; chỉ sửa khi cần thay đổi logic hoặc tình huống sâu hơn.
- `css/styles.css`: giao diện. Cuối file chứa phần cập nhật v2.1.
- Luôn backup, sửa từng nhóm nhỏ và mở bài tương ứng để kiểm tra sau khi cập nhật.

## Điều hướng và lưu tiến độ

Trang chủ không có nút Home. Trang chi tiết có một liên kết Trang chủ trong breadcrumb và nút **Quay lại trang trước**. Module 2 có ba bước mỗi tình huống. Mỗi mindmap có nút **Phóng toàn màn hình**, **+**, **−**, **100%**. Đóng bằng nút hoặc Esc.

Tiến độ được lưu trên trình duyệt/thiết bị hiện tại, giữ key từ v2 để dùng lại dữ liệu cũ. Dùng **Đặt lại tiến độ** ở cuối menu nếu muốn học lại từ đầu. Hoàn thành phản ánh hoạt động trong bản mô phỏng, không xác nhận kết quả trên GitMind thật hoặc LMS.

## Nhận diện

Giữ logo IPA nguyên bản; palette chính #59798F, #C4AA78, phụ #3E5B6C. Font stack ưu tiên UTM Hanzel/SVN Gotham; chưa phân phối font thương mại. Nếu cần font đúng tuyệt đối, L&D cần nguồn webfont được cấp phép.

Xem `docs/CHANGELOG_QA_v2.1.md` để biết các kiểm thử đã chạy và những kiểm tra browser còn cần thực hiện.
