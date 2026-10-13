# MindMap as a Skill — v2.2

- Module 1: Thay quiz trắc nghiệm bằng năm hoạt động đa dạng (multi-select, nối cột, chọn map, chạm node, chọn cụm từ đủ nghĩa). Feedback theo đáp án và map tổng kết.
- Việt hóa các nhãn học phần, trang chủ và điều hướng trọng tâm. Giữ lại thuật ngữ GitMind/MindMap khi mang ý nghĩa chuyên ngành.
- Logo IPA Group trong sidebar là liên kết về Trang chủ.
- Module 2 chuyển trực tiếp sang tình huống tiếp theo sau khi hoàn thành; từ tình huống 5 chuyển đến trang tổng kết.
- Video Full HD và hệ thống thư mục video Module 3 giữ nguyên từ v2.1.
- Quiz cũ được đặt lại vì định dạng và mục tiêu câu hỏi đã thay đổi. Các tiến độ khác được giữ lại.

## Kiểm thử thực tế (trình duyệt Chromium, bản nạp tĩnh)

- PASS: Cả năm dạng quiz theo thứ tự với đáp án tham chiếu; xuất trang tổng kết.
- PASS: Phân loại sai ở câu 1 hiển thị số câu đúng và giải thích từng nhận định.
- PASS: Câu 2 thể hiện đường nối giữa hai cột; đổi cặp trước khi kiểm tra.
- PASS: Câu 3 giải thích vì sao map Bình phù hợp nhưng map An vẫn có ích.
- PASS: Câu 4 xác định được chủ đề trung tâm → nhánh chính → nhánh con.
- PASS: Câu 5 kiểm tra tên người phụ trách/việc/hạn hoàn thành.
- PASS: Click logo IPA Group để về trang chủ ở desktop/mobile (mobile mở sidebar trước).
- PASS: Hoàn tất Meeting → tự động sang Tìm nguyên nhân.
- PASS: Hoàn tất bài 2.5 → trang tổng kết Module 2.
- PASS: Mobile 390px không tràn ngang ở màn Quiz kiểm tra.
- PASS: Không phát hiện JavaScript page error trong các bài kiểm thử nói trên.

**Giới hạn kiểm thử:** Môi trường browser kiểm thử chặn điều hướng `localhost`/`file://`, nên các test giao diện đã được thực hiện bằng cách nạp HTML/CSS/JavaScript trực tiếp vào Chromium. Vì vậy việc tải ảnh/video qua đường dẫn tương đối và hoạt động trên GitHub Pages phải được xác nhận thêm sau khi publish. Logo được giữ nguyên trong thư mục và đường dẫn tài nguyên được bảo toàn, không thay đổi. Không thay đổi source video.
