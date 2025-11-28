export const vi = {
  common: {
    appName: 'tarotpedia',
    tagline: 'khi tarot gặp gỡ AI',
  },
  header: {
    title: 'tarotpedia',
    subtitle: '',
  },
  footer: {
    about: {
      title: 'Về tarotpedia',
      description:
        'Kết hợp trí tuệ tarot cổ đại với công nghệ AI hiện đại để cung cấp những lời giải đáp sâu sắc và hướng dẫn cho các câu hỏi trong cuộc sống của bạn.',
    },
    resources: {
      title: 'Tài liệu',
      tarotGuide: 'Hiểu Về Lá Bài Tarot',
      numerology: 'Cơ Bản Thần Số Học',
      reading: 'Trải Bài Tại Đây',
    },
    connect: {
      title: 'Kết Nối',
      feedback: 'Có góp ý cho chúng mình? Hãy tạo Issue nhé!',
    },
    copyright: '© 2025 tarotpedia. Bảo lưu mọi quyền.',
    madeWith: 'Web dựng bằng',
    forSeekers: 'dành cho những người cũng tin vào vũ trụ',
  },
  form: {
    title: 'Đặt câu hỏi cho trải bài Tarot',
    name: {
      label: 'Tên Của Bạn',
      placeholder: 'Nhập tên của bạn',
    },
    dob: {
      label: 'Ngày Sinh',
      placeholder: 'Chọn ngày sinh của bạn',
    },
    question: {
      label: 'Câu Hỏi/Vấn Đề Của Bạn',
      placeholder:
        'Hãy mô tả vấn đề của bạn cho trải bài. Càng chi tiết, trải bài càng liên hệ được vũ trụ với vấn đề của bạn.',
      hint: 'Vũ trụ huyền bí không hiểu những vấn đề ngắn gọn. Vui lòng mô tả rõ ràng hơn.',
    },
    button: 'Trải Bài',
    validation: {
      fillAll: 'Vui lòng điền đầy đủ thông tin',
      questionTooShort: 'Vui lòng cung cấp thêm chi tiết về câu hỏi của bạn',
    },
    progress: {
      shuffling: 'Đang xáo bài...',
      deckReady: 'Bộ bài đã sẵn sàng! Chọn 3 lá bài...',
    },
    error: {
      drawCards: 'Không thể rút bài. Vui lòng thử lại.',
    },
  },
  deck: {
    title: 'Chọn Ba Lá Bài Của Bạn',
    selected: 'lá bài đã chọn',
    instruction: 'Nhấp vào một lá bài để chọn. Lá bài sẽ tự hiện ra khi được chọn.',
    back: '← Quay Lại',
    reading: 'Xem Bói',
  },
  reading: {
    progress: {
      shuffling: 'Đang xáo bài...',
      analyzing: 'Đang phân tích các lá bài của bạn...',
      interpreting: 'Đang giải mã bài bói...',
      complete: 'Hoàn tất xem bói!',
    },
  },
  numerology: {
    title: 'Hướng Dẫn Thần Số Học',
    subtitle:
      'Khám phá khoa học cổ đại về con số và ý nghĩa huyền bí của chúng. Tính toán các con số cá nhân của bạn và hiểu ý nghĩa của chúng trong hành trình cuộc sống.',
    calculator: {
      title: 'Tính Toán Các Con Số Của Bạn',
      fullName: 'Họ và Tên Đầy Đủ (theo giấy khai sinh)',
      fullNamePlaceholder: 'Nguyễn Văn A',
      dateOfBirth: 'Ngày Sinh',
      calculateButton: 'Tính Toán Tất Cả Các Số',
      lifePath: 'Số Đường Đời',
      expression: 'Số Biểu Đạt',
    },
    whatIs: {
      title: 'Thần Số Học Là Gì?',
      paragraph1:
        'Thần số học là một khoa học siêu hình cổ đại nghiên cứu mối quan hệ huyền bí giữa các con số và các sự kiện trong cuộc sống của chúng ta. Có nguồn gốc từ các nền văn minh cổ đại bao gồm Babylon, Ai Cập và Hy Lạp, thần số học dạy rằng các con số mang tần số rung động ảnh hưởng đến tính cách, con đường sống và số phận của chúng ta.',
      paragraph2:
        'Hệ thống được sử dụng rộng rãi nhất hiện nay là hệ thống Pythagoras, được đặt theo tên của nhà toán học Hy Lạp Pythagoras, người tin rằng vũ trụ có tính chính xác về mặt toán học và các con số là những khối xây dựng của thực tại.',
    },
    lifePath: {
      title: 'Số Đường Đời',
      description:
        'Số Đường Đời của bạn là con số quan trọng nhất trong thần số học. Nó đại diện cho mục đích cuộc sống, tài năng tự nhiên và con đường mà bạn được định sẵn để đi.',
      howToCalculate: 'Cách Tính:',
      step1: 'Rút gọn từng phần của ngày sinh (ngày, tháng, năm) thành một chữ số',
      step2: 'Cộng ba số này lại với nhau',
      step3: 'Rút gọn tổng thành một chữ số (ngoại trừ 11, 22, 33 - đây là Số Chủ)',
      exampleTitle: 'Ví dụ: 16 tháng 7, 1990',
      exampleMonth: 'Tháng: 7 → 7',
      exampleDay: 'Ngày: 16 → 1 + 6 = 7',
      exampleYear: 'Năm: 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1',
      exampleResult: 'Số Đường Đời: 7 + 7 + 1 = 15 → 1 + 5 = 6',
    },
    expression: {
      title: 'Số Biểu Đạt (Số Định Mệnh)',
      description:
        'Số Biểu Đạt của bạn tiết lộ khả năng tự nhiên, tài năng và tiềm năng của bạn. Nó được tính từ tên khai sinh đầy đủ của bạn và cho thấy những gì bạn được định sẵn để thể hiện trong kiếp này.',
      howToCalculate: 'Cách Tính:',
      step1: 'Sử dụng tên đầy đủ của bạn như được viết trên giấy khai sinh',
      step2: 'Chuyển đổi mỗi chữ cái thành số tương ứng (A=1, B=2, C=3... I=9, J=1, v.v.)',
      step3: 'Cộng tất cả các số lại với nhau và rút gọn thành một chữ số',
      chartTitle: 'Bảng Chữ Cái-Số (Pythagoras):',
      exampleTitle: 'Ví dụ: JOHN',
      exampleCalculation: 'J=1, O=6, H=8, N=5',
      exampleResult: '1 + 6 + 8 + 5 = 20 → 2 + 0 = 2',
    },
    masterNumbers: {
      title: 'Số Chủ: 11, 22, 33',
      description:
        'Số Chủ là các số có hai chữ số không được rút gọn thành một chữ số. Chúng mang rung động mạnh mẽ và chỉ ra những cá nhân có tiềm năng cao và ý nghĩa tâm linh.',
      number11: 'Người Chiếu Sáng - Trực giác tâm linh và giác ngộ',
      number22: 'Người Xây Dựng Bậc Thầy - Biến giấc mơ thành hiện thực',
      number33: 'Người Thầy Bậc Thầy - Lòng trắc ẩn và hướng dẫn tâm linh',
    },
    learnMore: {
      title: 'Tìm Hiểu Thêm',
      description:
        'Bây giờ bạn đã tính toán các con số cốt lõi của mình, hãy khám phá ý nghĩa chi tiết của chúng và cách chúng tương tác với nhau. Mỗi con số mang năng lượng và bài học độc đáo cho hành trình cuộc sống của bạn.',
      numberMeanings: 'Ý Nghĩa Các Số (1-9)',
      numberMeaningsDesc: 'Khám phá các giải thích chi tiết của từng số đơn',
      masterNumbersGuide: 'Hướng Dẫn Số Chủ',
      masterNumbersGuideDesc: 'Tìm hiểu sâu về rung động mạnh mẽ của 11, 22 và 33',
      personalYear: 'Chu Kỳ Năm Cá Nhân',
      personalYearDesc: 'Hiểu chu kỳ thần số học 9 năm và vị trí hiện tại của bạn',
      numerologyDotCom: 'Numerology.com',
      numerologyDotComDesc: 'Tài nguyên và công cụ toàn diện để hiểu sâu hơn về thần số học',
    },
  },
} as const;
