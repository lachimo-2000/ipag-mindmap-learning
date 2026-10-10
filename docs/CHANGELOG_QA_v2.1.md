# IPA MindMap Web App — v2.1

Ngày cập nhật: 10/10/2026.

## Kết quả sửa đổi

- Sửa lịch sử điều hướng: nút **Quay lại trang trước** trở về đúng bài đã xem, kể cả khi đổi giữa các tình huống.
- Trang chủ không còn nút Trang chủ. Các màn hình chi tiết chỉ có một liên kết Trang chủ trong breadcrumb; bỏ các nút trùng lặp.
- Bỏ thông tin “IPA Group Brand Identity”, thông tin phiên bản triển khai và chỉ dẫn đường dẫn video khỏi giao diện học viên. Hướng dẫn quản trị nằm trong README.
- Thêm ảnh tòa nhà IPA Group do người dùng cung cấp làm nền mờ ở trang chủ. Logo và video Module 1 giữ nguyên.
- Module 2 sử dụng toàn chiều rộng, hoạt động và sơ đồ theo chiều dọc. Mỗi sơ đồ có phóng to/thu nhỏ, về 100% và mở toàn màn hình ứng dụng. Nhấn Đóng sơ đồ hoặc Esc để thoát.
- Node có chiều rộng phù hợp; trên màn hình nhỏ các nhánh chuyển sang bố cục dọc. Không ép chữ vào cột nhỏ.
- Thêm chuyển cảnh, hiệu ứng xuất hiện node, trạng thái chọn, hover và phản hồi. Tắt chuyển động khi thiết bị bật reduced motion.
- Menu di động có lớp nền đóng menu và phím Esc.
- Module 3: video hướng dẫn được thu gọn trong TRY/CHECK để ưu tiên workspace. Sửa nhãn liên kết thực tế; CHECK chỉ mở khi thao tác phù hợp. Bỏ tín hiệu hoặc đổi quyền về View only sẽ khóa lại thao tác cần luyện.
- Quiz hiển thị giải thích cho cả câu cuối trước khi xem kết quả.

## Hoạt động Module 2

| Tình huống | Hoạt động mới | Giá trị thực hành |
|---|---|---|
| Ghi chú cuộc họp | Phân loại từng thẻ, chọn nhánh, xem lại bằng số thẻ | Tách Decision, Action, Open Question, Risk mà không cần kéo thả |
| Tìm nguyên nhân | Thám tử dữ kiện: đánh dấu Fact/Hypothesis; chọn bằng chứng | Tách quan sát và suy đoán, biết vì sao cần kiểm chứng |
| Bắt đầu dự án | Thêm/gỡ nhánh định hướng trên bản đồ | Phân biệt khung dự án với task chi tiết |
| Giải thích toàn cảnh | Biên tập node: chuyển xuống tầng chi tiết, khôi phục, so sánh bản gốc | Tinh gọn theo nhu cầu người đọc |
| Cùng ra quyết định | Nối góc nhìn các bên với tiêu chí cần bằng chứng | Làm rõ trade-off trước khi dùng ma trận so sánh |

Phản hồi giải thích từng lựa chọn. Đây là cấu trúc tham khảo theo dữ kiện giả định, không khẳng định chỉ có một cấu trúc MindMap hợp lý.

## QA đã thực hiện

Kiểm thử thực thi JavaScript và thao tác DOM bằng jsdom, không sử dụng trình duyệt có khả năng hiển thị trang. 18 kịch bản đều đạt; không ghi nhận lỗi runtime trong các đường đi này.

