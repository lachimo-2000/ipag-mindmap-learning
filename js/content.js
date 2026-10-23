/* Module 2 rebuilt from two user-provided IPAM Way reference PDFs. Scenario cards are illustrative. */
window.LEARNING_CONTENT = {
  "programName": "MindMap trong công việc",
  "scenarios": [
    {
      "id": "identify",
      "num": "01",
      "title": "Identify — Nhận diện mục tiêu",
      "subtitle": "Dùng MindMap nhóm 5 câu hỏi theo 5I, sau đó phân loại quyết định TAC Shapeup."
    },
    {
      "id": "plan",
      "num": "02",
      "title": "Plan — Chuyển WHY thành WHAT & HOW",
      "subtitle": "Sắp xếp câu hỏi 5P vào nhánh phù hợp và ghép đầu ra kế hoạch với OTOOB."
    },
    {
      "id": "accountability",
      "num": "03",
      "title": "Accountability — Rõ người, rõ quyền",
      "subtitle": "Xây mindmap 5A rồi ghép đúng các vai trò của ma trận RACI."
    },
    {
      "id": "management",
      "num": "04",
      "title": "Management — Theo dõi và cải tiến",
      "subtitle": "Tổ chức mindmap 5M, rồi kết nối từng câu hỏi quản lý với loại đầu ra cần thiết."
    }
  ],
  "module2Cases": [
    {
      "id": "identify",
      "num": "2.1",
      "label": "CASE 1 · IDENTIFY",
      "title": "Identify — Nhận diện mục tiêu",
      "intro": "IPAM Way bắt đầu từ WHY: nhận diện đúng mục tiêu, bên liên quan, vấn đề, giải pháp và cam kết. Sơ đồ 5I giúp đặt đúng câu hỏi trước khi lập kế hoạch.",
      "task": "Dùng MindMap nhóm 5 câu hỏi theo 5I, sau đó phân loại quyết định TAC Shapeup.",
      "root": "I · Identify",
      "narrator": "An: “Không vội đặt task; trước hết hãy làm rõ tại sao cần đạt mục tiêu này.”",
      "type": "multi-stage",
      "stages": [
        {
          "type": "sort",
          "title": "Khám phá 5I — nhận diện trước khi hành động",
          "zones": [
            {
              "id": "Intention",
              "label": "Intention",
              "hint": "Ý định và giá trị mong muốn"
            },
            {
              "id": "Interbeing",
              "label": "Interbeing",
              "hint": "Các bên liên quan"
            },
            {
              "id": "Insight",
              "label": "Insight",
              "hint": "Bối cảnh, nguyên nhân và cơ hội"
            },
            {
              "id": "Innovation",
              "label": "Innovation",
              "hint": "Giải pháp đổi mới, sáng tạo"
            },
            {
              "id": "Integrity",
              "label": "Integrity",
              "hint": "Cam kết thống nhất"
            }
          ],
          "cards": [
            {
              "text": "Tại sao cần làm điều này và giá trị tích cực nào được tạo ra?",
              "correct": "Intention",
              "why": "Intention xác định mục tiêu và giá trị mong muốn."
            },
            {
              "text": "Ai cần tham gia để mục tiêu thành công; ai chịu tác động?",
              "correct": "Interbeing",
              "why": "Interbeing giúp nhận diện các bên liên quan."
            },
            {
              "text": "Vấn đề thật sự là gì và vì sao nó tồn tại?",
              "correct": "Insight",
              "why": "Insight làm rõ vấn đề, bối cảnh, nguyên nhân và cơ hội."
            },
            {
              "text": "Có cách nào làm tốt hơn, tạo ý tưởng đột phá?",
              "correct": "Innovation",
              "why": "Innovation tìm giải pháp đổi mới và khả thi."
            },
            {
              "text": "Các bên có thống nhất mục tiêu, giải pháp và cam kết nguồn lực?",
              "correct": "Integrity",
              "why": "Integrity là cam kết thống nhất để tiến hành."
            }
          ],
          "instruction": "Đặt 5 câu hỏi trong tài liệu vào đúng nhánh 5I để nhìn trọn bức tranh WHY.",
          "source": "IPAM Way Framework v1.1"
        },
        {
          "type": "sort",
          "title": "Shapeup TAC — điều cần đổi, cải tiến, giữ lại",
          "zones": [
            {
              "id": "Transform",
              "label": "Transform",
              "hint": "Nội dung cần chuyển hóa hoặc thay đổi"
            },
            {
              "id": "Amplify",
              "label": "Amplify",
              "hint": "Nội dung cần khuếch đại, cải tiến"
            },
            {
              "id": "Continue",
              "label": "Continue",
              "hint": "Nội dung cần duy trì, phát huy"
            }
          ],
          "cards": [
            {
              "text": "Thay đổi hoàn toàn quy trình xử lý hiện không phù hợp.",
              "correct": "Transform",
              "why": "Transform xác định yếu tố cần thay đổi, chuyển hóa."
            },
            {
              "text": "Cải thiện cách chia sẻ tài liệu để hiệu quả hơn.",
              "correct": "Amplify",
              "why": "Amplify hướng đến cải tiến và khuếch đại điểm có giá trị."
            },
            {
              "text": "Tiếp tục duy trì hoạt động đã mang lại hiệu quả.",
              "correct": "Continue",
              "why": "Continue hướng đến duy trì và phát huy điều đang tốt."
            }
          ],
          "instruction": "Tình huống ứng dụng minh họa. Phân nhóm hành động TAC theo định nghĩa trong tài liệu.",
          "source": "IPAM Way Framework v1.1"
        }
      ],
      "summary": "Identify sử dụng 5I để hiểu đúng WHY và TAC Shapeup để thống nhất điều cần Transform, Amplify, Continue.",
      "sourcePages": "IPAM Way Framework v1.1 · trang 2–3; IPAM Work · sơ đồ Identify",
      "learning": {
        "prompt": "WHY — Điều gì xứng đáng theo đuổi và các bên đã hiểu/đồng thuận chưa?",
        "model": "5I → TAC Shapeup",
        "why": "Nhận diện bản chất mục tiêu, vấn đề, bên liên quan và giải pháp trước khi bắt tay vào task.",
        "example": "Ví dụ minh họa: muốn tăng chia sẻ kiến thức nội bộ, nhóm cần biết vì sao chia sẻ còn thấp, ai ảnh hưởng, giải pháp mới nào khả thi và cần cam kết gì.",
        "sections": [
          [
            "5I",
            "Intention: ý định và giá trị; Interbeing: các bên liên quan; Insight: vấn đề/bối cảnh; Innovation: đổi mới; Integrity: cam kết chung."
          ],
          [
            "TAC Shapeup",
            "Transform: thay đổi/chuyển hóa; Amplify: khuếch đại/cải tiến; Continue: duy trì/phát huy."
          ]
        ],
        "outputs": "Tuyên bố ý định, các bên liên quan, phân tích vấn đề, giải pháp khả thi và cam kết; các yếu tố cần chuyển hóa/cải tiến/duy trì."
      }
    },
    {
      "id": "plan",
      "num": "2.2",
      "label": "CASE 2 · PLAN",
      "title": "Plan — Chuyển WHY thành WHAT & HOW",
      "intro": "Sau khi nhận diện mục tiêu, Plan chuyển WHY thành WHAT & HOW. Tài liệu sử dụng 5P để lập kế hoạch và OTOOB để thống nhất kế hoạch hành động.",
      "task": "Sắp xếp câu hỏi 5P vào nhánh phù hợp và ghép đầu ra kế hoạch với OTOOB.",
      "root": "P · Plan",
      "narrator": "Bình: “Map kế hoạch không chỉ có task; cần mục đích, lộ trình, góc nhìn, ưu tiên và tác động.”",
      "type": "multi-stage",
      "stages": [
        {
          "type": "sort",
          "title": "Lập kế hoạch theo 5P",
          "zones": [
            {
              "id": "Purpose",
              "label": "Purpose",
              "hint": "Mục đích trung và dài hạn"
            },
            {
              "id": "Pathway",
              "label": "Pathway",
              "hint": "Lộ trình, giai đoạn, dấu mốc"
            },
            {
              "id": "Perspective",
              "label": "Perspective",
              "hint": "Góc nhìn, đội ngũ chung tầm nhìn"
            },
            {
              "id": "Priority",
              "label": "Priority",
              "hint": "Ưu tiên must-have và nice-to-have"
            },
            {
              "id": "Performance",
              "label": "Performance",
              "hint": "Giá trị và tác động Biz Impact"
            }
          ],
          "cards": [
            {
              "text": "Mục tiêu này phục vụ SOC/TOC nào, để làm gì?",
              "correct": "Purpose",
              "why": "Purpose xác định mục đích của kế hoạch."
            },
            {
              "text": "Chia thành giai đoạn, mốc quan trọng và hạn hoàn thành nào?",
              "correct": "Pathway",
              "why": "Pathway là lộ trình và các cột mốc."
            },
            {
              "text": "Cần những góc nhìn nào và ai là đầu mối cùng chung tầm nhìn?",
              "correct": "Perspective",
              "why": "Perspective xác định One Stakeholder Team và tầm nhìn chung."
            },
            {
              "text": "Với nguồn lực hiện có, đâu là must-have?",
              "correct": "Priority",
              "why": "Priority xác định hạng mục trọng yếu."
            },
            {
              "text": "Kết quả sẽ tạo ảnh hưởng gì cho tổ chức, khách hàng, quy trình, con người?",
              "correct": "Performance",
              "why": "Performance hướng đến tác động thực tế, có thể xem theo FCPL/4P."
            }
          ],
          "instruction": "",
          "source": "IPAM Way Framework v1.1"
        },
        {
          "type": "sort",
          "title": "Nhận diện 5 thành phần OTOOB",
          "zones": [
            {
              "id": "Objective",
              "label": "Objective",
              "hint": "Mục tiêu liên kết OC và owner"
            },
            {
              "id": "Timeframe",
              "label": "Timeframe",
              "hint": "Mốc và lịch trình thực hiện"
            },
            {
              "id": "One Stakeholder Team",
              "label": "One Stakeholder Team",
              "hint": "Đội ngũ nòng cốt chung tầm nhìn"
            },
            {
              "id": "Outputs",
              "label": "Outputs",
              "hint": "Đầu ra trọng yếu OMVP/OM"
            },
            {
              "id": "Biz Impact",
              "label": "Biz Impact",
              "hint": "Chỉ số tác động đến tổ chức"
            }
          ],
          "cards": [
            {
              "text": "OC cụ thể và người sở hữu phê duyệt.",
              "correct": "Objective",
              "why": "Objective cần rõ mục tiêu cụ thể và Owner."
            },
            {
              "text": "Các mốc thực hiện và hạn cho từng giai đoạn.",
              "correct": "Timeframe",
              "why": "Timeframe cụ thể hóa thời điểm triển khai."
            },
            {
              "text": "Các bên phối hợp, đầu mối chung tầm nhìn.",
              "correct": "One Stakeholder Team",
              "why": "One Stakeholder Team thiết lập đầy đủ thành phần nòng cốt."
            },
            {
              "text": "Sản phẩm bàn giao của chương trình hoặc nhiệm vụ.",
              "correct": "Outputs",
              "why": "Outputs là các đầu ra trọng yếu."
            },
            {
              "text": "Chỉ số giá trị đối với tổ chức theo FCPL/4P.",
              "correct": "Biz Impact",
              "why": "Biz Impact mô tả bộ chỉ số tác động."
            }
          ],
          "instruction": "Nguồn dùng tên đầy đủ “One Stakeholder Team” và “Biz Impact” theo bảng thuật ngữ của tài liệu.",
          "source": "IPAM Way Framework v1.1"
        }
      ],
      "summary": "Plan dùng 5P định hướng kế hoạch và OTOOB để hiện thực hóa thành mục tiêu, tiến độ, đội ngũ, đầu ra và tác động.",
      "sourcePages": "IPAM Way Framework v1.1 · trang 3–4; IPAM Work · nhánh Plan",
      "learning": {
        "prompt": "WHAT & HOW — Kế hoạch cụ thể là gì, nguồn lực và tác động dự kiến ra sao?",
        "model": "5P → OTOOB",
        "why": "Chuyển định hướng ở Identify thành mục tiêu và kế hoạch với đầu ra, mốc thời gian, đội ngũ cùng tác động rõ ràng.",
        "example": "Ví dụ minh họa: chương trình chia sẻ kiến thức cần mốc thử nghiệm, các bên phối hợp, hạng mục bắt buộc và giá trị đo lường đối với tổ chức.",
        "sections": [
          [
            "5P",
            "Purpose: mục đích; Pathway: lộ trình; Perspective: nhóm góc nhìn/tầm nhìn; Priority: ưu tiên; Performance: tác động thực tế."
          ],
          [
            "OTOOB",
            "Objective, Timeframe, One Stakeholder Team, Outputs, Biz Impact — khung đầu ra của kế hoạch."
          ]
        ],
        "outputs": "Kế hoạch hành động với OC và Owner, lịch trình, One Stakeholder Team, danh mục Outputs và chỉ số Biz Impact."
      }
    },
    {
      "id": "accountability",
      "num": "2.3",
      "label": "CASE 3 · ACCOUNTABILITY",
      "title": "Accountability — Rõ người, rõ quyền",
      "intro": "Accountability giúp phân định ai chịu trách nhiệm điều gì, ai thực thi, ai phê duyệt, cơ chế phối hợp và đánh giá. Tài liệu sử dụng 5A và ma trận RACI.",
      "task": "Xây mindmap 5A rồi ghép đúng các vai trò của ma trận RACI.",
      "root": "A · Accountability",
      "narrator": "An: “Chỉ giao việc thôi chưa đủ; cần biết ai trực tiếp làm, ai chịu trách nhiệm cuối cùng và ai ra quyết định.”",
      "type": "multi-stage",
      "stages": [
        {
          "type": "sort",
          "title": "Sơ đồ 5A — từ liên kết mục tiêu đến đánh giá",
          "zones": [
            {
              "id": "Align",
              "label": "Align",
              "hint": "Kết nối mục tiêu với OC cấp trên"
            },
            {
              "id": "Assign",
              "label": "Assign",
              "hint": "Phân bổ đội ngũ làm việc tối thiểu"
            },
            {
              "id": "Authority",
              "label": "Authority",
              "hint": "Quyền ra quyết định, phê duyệt"
            },
            {
              "id": "Act",
              "label": "Act",
              "hint": "Thực thi và check-in tiến độ"
            },
            {
              "id": "Assess",
              "label": "Assess",
              "hint": "Đánh giá, học hỏi và điều chỉnh"
            }
          ],
          "cards": [
            {
              "text": "OMVP có liên kết đến OC cấp trên nào, có xung đột không?",
              "correct": "Align",
              "why": "Align kết nối OMVP với các OC liên quan."
            },
            {
              "text": "Ai Accountable, ai trực tiếp Responsible?",
              "correct": "Assign",
              "why": "Assign xác lập đội ngũ tối thiểu theo phân công."
            },
            {
              "text": "Ai có thẩm quyền phê duyệt từng output?",
              "correct": "Authority",
              "why": "Authority làm rõ phân quyền ra quyết định, phê duyệt."
            },
            {
              "text": "Đầu ra hoàn thành là gì, check-in định kỳ như thế nào?",
              "correct": "Act",
              "why": "Act chuyển kế hoạch thành hành động và tiến độ."
            },
            {
              "text": "Kết quả có đáp ứng Biz Impact, điều gì cần điều chỉnh?",
              "correct": "Assess",
              "why": "Assess đánh giá kết quả và học hỏi cho chu kỳ tiếp theo."
            }
          ],
          "instruction": "",
          "source": "IPAM Way Framework v1.1"
        },
        {
          "type": "sort",
          "title": "Phân quyền rõ bằng RACI",
          "zones": [
            {
              "id": "Responsible",
              "label": "Responsible",
              "hint": "Trực tiếp thực hiện; có thể nhiều người"
            },
            {
              "id": "Accountable",
              "label": "Accountable",
              "hint": "Chịu trách nhiệm cuối cùng; một người"
            },
            {
              "id": "Consulted",
              "label": "Consulted",
              "hint": "Được tham vấn chuyên môn; có thể nhiều người"
            },
            {
              "id": "Informed",
              "label": "Informed",
              "hint": "Được cập nhật thông tin; có thể nhiều người"
            }
          ],
          "cards": [
            {
              "text": "Người trực tiếp làm công việc và tạo ra sản phẩm.",
              "correct": "Responsible",
              "why": "Responsible là người thực thi."
            },
            {
              "text": "Người chịu trách nhiệm cuối cùng, phê duyệt kết quả.",
              "correct": "Accountable",
              "why": "Tài liệu nhấn mạnh chỉ một Accountable cho một kết quả."
            },
            {
              "text": "Người có chuyên môn cần được hỏi ý kiến.",
              "correct": "Consulted",
              "why": "Consulted cung cấp ý kiến tham vấn."
            },
            {
              "text": "Người cần biết tình hình, tiến độ hoặc kết quả.",
              "correct": "Informed",
              "why": "Informed được cập nhật thông tin."
            }
          ],
          "instruction": "RACI là phân quyền trách nhiệm, không nên đồng nhất Responsible và Accountable.",
          "source": "IPAM Way Framework v1.1"
        }
      ],
      "summary": "Accountability kết hợp 5A để kiểm soát thực thi và RACI để phân quyền; Authority xác định ai có quyền phê duyệt.",
      "sourcePages": "IPAM Way Framework v1.1 · trang 4–6; IPAM Work · nhánh Accountability",
      "learning": {
        "prompt": "WHO — Ai làm, ai chịu trách nhiệm cuối cùng, ai có quyền duyệt?",
        "model": "5A + RACI",
        "why": "Biến kế hoạch thành cam kết thực thi có người, vai trò, quyền hạn, điểm kiểm tra và đánh giá.",
        "example": "Ví dụ minh họa: có người soạn tài liệu, một người phê duyệt kết quả, các chuyên gia được hỏi ý kiến và người nhận được cập nhật.",
        "sections": [
          [
            "5A",
            "Align: liên kết mục tiêu; Assign: phân công; Authority: thẩm quyền; Act: thực thi; Assess: đánh giá."
          ],
          [
            "RACI",
            "Responsible: trực tiếp làm; Accountable: chịu trách nhiệm cuối cùng (một người); Consulted: tham vấn; Informed: được thông báo."
          ],
          [
            "MCV",
            "Make – Check – Validate: bảng phân vai thực hiện, kiểm tra, xác thực được tài liệu dùng khi phân quyền/phê duyệt."
          ]
        ],
        "outputs": "Bản đồ liên kết OC–OMVP–OM, ma trận RACI, bảng MCV, checklist hành động và báo cáo kết quả."
      }
    },
    {
      "id": "management",
      "num": "2.4",
      "label": "CASE 4 · MANAGEMENT",
      "title": "Management — Theo dõi và cải tiến",
      "intro": "Management không chỉ theo dõi tiến độ mà còn giám sát, điều chỉnh, tối ưu và chuyển bài học vào chu kỳ Identify tiếp theo.",
      "task": "Tổ chức mindmap 5M, rồi kết nối từng câu hỏi quản lý với loại đầu ra cần thiết.",
      "root": "M · Management",
      "narrator": "Bình: “Một vòng quản trị không kết thúc ở báo cáo; kết quả cần trở thành học hỏi và cải tiến cho lần tiếp theo.”",
      "type": "multi-stage",
      "stages": [
        {
          "type": "sort",
          "title": "Nhìn toàn diện 5M",
          "zones": [
            {
              "id": "Map",
              "label": "Map",
              "hint": "Liên kết OC, OMVP, OM với chiến lược"
            },
            {
              "id": "Mobilize",
              "label": "Mobilize",
              "hint": "Nguồn lực: người, thời gian, công cụ, ngân sách"
            },
            {
              "id": "Monitor",
              "label": "Monitor",
              "hint": "Theo dõi tiến độ, milestone, kết quả"
            },
            {
              "id": "Maneuver",
              "label": "Maneuver",
              "hint": "Điều chỉnh khi có thay đổi"
            },
            {
              "id": "Maximize",
              "label": "Maximize",
              "hint": "Tối ưu, nhân rộng bài học"
            }
          ],
          "cards": [
            {
              "text": "Nhiệm vụ này đóng góp vào OC cấp trên nào?",
              "correct": "Map",
              "why": "Map là bản đồ liên kết các cấp mục tiêu."
            },
            {
              "text": "Nguồn lực nào cần, ai bảo đảm chúng sẵn sàng?",
              "correct": "Mobilize",
              "why": "Mobilize chuẩn bị và phân bổ nguồn lực."
            },
            {
              "text": "Đo lường tiến độ theo tuần hay mốc như thế nào?",
              "correct": "Monitor",
              "why": "Monitor theo dõi tiến độ, kết quả thực thi."
            },
            {
              "text": "Khi kế hoạch thay đổi, cần điều chỉnh phạm vi, nguồn lực với ai?",
              "correct": "Maneuver",
              "why": "Maneuver là điều chỉnh để thích ứng."
            },
            {
              "text": "Từ kết quả vừa đạt được, điều gì nên tối ưu hoặc nhân rộng?",
              "correct": "Maximize",
              "why": "Maximize tối ưu và phát huy bài học."
            }
          ],
          "instruction": "",
          "source": "IPAM Way Framework v1.1"
        },
        {
          "type": "sort",
          "title": "Liên kết 5M với đầu ra quản trị",
          "zones": [
            {
              "id": "Map",
              "label": "Map",
              "hint": "Bản đồ liên kết mục tiêu"
            },
            {
              "id": "Mobilize",
              "label": "Mobilize",
              "hint": "Kế hoạch nguồn lực"
            },
            {
              "id": "Monitor",
              "label": "Monitor",
              "hint": "Dashboard và check-in report"
            },
            {
              "id": "Maneuver",
              "label": "Maneuver",
              "hint": "Bản điều chỉnh hoặc OTOOB cập nhật"
            },
            {
              "id": "Maximize",
              "label": "Maximize",
              "hint": "Đề xuất cải tiến, nhân rộng"
            }
          ],
          "cards": [
            {
              "text": "Bản đồ OC – OMVP – OM.",
              "correct": "Map",
              "why": "Là đầu ra bản đồ liên kết hệ thống mục tiêu."
            },
            {
              "text": "Kế hoạch phân bổ nguồn lực.",
              "correct": "Mobilize",
              "why": "Là đầu ra của việc huy động và phân bổ."
            },
            {
              "text": "Dashboard và báo cáo check-in.",
              "correct": "Monitor",
              "why": "Cung cấp bằng chứng tiến độ, kết quả."
            },
            {
              "text": "Bản cập nhật phạm vi hoặc kế hoạch OTOOB.",
              "correct": "Maneuver",
              "why": "Phản ánh điều chỉnh khi tình huống thay đổi."
            },
            {
              "text": "Báo cáo đề xuất cải tiến hệ thống.",
              "correct": "Maximize",
              "why": "Phản ánh tổng kết, tối ưu và nhân rộng."
            }
          ],
          "instruction": "",
          "source": "IPAM Way Framework v1.1"
        }
      ],
      "summary": "Management vận hành 5M và đưa kết quả, bài học quay lại Identify của chu kỳ quản trị tiếp theo.",
      "sourcePages": "IPAM Way Framework v1.1 · trang 6; IPAM Work · nhánh Management",
      "learning": {
        "prompt": "LEARN — Đo lường, điều chỉnh và cải tiến trong chu kỳ tiếp theo thế nào?",
        "model": "5M → tiếp tục Identify",
        "why": "Bảo đảm chúng ta đi đúng hướng, nguồn lực sẵn sàng, tiến độ minh bạch và bài học được dùng để cải tiến.",
        "example": "Ví dụ minh họa: nhóm theo dõi số buổi chia sẻ, điều chỉnh khung chương trình khi thay đổi và đề xuất nhân rộng khi thấy hiệu quả.",
        "sections": [
          [
            "5M",
            "Map: liên kết mục tiêu; Mobilize: huy động nguồn lực; Monitor: giám sát; Maneuver: điều chỉnh; Maximize: tối ưu và nhân rộng."
          ],
          [
            "Chu trình",
            "Identify → Plan → Accountability → Management → Identify ở tầng tiếp theo: các giai đoạn liên kết liên tục, không độc lập."
          ]
        ],
        "outputs": "Bản đồ OC/OMVP/OM, kế hoạch nguồn lực, dashboard/check-in, bản điều chỉnh OTOOB, đề xuất tối ưu/nhân rộng."
      }
    }
  ],
  "ipamSource": {
    "primary": "TÀI LIỆU HƯỚNG DẪN IPAM WAY FRAMEWORK – MÔ HÌNH TƯ DUY QUẢN TRỊ MỤC TIÊU, v1.1, 6 trang",
    "diagram": "IPAM Work (1 trang)",
    "caveat": "Các thẻ tình huống ứng dụng là ví dụ học tập minh họa. Tên mô hình và giải thích theo tài liệu nguồn; không thay thế văn bản quản trị chính thức."
  }
};
