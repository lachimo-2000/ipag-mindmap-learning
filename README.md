# MindMap trong công việc — IPA Group v2.3

Ứng dụng HTML/CSS/JavaScript tĩnh, phát triển trực tiếp từ bản v2.1 được cung cấp. Phiên bản 2.3 kế thừa quiz và điều hướng từ v2.2, đồng thời bổ sung nội dung học tiếng Việt cho toàn bộ Module 3 từ hướng dẫn chính thức GitMind. Không thay đổi kết cấu tài nguyên video.

## Mở và triển khai

1. Giải nén ZIP. Mở thư mục `IPA_Mindmap_Learning_WebApp`.
2. Để dùng trên GitHub Pages, đưa **nội dung bên trong** thư mục này vào root repository: `index.html`, `css`, `js`, `assets`, `.nojekyll`, `docs`, `video-setup.html`. Tránh tạo thêm một tầng thư mục ngoài.
3. Giữ cấu trúc thư mục, không đưa tất cả ảnh/video ra root. Code đọc tài nguyên theo đường dẫn tương ứng.
4. Chọn repository → Settings → Pages → branch chứa source → root để triển khai. Nếu video lớn vượt giới hạn upload web, dùng công cụ Git được công ty cho phép hoặc nhờ IT đưa file vào repository.
5. Kiểm tra trên website thực tế theo checklist `docs/CHANGELOG_QA_v2.1.md`.

Phiên bản này cung cấp **ZIP đầy đủ** để triển khai trên GitHub Pages. Có thể xem thử bằng cách mở `index.html` trong thư mục đã giải nén (một số tính năng video/YouTube có thể cần hosting HTTP/HTTPS).

## Thay video mà không sửa code

- Module 1: thay `assets/videos/module-1/module-01.mp4` bằng file mới có cùng tên.
- Module 3: đưa sáu MP4 vào `assets/videos/module-3/` với tên `micro-01.mp4` đến `micro-06.mp4`. Tên file đã gắn với bài 3.1–3.6. Các file `.placeholder.txt` là ghi chú, không phải video.
- Giữ MP4 tương thích trình duyệt, ưu tiên H.264/AAC. Không tự giảm chất lượng nguồn trong lần sửa này.
- Nếu dùng YouTube, mở `video-setup.html`, điền URL, tải `video-library.json` rồi thay `assets/videos/video-library.json`.
- Commit/Push thay đổi và refresh trang. Nếu vẫn thấy bản cũ, dùng Ctrl+F5. Các thay đổi video trong ZIP/repo không tự cập nhật file HTML Preview độc lập.

## Thay ảnh trang chủ

Thay file `assets/images/ipa-building.png` bằng ảnh mới, giữ đúng tên và đuôi PNG. Code dùng lớp phủ mờ để chữ dễ đọc.

## Cập nhật nội dung

- `js/content.js`: tên bài, mô tả kỹ năng; phần `activities` của Module 2; **`gitmindGuide.lessons` chứa hướng dẫn tiếng Việt bài 3.1–3.6**. Có thể cập nhật lời giảng, mục tiêu, cách làm, lưu ý mà không đụng `app.js`.
- `js/quiz-module1.js`: **nội dung và xử lý tương tác của năm câu Quiz Module 1** (chọn nhiều, nối cột, chọn map, chạm node, chọn cụm từ).
- Các đoạn dẫn chuyện theo bước và simulator ở `js/app.js`; chỉ sửa khi cần thay đổi logic hoặc tình huống sâu hơn.
- `css/styles.css`: giao diện. Cuối file chứa phần cập nhật v2.2.
- Luôn backup, sửa từng nhóm nhỏ và mở bài tương ứng để kiểm tra sau khi cập nhật.

## Điều hướng và lưu tiến độ

Bấm logo IPA Group ở sidebar để về Trang chủ (trên mobile mở menu trước). Trang chi tiết cũng có breadcrumb và nút **Quay lại trang trước**. Module 2 có ba bước mỗi tình huống; khi hoàn thành sẽ sang tình huống kế tiếp, sau tình huống cuối sẽ thấy trang tổng kết. Mỗi mindmap có nút **Phóng toàn màn hình**, **+**, **−**, **100%**. Đóng bằng nút hoặc Esc.

