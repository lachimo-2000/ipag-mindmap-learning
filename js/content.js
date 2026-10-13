window.LEARNING_CONTENT = {
  programName: 'MindMap trong công việc',
  scenarios: [
    {id:'meeting',num:'01',icon:'◷',title:'Ghi chú cuộc họp',subtitle:'Phân loại ghi chú để team tìm nhanh điều đã chốt, việc cần làm và điểm cần theo dõi.'},
    {id:'problem',num:'02',icon:'⌕',title:'Tìm nguyên nhân',subtitle:'Phân biệt dữ kiện với giả thuyết và xác định bằng chứng cần thu thập.'},
    {id:'project',num:'03',icon:'◇',title:'Bắt đầu dự án',subtitle:'Làm rõ mục tiêu, phạm vi, các bên liên quan và phân rã nhóm công việc.'},
    {id:'decision',num:'04',icon:'⇄',title:'Cùng ra quyết định',subtitle:'Đưa các góc nhìn lên cùng một bức tranh để so sánh theo tiêu chí.'}
  ],
  module2Cases: [
    {
      id:'meeting',
      num:'2.1',
      title:'Ghi chú cuộc họp',
      label:'CASE 1',
      intro:'An và Bình đang họp chuẩn bị workshop. Team đã thống nhất ngân sách, giao việc và ghi nhận những điểm chưa rõ.',
      task:'Phân loại ghi chú để mọi người tìm nhanh kết quả cuộc họp.',
      root:'Chuẩn bị workshop',
      narrator:'An: “Mình cần một map để sau cuộc họp ai cũng nhìn ra điều đã chốt, việc phải làm và điểm cần theo dõi.”',
      type:'sort',
      zones:[
        {id:'Quyết định',label:'Quyết định',hint:'Điều đã được thống nhất.'},
        {id:'Hành động',label:'Hành động',hint:'Việc cần làm, có người phụ trách hoặc thời hạn.'},
        {id:'Câu hỏi mở',label:'Câu hỏi mở',hint:'Thông tin chưa được xác nhận.'},
        {id:'Rủi ro',label:'Rủi ro',hint:'Khả năng có thể ảnh hưởng kế hoạch.'}
      ],
      cards:[
        {text:'Team đã duyệt ngân sách 15 triệu đồng.',correct:'Quyết định',why:'Đây là điều đã được thống nhất trong cuộc họp.'},
        {text:'Mai gửi thư mời trước 15:00 thứ Sáu.',correct:'Hành động',why:'Có việc cần làm, người phụ trách và thời hạn.'},
        {text:'Chưa rõ có cần IT hỗ trợ buổi học không.',correct:'Câu hỏi mở',why:'Đây là thông tin chưa được xác nhận.'},
        {text:'Diễn giả có thể đổi lịch sát ngày tổ chức.',correct:'Rủi ro',why:'Đây là khả năng có thể ảnh hưởng kế hoạch.'}
      ],
      summary:'Ghi chú hữu ích cần làm rõ vai trò của thông tin để team biết điều đã chốt, việc cần làm và điểm cần theo dõi.'
    },
    {
      id:'problem',
      num:'2.2',
      title:'Tìm nguyên nhân',
      label:'CASE 2',
      intro:'Báo cáo nộp muộn trong ba kỳ gần nhất. Nhật ký xác nhận mẫu báo cáo đổi từ tháng trước. Team đưa ra nhiều khả năng nhưng chưa xác minh nguyên nhân.',
      task:'Phân biệt dữ kiện với giả thuyết, sau đó chọn bằng chứng cần thu thập.',
      root:'Báo cáo gửi trễ',
      narrator:'Bình: “Map giúp nhóm tách điều mình đã biết khỏi điều mình chỉ đang phỏng đoán.”',
      type:'multi-stage',
      stages:[
        {
          type:'sort',
          title:'Bước 1 · Tách dữ kiện và giả thuyết',
          zones:[
            {id:'Dữ kiện',label:'Dữ kiện',hint:'Hiện tượng hay thay đổi đã được xác nhận.'},
            {id:'Giả thuyết',label:'Giả thuyết',hint:'Cách giải thích cần kiểm chứng.'}
          ],
          cards:[
            {text:'Ba kỳ gần nhất đều nộp báo cáo muộn.',correct:'Dữ kiện',why:'Đây là hiện tượng đã quan sát được.'},
            {text:'Mẫu báo cáo thay đổi từ tháng trước.',correct:'Dữ kiện',why:'Đây là thay đổi đã được xác nhận; chưa chứng minh nó gây trễ.'},
            {text:'Có thể dữ liệu đầu vào đến quá muộn.',correct:'Giả thuyết',why:'Đây là cách giải thích cần kiểm chứng.'},
            {text:'Có thể chưa rõ người chịu trách nhiệm tổng hợp.',correct:'Giả thuyết',why:'Cần kiểm tra phân công thực tế.'}
          ]
        },
        {
          type:'multi',
          title:'Bước 2 · Chọn bằng chứng cần thu thập',
          question:'Bằng chứng nào giúp kiểm chứng hai giả thuyết?',
          options:[
            {text:'Thời điểm yêu cầu và nhận dữ liệu.',correct:true,why:'Mốc thời gian giúp kiểm tra giả thuyết dữ liệu đầu vào đến muộn.'},
            {text:'Phân công và các mốc xử lý thực tế.',correct:true,why:'Thông tin này giúp kiểm tra trách nhiệm tổng hợp và tiến độ xử lý.'},
            {text:'Màu dùng trong báo cáo.',correct:false,why:'Màu trình bày không giúp kiểm chứng nguyên nhân nộp báo cáo trễ.'}
          ]
        }
      ],
      summary:'Mindmap giúp tổ chức giả thuyết và xác định điều cần kiểm chứng. Sơ đồ không tự chứng minh nguyên nhân.'
    },
    {
      id:'project',
      num:'2.3',
      title:'Bắt đầu dự án',
      label:'CASE 3',
      intro:'Team chuẩn bị thí điểm chương trình chia sẻ kiến thức tại một đơn vị. Cần thống nhất khung dự án trước khi làm các việc nhỏ.',
      task:'Đặt ý định hướng vào nhánh chính; đặt đầu việc cụ thể vào nhánh con.',
      root:'Chia sẻ kiến thức',
      narrator:'An: “Mình cần khung dự án trước, rồi mới phân rã thành các đầu việc nhỏ.”',
      type:'sort',
      zones:[
        {id:'Mục tiêu',label:'Mục tiêu',hint:'Vì sao làm chương trình này?'},
        {id:'Phạm vi',label:'Phạm vi',hint:'Làm tới đâu, chưa làm tới đâu?'},
        {id:'Các bên liên quan',label:'Các bên liên quan',hint:'Ai tham gia và ai hỗ trợ?'},
        {id:'Nhóm công việc',label:'Nhóm công việc',hint:'Nhóm việc cấp cao.'},
        {id:'Truyền thông',label:'↳ Truyền thông',hint:'Nhánh con bên trong nhóm công việc.'}
      ],
      cards:[
        {text:'Tăng chia sẻ kiến thức giữa các thành viên.',correct:'Mục tiêu',why:'Đây là mục tiêu của chương trình.'},
        {text:'Thí điểm trong một đơn vị, chưa triển khai toàn tập đoàn.',correct:'Phạm vi',why:'Đây là giới hạn triển khai.'},
        {text:'Lan là đầu mối; trưởng đơn vị hỗ trợ và duyệt kế hoạch.',correct:'Các bên liên quan',why:'Đây là thông tin về các bên tham gia và vai trò.'},
        {text:'Truyền thông chương trình.',correct:'Nhóm công việc',why:'Đây là một nhóm công việc cấp cao.'},
        {text:'Thiết kế banner giới thiệu.',correct:'Truyền thông',why:'Đây là đầu việc cụ thể nằm trong nhánh Truyền thông.'},
        {text:'Gửi thư mời tham gia chương trình.',correct:'Truyền thông',why:'Đây là đầu việc cụ thể thuộc nhánh Truyền thông.'}
      ],
      summary:'Làm rõ mục tiêu, phạm vi, các bên và nhóm công việc trước khi phân rã đầu việc.'
    },
    {
      id:'decision',
      num:'2.4',
      title:'Cùng ra quyết định',
      label:'CASE 4',
      intro:'L&D, Finance và Business cân nhắc học trực tiếp, online hoặc kết hợp. Các bên có ưu tiên khác nhau.',
      task:'Ghép góc nhìn của từng bên với tiêu chí cần so sánh.',
      root:'Hình thức đào tạo',
      narrator:'An: “MindMap giúp đưa các ưu tiên lên cùng một bức tranh, nhưng vẫn cần thêm dữ liệu để so sánh.”',
      type:'sort',
      zones:[
        {id:'Chi phí',label:'Chi phí',hint:'Tiêu chí nhìn từ góc độ tài chính.'},
        {id:'Thời gian & lịch làm việc',label:'Thời gian & lịch làm việc',hint:'Tiêu chí gắn với vận hành và lịch học.'},
        {id:'Trải nghiệm học viên',label:'Trải nghiệm học viên',hint:'Tiêu chí gắn với thực hành và áp dụng.'}
      ],
      cards:[
        {text:'Finance cần kiểm soát tổng ngân sách.',correct:'Chi phí',why:'Cần so sánh chi phí thực tế của từng phương án.'},
        {text:'Business lo lịch học ảnh hưởng vận hành.',correct:'Thời gian & lịch làm việc',why:'Cần xem lịch, thời lượng và tác động đến công việc.'},
        {text:'L&D muốn học viên được thực hành nhiều hơn.',correct:'Trải nghiệm học viên',why:'Cần đánh giá cơ hội thực hành và áp dụng.'}
      ],
      summary:'Mindmap giúp đưa các ưu tiên lên cùng một bức tranh. Cần thêm dữ liệu và bằng chứng để so sánh, không tự động chọn phương án đúng.'
    }
  ]
};
