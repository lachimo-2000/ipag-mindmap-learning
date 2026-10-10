/* Content layer: edit lesson copy here; the app logic lives in app.js. */
window.LEARNING_CONTENT = {
  programName: 'MindMap as a Skill',
  scenarios: [
    {id:'meeting',num:'01',icon:'◷',title:'Ghi chú cuộc họp',subtitle:'Giữ lại ý chính khi mọi người đang trao đổi',label:'MEETING NOTES',principle:'Ghi lại ý nghĩa và kết quả, không chép nguyên cuộc trò chuyện.',outcome:'Tổ chức trao đổi theo chủ đề, quyết định, hành động và câu hỏi mở.'},
    {id:'problem',num:'02',icon:'⌕',title:'Tìm nguyên nhân',subtitle:'Mở rộng giả thuyết trước khi vội kết luận',label:'PROBLEM EXPLORATION',principle:'Mở rộng nguyên nhân có thể xảy ra, sau đó kiểm chứng.',outcome:'Phân biệt dữ kiện và giả thuyết, xác định điều cần xác minh.'},
    {id:'project',num:'03',icon:'◇',title:'Bắt đầu dự án',subtitle:'Thống nhất mục tiêu, phạm vi và cấu trúc công việc',label:'PROJECT FRAMING',principle:'Thống nhất mục tiêu và phạm vi trước khi đi vào các task.',outcome:'Phân chia dự án thành các nhánh cấp cao có ý nghĩa.'},
    {id:'picture',num:'04',icon:'▣',title:'Giải thích toàn cảnh',subtitle:'Để người khác hiểu nhanh điều quan trọng',label:'BIG PICTURE',principle:'Thiết kế sơ đồ cho người đọc, không chỉ cho người tạo.',outcome:'Loại nhiễu và nhấn mạnh điều người nhận cần biết.'},
    {id:'decision',num:'05',icon:'⇄',title:'Cùng ra quyết định',subtitle:'Đặt lựa chọn, tiêu chí, góc nhìn trên cùng bức tranh',label:'SHARED DECISIONS',principle:'Làm rõ cấu trúc quyết định trước khi chọn phương án.',outcome:'Tách phương án, tiêu chí, bằng chứng và góc nhìn.'}
  ],
  quiz: [
    {q:'Trong cuộc họp có nhiều thông tin xuất hiện liên tục. MindMap hữu ích nhất khi nào?',options:['Cần chép nguyên văn mọi câu nói','Cần tổ chức chủ đề, quyết định và đầu việc ngay khi trao đổi','Cần thay thế hoàn toàn biên bản chính thức'],answer:1,why:'MindMap giúp nhìn cấu trúc trao đổi, nhưng không mặc định thay thế biên bản được yêu cầu theo quy định.'},
    {q:'Khi công việc bị trễ nhưng chưa rõ nguyên nhân, hành động hợp lý đầu tiên là gì?',options:['Chọn ngay một người chịu trách nhiệm','Vẽ các nguyên nhân có thể xảy ra và xác định dữ kiện cần kiểm chứng','Làm đẹp các nhánh để dễ thuyết trình'],answer:1,why:'Sơ đồ giúp mở rộng và kiểm tra giả thuyết; không tự chứng minh nguyên nhân.'},
    {q:'Khi mới khởi động một dự án, nên ưu tiên những nhánh nào?',options:['Mục tiêu, phạm vi, các bên liên quan và nhóm công việc','Chỉ liệt kê các việc nhỏ cần làm hôm nay','Chỉ tập trung deadline và màu sắc'],answer:0,why:'Làm rõ bức tranh cấp cao trước rồi mới phân rã việc chi tiết.'},
    {q:'Khi cần cập nhật lãnh đạo trong 30 giây, điều gì quan trọng nhất?',options:['Giữ lại tất cả node đã tạo','Tăng số đường nối và màu sắc','Chọn lọc cấu trúc theo câu hỏi của người nhận'],answer:2,why:'Sơ đồ truyền đạt cần tinh gọn, không phải bản sao đầy đủ của working map.'},
    {q:'Khi nhóm cần cùng quyết định giữa các phương án, MindMap hỗ trợ tốt nhất điều gì?',options:['Tự động đưa ra phương án đúng duy nhất','Làm rõ lựa chọn, tiêu chí, bằng chứng và bất đồng','Loại bỏ nhu cầu xem dữ liệu'],answer:1,why:'MindMap hỗ trợ định hình quyết định; khi cần so sánh trade-off có thể dùng Decision Matrix.'}
  ],
  micros:[
    {id:'01',title:'Khởi tạo MindMap',skill:'Central Topic',desc:'Tạo sơ đồ và đặt chủ đề trung tâm có ý nghĩa.',action:'Đổi tên chủ đề trung tâm',seconds:'30–40 giây',file:'micro-01.mp4'},
    {id:'02',title:'Xây dựng cấu trúc',skill:'Main & Sub Branch',desc:'Tạo nhánh chính và nhánh con.',action:'Thêm ít nhất 2 nhánh chính và 1 nhánh con',seconds:'40–60 giây',file:'micro-02.mp4'},
    {id:'03',title:'Sắp xếp lại các node',skill:'Move & Restructure',desc:'Di chuyển node để chỉnh cấu trúc.',action:'Chuyển node sang nhóm phù hợp',seconds:'40–60 giây',file:'micro-03.mp4'},
    {id:'04',title:'Thể hiện mối quan hệ',skill:'Relationship',desc:'Nối các node bằng mối quan hệ có ý nghĩa.',action:'Tạo liên kết và đặt nhãn',seconds:'40–50 giây',file:'micro-04.mp4'},
    {id:'05',title:'Làm rõ thông tin',skill:'Visual Clarity',desc:'Dùng tín hiệu thị giác có mục đích.',action:'Làm nổi bật Decision và Action',seconds:'45–60 giây',file:'micro-05.mp4'},
    {id:'06',title:'Chia sẻ và xuất bản',skill:'Share & Export',desc:'Chọn quyền truy cập theo mục đích.',action:'Thiết lập quyền chỉnh sửa và sao chép link mô phỏng',seconds:'30–45 giây',file:'micro-06.mp4'}
  ]
};

