# IPA Group — Brand palette & UI audit (Web App v2.6)

**Nguồn duy nhất:** `ipa-brand-identity-checker.skill` → `references/brands/ipa-group.md` (được người dùng cung cấp).

## Bảng màu quy chuẩn chính thức

| Vai trò theo brand spec | HEX chuẩn | CMYK theo spec | Ghi chú khi dùng trong giao diện |
|---|---|---|---|
| Xanh xám chính | `#59798F` | `70% 45% 32% 5%` | Nhánh mindmap, yếu tố thương hiệu |
| Vàng gold chính | `#C4AA78` | `24% 30% 60% 0%` | Accent, CTA, đường kết nối phụ |
| Xanh đậm phụ | `#3E5B6C` | `80% 57% 43% 20%` | Nền sidebar, chủ đề trung tâm, chữ đậm |
| Đất | `#9F8668` | `37% 43% 62% 8%` | Nhãn phụ, nhấn nhẹ |
| Cát | `#D0BB93` | `19% 23% 45% 0%` | Accent, phân tách mềm |
| Cát nhạt | `#DCCCAE` | `13% 16% 33% 0%` | Text accent, phối nền sáng |
| Kem | `#E7DDC9` | `9% 10% 20% 0%` | Nền/nhãn nhạt theo nhu cầu |
| Ghi tối | `#212121` | `72% 66% 66% 72%` | Nội dung văn bản |
| Trắng | `#FFFFFF` | Không nêu | Nền và chữ trên nền tối |

**Khi code web, HEX là mã màu chuẩn được triển khai.** Spec có một vài cặp RGB ghi trong tài liệu không khớp hoàn toàn với chính mã HEX (ví dụ `#59798F` tương đương RGB 89,121,143; spec lại ghi 90,120,143). Không tự thay HEX theo RGB xấp xỉ.

## Typography

- **Font thương hiệu:** `UTM Hanzel` (primary, tiêu đề), `SVN Gotham` (secondary, nội dung) — trích đúng từ nguồn.
- **Web v2.6:** dùng `Montserrat` cho tiêu đề và `Inter` cho nội dung để hiển thị ổn định tiếng Việt. Đây là **font thay thế digital**, không phải hai font gốc của thương hiệu.
- Để đạt độ chính xác tuyệt đối về font, chỉ sử dụng webfont UTM/SVN nếu tổ chức cấp bản được phép nhúng webfont. Không đưa tệp font độc quyền vào gói ZIP.

## Kiểm tra v2.6

| Tiêu chí | Trạng thái | Diễn giải |
|---|---|---|
| Màu BI | Đạt cho màu lõi | Các token brand chính và sơ đồ module 3 dùng chính xác HEX quy định; màu bề mặt/trạng thái hỗ trợ là màu chức năng UI, **không được coi là màu BI chính thức** |
| Logo | Giữ nguyên | Dùng `assets/logos/ipa-primary.png` và `assets/logos/ipa-white.png` người dùng đã cung cấp, không thay hình hoặc kéo méo tỷ lệ |
| Typography | Cần hoàn thiện nếu yêu cầu BI tuyệt đối | Đang dùng các font digital thay thế có hỗ trợ tiếng Việt, chưa nhúng UTM/SVN |
| Mindmap module 3 | Đạt về dùng màu chính | Central Topic `#3E5B6C`, nhánh chính `#59798F`, nhấn `#C4AA78`, nhánh con nền trắng và viền `#D0BB93` |
| Đồng thương hiệu | N/A | Không kết hợp logo đối tác trên giao diện chính |

## Các thay đổi ở bản v2.6

- Module 3 overview: thay các khối bài học bằng một sơ đồ tương tác 6 nhóm / 22 bài.
- Hỗ trợ wheel zoom, kéo canvas, nút +/-/vừa khung, mở/thu nhánh, click bài mở nội dung.
- Mobile: có chọn nhóm trực tiếp để nội dung không bị ép thành chữ quá nhỏ.
- Không thay đổi nội dung học 22 chương, GIF, video Module 1 hay Module 2.

**Ghi chú về quyền sử dụng:** Tài liệu văn bản là phần biên soạn lại và GIF trong gói do người dùng cung cấp; nếu publish public trên GitHub Pages, cần bảo đảm có quyền sử dụng những GIF nguồn.