Tiến độ được lưu trên trình duyệt/thiết bị hiện tại, giữ key từ v2 để dùng lại dữ liệu cũ. **Kết quả quiz cũ sẽ được xóa riêng** vì định dạng câu hỏi trong v2.2 đã thay đổi; các tiến độ Module 2/3 được giữ nguyên. Dùng **Đặt lại tiến độ** ở cuối menu nếu muốn học lại từ đầu. Hoàn thành phản ánh hoạt động trong bản mô phỏng, không xác nhận kết quả trên GitMind thật hoặc LMS.

## Nhận diện

Giữ logo IPA nguyên bản; palette chính #59798F, #C4AA78, phụ #3E5B6C. Font stack ưu tiên UTM Hanzel/SVN Gotham; chưa phân phối font thương mại. Nếu cần font đúng tuyệt đối, L&D cần nguồn webfont được cấp phép.

Xem `docs/CHANGELOG_v2.2.md` để biết các thay đổi mới; `docs/CHANGELOG_QA_v2.1.md` lưu thông tin kiểm thử phiên bản gốc.

## Kiểm tra sau deploy

- Quiz 1: chọn ba nhận định đúng, nhận giải thích 5 nhận định.
- Quiz 2: nối ba cặp, thử đổi cặp và quan sát đường nối.
- Quiz 3: chọn map của Bình, so sánh với map của An.
- Quiz 4: chạm chủ đề trung tâm → nhánh chính → nhánh con.
- Quiz 5: chọn cách viết đủ ba thông tin (Lan, ảnh sản phẩm, thứ Tư).
- Sau quiz: xem mindmap tổng hợp.
- Module 2: hoàn thành Meeting → điều hướng sang Tìm nguyên nhân; hoàn thành bài 2.5 → trang tổng kết.
- Bấm logo để trở về Trang chủ; kiểm tra sidebar trên điện thoại.

Video nguồn Module 1 gốc (~59 MB) có thể vượt giới hạn tải lên qua giao diện web GitHub; khi đó cần upload qua Git/GitHub Desktop hoặc lưu trên hệ thống video phù hợp theo chính sách công ty.

## Hướng dẫn tiếng Việt Module 3 — mới ở v2.3

Mỗi bài WATCH có nội dung hướng dẫn ba bước, ví dụ thực tế, kết quả và lưu ý bám theo [hướng dẫn GitMind](https://gitmind.com/faq/how-to-use-gitmind.html); TRY có bản ghi nhớ mở/thu gọn. Nếu chưa có video thì vẫn học được qua chữ và simulator. Xem `docs/MODULE3_GITMIND_CONTENT_VI.md` và `docs/CHANGELOG_v2.3.md` để biết xuất xứ, giới hạn và quy trình cập nhật. Các video không tự động được tạo từ nguồn website.

## Bổ sung v2.4 — Module 3 mở rộng

- Module 3 hiện có **22 chương hướng dẫn GitMind có GIF/ảnh kèm theo**, đánh số 3.1–3.22, và **6 bài Luyện thao tác** vẫn giữ nguyên.
- Các chapter xuất phát từ bộ tài liệu 27 mục đã biên soạn bằng tiếng Việt, bỏ các mục 01/12/13/20/27 theo thứ tự trong bộ Source Pack.
- Để thay GIF, mở `assets/gitmind-chapters/` và thay file đúng tên hiện có. Không phải sửa code.
- Để thay nội dung tiếng Việt hoặc câu hỏi kiểm tra, quản lý dữ liệu ở `js/gitmind-chapters.js`.
- Chi tiết thay đổi và cách upload bản cập nhật không chứa video ở `docs/CHANGELOG_v2.4.md`.


## Update v2.6 — Module 3 overview mindmap

Trang tổng quan Module 3 có sơ đồ tương tác 6 nhóm / 22 bài, có wheel zoom, pan, toggle và click để mở bài. Danh sách các file thay đổi và bảng màu chuẩn xem `docs/CHANGELOG_v2.6.md` và `docs/BRAND_PALETTE_AUDIT_v2.6.md`.
