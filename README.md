# Trần Thế Khôi — Portfolio Cá Nhân

Website portfolio cá nhân của Trần Thế Khôi, xây dựng bằng Next.js 16, React 19 và Tailwind CSS 4.

## Tổng quan

Portfolio giới thiệu hồ sơ chuyên môn trong lĩnh vực AI, tập trung vào Computer Vision và LLM. Website hỗ trợ **hai ngôn ngữ** (Tiếng Việt / English) và tích hợp **chatbot AI** được hỗ trợ bởi Gemini 2.5 Flash.

## Các phần nội dung

- **About** — Giới thiệu bản thân và nền tảng học vấn
- **Skills** — Kỹ năng kỹ thuật: Python, PyTorch, LangChain, OpenCV, v.v.
- **Projects** — Các dự án AI cá nhân và học thuật
- **Education** — Cử nhân Khoa học Máy tính, IUH (2021–2025); nghiên cứu tốt nghiệp được đăng báo tại SSRC
- **Experience** — Kinh nghiệm thực tế (Data Annotator tại Alchera Vietnam)

## Cấu trúc dự án

```
.
├── app/
│   ├── layout.tsx          # Root layout, font, metadata
│   ├── page.tsx            # Entry point
│   ├── globals.css         # Global styles (Tailwind)
│   └── api/
│       └── chat/
│           └── route.ts    # API route chatbot (Gemini 2.5 Flash)
├── components/
│   ├── Portfolio.tsx        # Component chính, quản lý locale
│   ├── Chatbot.tsx          # Chatbot nổi tích hợp AI
│   ├── sections/
│   │   ├── AboutSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── SkillsSection.tsx
│   └── ui/
│       ├── NavHeader.tsx    # Thanh điều hướng + chuyển ngôn ngữ
│       └── SectionTitle.tsx
├── data/
│   ├── portfolio-content.json  # Toàn bộ nội dung (EN + VI)
│   └── locales.ts              # Types và export locale
└── public/
```

## Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Next.js | 16.2.1 | Framework (App Router) |
| React | 19.2.4 | UI |
| Tailwind CSS | 4.2.2 | Styling |
| TypeScript | 6.0.2 | Type safety |
| Gemini 2.5 Flash | — | Chatbot AI backend |

## Deploy

Website được deploy trên **Vercel**: [khoi-tran-portfolio.vercel.app](https://khoi-tran-portfolio.vercel.app)

## Liên hệ

- Email: tranthekhoi2003@gmail.com
- GitHub: [khoithetran](https://github.com/khoithetran)