/* Module 2 activity copy and explanations. */
window.LEARNING_CONTENT.activities = {
 meeting: {type:'Phân loại từng thẻ', groups:['Decision','Action','Open Question','Risk'], root:'Họp triển khai', items:[
  ['Finance đã đồng ý ngân sách','Decision','Đây là một kết quả đã được thống nhất, vì vậy thuộc nhánh Quyết định (Decision).'],
  ['Mai sẽ gửi bản cập nhật vào thứ Sáu','Action','Có việc cần thực hiện, người phụ trách và thời hạn: ghi ở nhánh Hành động (Action).'],
  ['Pháp chế cần rà soát nội dung cuối','Action','Đây là việc tiếp theo cần làm. Khi gửi recap, cần xác nhận thêm người thực hiện và thời hạn.'],
  ['Chưa rõ IT có cần tham gia hay không','Open Question','Chưa có câu trả lời; giữ thành câu hỏi mở để được xác nhận sau cuộc họp.']
 ]},
 problem: {type:'Thám tử dữ kiện', groups:['Fact','Hypothesis'], root:'Báo cáo trễ', items:[
  ['Ba kỳ gần nhất báo cáo nộp muộn','Fact','Lịch sử nộp báo cáo là dữ kiện quan sát được trong tình huống giả định.'],
  ['Mẫu báo cáo thay đổi vào tháng trước','Fact','Có thay đổi mẫu là dữ kiện. Chưa đủ để kết luận thay đổi này gây trễ.'],
  ['Hệ thống mới chắc chắn gây chậm','Hypothesis','Đây là một giải thích chưa được kiểm chứng. Từ “chắc chắn” không biến nó thành bằng chứng.'],
  ['Chưa có người nhận trách nhiệm tổng hợp','Hypothesis','Trong dữ kiện của bài chưa có phân công được xác nhận; cần kiểm tra đầu mối thực tế.']
 ]},
 project: {type:'Xây nhánh dự án', root:'Chia sẻ kiến thức', items:[
  ['Mục tiêu và kết quả kỳ vọng',1,'Xác định vì sao triển khai và tiêu chí thành công.'],
  ['Phạm vi trong / ngoài dự án',1,'Làm rõ giới hạn để các bên không hiểu khác nhau.'],
  ['Các bên liên quan và vai trò',1,'Xác định sponsor, owner và người tham gia.'],
  ['Các nhóm công việc chính',1,'Tạo khung việc cấp cao trước khi phân rã task.'],
  ['Rủi ro và ràng buộc',1,'Nhận diện giới hạn nguồn lực, thời gian và các điểm cần theo dõi.'],
  ['Thiết kế banner ngay ngày mai',0,'Đây là task chi tiết, đặt ở tầng sâu sau khi đã thống nhất khung dự án.'],
  ['Gửi email mời họp đầu tiên',0,'Đây là task điều phối, không thay thế các nhánh định hướng cấp cao.']
 ]},
 picture: {type:'Biên tập sơ đồ', root:'Dự án LMS · Tổng quan', items:[
  ['Mục tiêu dự án',1,'Giúp người đọc hiểu dự án hướng đến kết quả gì.'],
  ['Tiến độ hiện tại',1,'Cho biết dự án đang ở đâu so với kế hoạch.'],
  ['Rủi ro trọng yếu',1,'Giúp lãnh đạo nhận diện điều có thể ảnh hưởng kết quả.'],
  ['Quyết định cần phê duyệt',1,'Nêu rõ hành động hoặc phê duyệt đang cần từ người đọc.'],
  ['Mốc tiếp theo',1,'Cho biết bước tiếp theo và thời điểm kỳ vọng.'],
  ['Lịch hẹn vendor lần thứ 4',0,'Có thể giữ ở tầng chi tiết; không cần xuất hiện trong cập nhật 30 giây.'],
  ['Chi tiết 17 comment của team',0,'Lưu ở hồ sơ làm việc để tra cứu; đưa lên tổng quan sẽ làm loãng thông điệp.'],
  ['Thứ tự các email nhắc việc',0,'Lịch sử trao đổi cần thiết khi tra cứu, nhưng không phải nhánh ưu tiên của lãnh đạo.']
 ]},
 decision: {type:'Nối góc nhìn & tiêu chí', root:'Quyết định hình thức đào tạo', criteria:['Chi phí','Thời gian triển khai','Trải nghiệm học viên'], views:[
  ['Finance muốn tối ưu ngân sách','Chi phí','Góc nhìn này cần số liệu chi phí để so sánh, không phải mặc định chọn phương án rẻ nhất.'],
  ['Business lo ảnh hưởng lịch làm việc','Thời gian triển khai','Cần xem thời lượng, lịch học và tác động đến công việc.'],
  ['L&D muốn tăng cơ hội thực hành','Trải nghiệm học viên','Cần đánh giá cơ hội áp dụng và mức độ tương tác trong từng phương án.']
 ]}
};