| Kiểm thử | Trạng thái |
|---|---|
| Trang chủ: không nút Home, không thông tin BI, có ảnh nền | Đạt — DOM |
| Module 1: đường dẫn video và phản hồi 5 câu quiz | Đạt — DOM |
| Điều hướng về đúng tình huống trước; chỉ một Home | Đạt — DOM |
| Meeting: thiếu/chọn sai/đúng một phần/đúng hết/sửa/hoàn thành | Đạt — DOM |
| Problem: dữ kiện, giả thuyết và phản hồi bằng chứng | Đạt — DOM |
| Project: xây nhánh cấp cao và hoàn thành | Đạt — DOM |
| Picture: tinh gọn, khôi phục và so sánh | Đạt — DOM |
| Decision: nối cặp, điều kiện mở phản hồi và hoàn thành | Đạt — DOM |
| Mở sơ đồ lớn, zoom, 100%, đóng và trả focus | Đạt — DOM |
| Micro 01: video lỗi có fallback; đổi chủ đề | Đạt — DOM |
| Micro 02: thêm nhánh chính và nhánh con | Đạt — DOM |
| Micro 03: nút thay thế kéo thả | Đạt — DOM |
| Micro 04: nhãn sai khóa CHECK; nhãn phù hợp mở CHECK | Đạt — DOM |
| Micro 05: bật/tắt tín hiệu cập nhật điều kiện CHECK | Đạt — DOM |
| Micro 06: quyền chỉnh sửa và chia sẻ mô phỏng | Đạt — DOM |
| Menu: mở/đóng/overlay/Esc | Đạt — DOM |
| Tiến độ: đọc lại và xử lý JSON hỏng | Đạt — DOM |
| Đặt lại tiến độ về trang chủ sạch | Đạt — DOM |

Kiểm tra bổ sung: JS qua `node --check`; CSS được parse bằng css-tree không có lỗi cú pháp; video Module 1 H.264/AAC 1920×1080, 239,061 giây, đối chiếu SHA-256 khớp video gốc; logo giữ nguyên; đường dẫn tài nguyên chính và cấu trúc ZIP được kiểm tra.

### Giới hạn xác nhận

- **Chưa kiểm thử trực quan trên trình duyệt thật** ở desktop/mobile: bố cục responsive được sửa và kiểm tra trong mã CSS, chưa xác nhận pixel/layout thực tế.
- Phóng toàn màn hình được kiểm thử ở mức logic dialog; jsdom dùng mô phỏng API dialog, chưa kiểm thử native dialog trên browser. Chế độ này phủ toàn màn hình ứng dụng, không ẩn thanh công cụ của trình duyệt.
- Chưa phát video/audio bằng browser hoặc kiểm tra kéo thả HTML5/chạm trên thiết bị thật. Video nguồn giữ nguyên và đã kiểm tra metadata.
- Module 3 chưa có sáu micro-video; vẫn có thông báo chờ video và hoạt động thực hành. Không tạo video mới trong lần sửa này.
- Chưa triển khai lên GitHub Pages. Trước khi rollout, cần mở bản preview trên Edge/Chrome máy tính, màn hình hẹp và kiểm tra phát video, đóng/mở sơ đồ, zoom, menu và thao tác thực tế.
- Tiến độ chỉ lưu trên trình duyệt hiện tại; không phải kết quả được xác minh tập trung trong LMS.

## Đánh giá nhận diện IPA Group

Nguồn: skill `ipa-brand-identity-checker`, reference `references/brands/ipa-group.md` do người dùng cung cấp.

| Hạng mục kiểm tra | Trạng thái | Hiện trạng và yêu cầu |
|---|---|---|
| Logo | Đạt ở mức tài nguyên/mã nguồn | Giữ nguyên logo IPA; dùng bản trắng trên nền xanh đậm, tỷ lệ tự nhiên. Khoảng trống quanh logo được duy trì trong CSS. Cần xác nhận trực quan cuối. |
| Màu sắc | Đạt ở mức mã nguồn | Chính #59798F, #C4AA78; phụ #3E5B6C; dùng các tông cát/đất trong spec. Các màu trạng thái hỗ trợ diễn giải phản hồi. |
| Typography | Cần xác nhận | UTM Hanzel/SVN Gotham đứng đầu font stack; chưa có webfont được cấp phép, thiết bị thiếu font sẽ dùng fallback. |
| Layout & Asset | Cần xác nhận trực quan | Nền ảnh IPA được phủ mờ, giữ vùng chữ dễ đọc theo CSS; chưa đo tương phản và bố cục trên browser thật. |
| Đồng thương hiệu | N/A | Một thương hiệu IPA Group. |

**Kết luận:** Các thay đổi đã đáp ứng yêu cầu ở mức mã nguồn và kiểm thử logic. Cần QA trực quan trên trình duyệt thật và xác nhận font trước khi kết luận đạt tiêu chuẩn xuất bản.
