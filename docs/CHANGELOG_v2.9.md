# IPA MindMap Learning Web App — v2.9 · Update Only

Ngày cập nhật: 13/10/2026. Nâng cấp trên nền v2.8.

## 1. Module 2 · Canvas thực hành không còn khởi tạo lại mỗi lần thả node

- Trước đây thao tác `onPlace`, `onSelect`, `check-stage`, `reset-stage` đều gọi `render()`, làm toàn bộ `#screen` và `#case-mindmap` bị dựng lại. Đã thay bằng `LearningMaps.refreshCase()` cập nhật **trong DOM hiện có**: tọa độ node, vị trí kết nối, đường SVG, số lượng thẻ, trạng thái viền và bảng phản hồi.
- Không thay thế root node, canvas, viewport sau khi chọn/kéo thả. Giữ lại tỷ lệ zoom và vị trí di chuyển hiện tại; node có chuyển động vị trí ngắn.
- Cả ba kiểu thao tác được giữ: HTML5 kéo-thả, bấm node → bấm nhánh, kéo/bấm trả về vùng Chưa kết nối. Có thêm hỗ trợ thả node trực tiếp lên một node đang ở trong nhánh.
- Trên điện thoại có nút **Xem nhánh** và **Xem thẻ** để dịch chuyển vùng nhìn mà không phải kéo canvas quá xa.

## 2. Đồng bộ mindmap theo thứ bậc, trái → phải

- Ở **tất cả 5 case của Module 2**, central topic ở cột bên trái, các nhánh cấp một cùng ở bên phải.
- Các đường nối cấp một dùng cùng màu Gold IPA `#C4AA78`, cùng kiểu cong Bezier đều với cùng midpoint; đường node con dùng IPA Blue `#59798F`.
- Các nhánh con như **Truyền thông** (Case 3) và **Chi tiết để tra cứu** (Case 4) xuất phát từ nhánh cha đúng cấp.
- Giữ các màu phân nhóm từ brand guidelines; không dùng màu đáp án trước khi bấm kiểm tra.

## 3. Phản hồi ngay trên mindmap

- Sau **Kiểm tra đáp án**, các node đúng có viền **xanh lá**, node sai có viền **đỏ**, cùng biểu tượng `✓`/`↻` trên chính node.
- Bảng **Cần điều chỉnh một số node** chỉ hiển thị các node sai, kèm `Bạn đặt → Gợi ý → Vì sao`.
- Khi tất cả đúng, chỉ hiển thị thông báo hoàn thành và điểm chốt; không lặp lại danh sách node đúng.
- Khi sửa một node, xóa trạng thái chấm hiện tại để người học có thể kiểm tra lại; nút hoàn thành chỉ hiển thị sau khi kiểm tra đúng.

## 4. Module 3 và sidebar

- CTA Module 3 đổi thành **Truy cập GitMind ↗**; nhấn mở `https://gitmind.com/` trong tab mới. Hiệu ứng viền/ánh sáng Gold nhẹ, có chế độ giảm chuyển động.
- Ba block điều hướng module trên sidebar có nền trắng, chữ xanh đậm; các nội dung con vẫn ở nền sidebar. Mở/thu nhóm có animation ngắn, trạng thái cuộn menu được giữ khi cập nhật nội dung.

## File cập nhật

- `js/learning-maps.js`
- `js/app.js`
- `css/styles.css`
- `docs/CHANGELOG_v2.9.md` (mới)

**Không đóng gói lại hoặc chỉnh sửa:** MP4 Module 1, 22 ảnh hướng dẫn GitMind, ảnh logo, các tập tin HTML hoặc nội dung `js/content.js`.

## Kiểm thử

- Playwright Chromium desktop 1440×900 và mobile 390×844: 5 case + bước chọn bằng chứng của Case 2, đặt đúng, đánh dấu trạng thái xanh, hoàn thành case/đi tiếp, chọn sai và chỉ liệt kê node sai, sửa lại và kiểm tra lần nữa.
- Kiểm tra DOM root và viewport vẫn kết nối, canvas transform không bị đặt lại sau từng thao tác.
- Kiểm tra sự kiện HTML5 `dragstart/dragover/drop` cho một node, và đường dẫn website GitMind/nền trắng của sidebar.
- Không có JavaScript page error trong các lượt thử. Chưa thử trực tiếp URL đã deploy trên GitHub Pages.

## Cách cập nhật repo GitHub

Giải nén ZIP Update Only, kéo **nội dung** bên trong vào **root** repository đang chạy v2.8 (không kéo nguyên thư mục bao ngoài), commit và chờ GitHub Pages deploy. Bấm Ctrl+F5 để tránh file JS/CSS cũ trong cache. Các đường dẫn `js/...`, `css/...`, `docs/...` cần giữ đúng.
