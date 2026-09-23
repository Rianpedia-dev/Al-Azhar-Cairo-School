# 📘 Product Requirements Document (PRD)

## Al-Azhar Cairo — School Management System

| Field              | Detail                                       |
| ------------------ | -------------------------------------------- |
| **Nama Produk**    | Al-Azhar Cairo School Management System      |
| **Versi Dokumen**  | 1.0.0                                        |
| **Tanggal**        | 22 September 2026                            |
| **Status**         | Draft                                        |
| **Penulis**        | Tim Pengembang Al-Azhar Cairo                |
| **Jenjang**        | SD (Sekolah Dasar) & SMP (Sekolah Menengah Pertama) |

---

## 1. Ringkasan Eksekutif

Al-Azhar Cairo School Management System adalah aplikasi web berbasis **Next.js** yang dirancang untuk mendigitalisasi proses akademik di lingkungan **SD dan SMP Al-Azhar Cairo**. Aplikasi ini mencakup manajemen prestasi siswa, komunikasi guru-siswa melalui fitur chat real-time, pengelolaan mata pelajaran berdasarkan kelas, serta sistem pengunggahan dan koreksi tugas secara digital.

Tujuan utama adalah menyediakan platform terpadu yang memudahkan guru dalam memberikan materi dan penilaian, siswa dalam mengakses tugas dan melihat prestasi, serta admin dalam mengelola data akademik secara menyeluruh.

---

## 2. Latar Belakang & Masalah

### 2.1 Kondisi Saat Ini
- Pencatatan prestasi siswa masih dilakukan secara manual (buku rapor fisik / spreadsheet).
- Komunikasi guru dan siswa terbatas pada jam sekolah atau melalui platform yang tidak terintegrasi (WhatsApp, dll).
- Pembagian dan pengumpulan tugas dilakukan secara fisik atau melalui berbagai platform yang tidak saling terhubung.
- Koreksi tugas memakan waktu karena harus dilakukan secara manual di atas kertas.

### 2.2 Masalah yang Ingin Diselesaikan
1. **Fragmentasi data**: Data prestasi, tugas, dan komunikasi tersebar di berbagai tempat.
2. **Inefisiensi waktu**: Guru menghabiskan waktu ekstra untuk mengumpulkan dan mengoreksi tugas fisik.
3. **Kurangnya transparansi**: Siswa sulit memonitor perkembangan akademik secara real-time.
4. **Komunikasi terbatas**: Tidak ada kanal komunikasi formal dan terdokumentasi antara guru dan siswa.

### 2.3 Tujuan Produk
- Menyediakan **satu platform terpusat** untuk seluruh aktivitas akademik.
- Meningkatkan efisiensi guru dalam memberikan, menerima, dan mengoreksi tugas.
- Memberikan siswa akses transparan terhadap nilai, prestasi, dan materi pelajaran.
- Membangun jalur komunikasi terstruktur antara guru dan siswa.

---

## 3. Tech Stack

| Layer             | Teknologi                | Versi     | Keterangan                                        |
| ----------------- | ------------------------ | --------- | ------------------------------------------------- |
| **Framework**     | Next.js (App Router)     | Latest    | Full-stack React framework dengan SSR & RSC       |
| **Styling**       | Tailwind CSS             | Latest    | Utility-first CSS framework                       |
| **UI Components** | shadcn/ui                | Latest    | Reusable, accessible component library            |
| **Database**      | MySQL                    | 8.x       | Relational database utama                         |
| **ORM**           | Prisma                   | Latest    | Type-safe ORM untuk MySQL                         |
| **Authentication**| Better Auth              | Latest    | Authentication library modern untuk Next.js       |
| **File Storage**  | Local Storage / S3       | -         | Penyimpanan file tugas (PDF, gambar)              |
| **Real-time**     | Socket.io / Pusher       | Latest    | Real-time chat functionality                      |
| **Language**      | TypeScript               | Latest    | Type-safe JavaScript                              |
| **Package Manager**| npm                     | Latest    | Fast, disk space efficient package manager        |

---

## 4. Arsitektur Sistem

### 4.1 Arsitektur Tingkat Tinggi

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                  │
│  ┌───────────────────────────────────────────────┐   │
│  │         Next.js App (React + TypeScript)      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │ shadcn/ui│ │Tailwind  │ │ Socket.io    │   │   │
│  │  │Components│ │  CSS     │ │ Client       │  │   │
│  │  └──────────┘ └──────────┘ └──────────────┘  │   │
│  └───────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS / WSS
┌─────────────────────────┴───────────────────────────┐
│                 SERVER (Next.js API)                │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐  │
│  │ API Routes   │ │ Better Auth  │ │ Socket.io   │  │
│  │ (App Router) │ │ (Auth)       │ │ Server      │  │
│  └──────┬───────┘ └──────────────┘ └─────────────┘  │
│         │                                           │
│  ┌──────┴───────┐ ┌──────────────┐                  │
│  │ Prisma ORM   │ │ File Upload  │                  │
│  │              │ │ Service      │                  │
│  └──────┬───────┘ └──────┬───────┘                  │
└─────────┼────────────────┼──────────────────────────┘
          │                │
┌─────────┴────────┐ ┌────┴──────────────┐
│     MySQL 8.x    │ │  File Storage     │
│   (Database)     │ │  (Local/S3)       │
└──────────────────┘ └───────────────────┘
```

### 4.2 Struktur Folder Proyek

```
project-apps/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seeder
│   └── migrations/            # Migration files
├── public/
│   ├── uploads/               # Uploaded files (tugas, etc.)
│   └── assets/                # Static assets (logo, icons)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── kelas/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── mata-pelajaran/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── prestasi/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── laporan/
│   │   │   │       └── page.tsx
│   │   │   ├── guru/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── kelas-saya/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── tugas/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── buat/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── koreksi/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── prestasi/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── chat/
│   │   │   │       └── page.tsx
│   │   │   ├── siswa/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── tugas/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── prestasi/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── mata-pelajaran/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── chat/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...all]/
│   │   │   │       └── route.ts
│   │   │   ├── users/
│   │   │   │   └── route.ts
│   │   │   ├── kelas/
│   │   │   │   └── route.ts
│   │   │   ├── mata-pelajaran/
│   │   │   │   └── route.ts
│   │   │   ├── tugas/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── upload/
│   │   │   │       └── route.ts
│   │   │   ├── prestasi/
│   │   │   │   └── route.ts
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── breadcrumb.tsx
│   │   ├── dashboard/
│   │   │   ├── stat-card.tsx
│   │   │   └── chart-widget.tsx
│   │   ├── tugas/
│   │   │   ├── tugas-card.tsx
│   │   │   ├── tugas-form.tsx
│   │   │   ├── upload-form.tsx
│   │   │   └── koreksi-viewer.tsx
│   │   ├── chat/
│   │   │   ├── chat-window.tsx
│   │   │   ├── message-bubble.tsx
│   │   │   └── contact-list.tsx
│   │   └── prestasi/
│   │       ├── prestasi-table.tsx
│   │       └── prestasi-badge.tsx
│   ├── lib/
│   │   ├── auth.ts             # Better Auth configuration
│   │   ├── auth-client.ts      # Better Auth client
│   │   ├── db.ts               # Prisma client instance
│   │   ├── upload.ts           # File upload utilities
│   │   ├── socket.ts           # Socket.io configuration
│   │   ├── utils.ts            # General utilities
│   │   └── validators/
│   │       ├── tugas.ts
│   │       ├── prestasi.ts
│   │       └── user.ts
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-chat.ts
│   │   └── use-upload.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── tugas.ts
│   │   ├── chat.ts
│   │   └── prestasi.ts
│   └── middleware.ts           # Auth & role-based middleware
├── .env
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── prd.md                      # Dokumen ini
```

---

## 5. Database Schema

### 5.1 Entity Relationship Diagram (ERD)

```
┌──────────────────┐       ┌──────────────────────┐
│      User        │       │     Jenjang           │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │       │ id (PK)              │
│ name             │       │ nama (SD/SMP)        │
│ email            │       │ createdAt            │
│ password (hash)  │       │ updatedAt            │
│ role (enum)      │       └──────────┬───────────┘
│ avatar           │                  │
│ jenjang_id (FK)  │──────────────────┘
│ kelas_id (FK)    │──────────────────┐
│ nomorInduk       │                  │
│ isActive         │       ┌──────────┴───────────┐
│ createdAt        │       │       Kelas          │
│ updatedAt        │       ├──────────────────────┤
└──────┬───────────┘       │ id (PK)              │
       │                   │ nama                 │
       │                   │ tingkat (1-9)        │
       │                   │ jenjang_id (FK)      │
       │                   │ waliKelas_id (FK)    │
       │                   │ tahunAjaran          │
       │                   │ createdAt            │
       │                   │ updatedAt            │
       │                   └──────────────────────┘
       │
       │          ┌──────────────────────┐
       │          │   MataPelajaran      │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ nama                 │
       │          │ kode                 │
       │          │ deskripsi            │
       │          │ jenjang_id (FK)      │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────┬───────────┘
       │                     │
       │          ┌──────────┴───────────┐
       │          │ MataPelajaranKelas   │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ mataPelajaran_id (FK)│
       │          │ kelas_id (FK)        │
       │          │ guru_id (FK)         │
       │          │ jadwal (JSON)        │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────────────────┘
       │
       │          ┌──────────────────────┐
       ├──────────│       Tugas          │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ judul                │
       │          │ deskripsi            │
       │          │ guru_id (FK)         │
       │          │ mataPelajaranKelas_id │
       │          │ jenisTugas (enum)    │
       │          │ deadline             │
       │          │ lampiran (JSON)      │
       │          │ status (enum)        │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────┬───────────┘
       │                     │
       │          ┌──────────┴───────────┐
       │          │  PengumpulanTugas    │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ tugas_id (FK)        │
       │          │ siswa_id (FK)        │
       │          │ files (JSON)         │
       │          │ catatan              │
       │          │ nilai                │
       │          │ komentar             │
       │          │ statusKoreksi (enum) │
       │          │ tanggalKumpul        │
       │          │ tanggalKoreksi       │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────────────────┘
       │
       │          ┌──────────────────────┐
       ├──────────│     Prestasi         │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ siswa_id (FK)        │
       │          │ judul                │
       │          │ deskripsi            │
       │          │ kategori (enum)      │
       │          │ tingkat (enum)       │
       │          │ peringkat            │
       │          │ tanggal              │
       │          │ bukti (JSON)         │
       │          │ diinputOleh (FK)     │
       │          │ isVerified           │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────────────────┘
       │
       │          ┌──────────────────────┐
       ├──────────│   ChatRoom           │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ type (enum)          │
       │          │ createdAt            │
       │          │ updatedAt            │
       │          └──────────┬───────────┘
       │                     │
       │          ┌──────────┴───────────┐
       │          │  ChatRoomMember      │
       │          ├──────────────────────┤
       │          │ id (PK)              │
       │          │ chatRoom_id (FK)     │
       │          │ user_id (FK)         │
       │          │ joinedAt             │
       │          └──────────────────────┘
       │                     │
       │          ┌──────────┴───────────┐
       └──────────│     Message          │
                  ├──────────────────────┤
                  │ id (PK)              │
                  │ chatRoom_id (FK)     │
                  │ sender_id (FK)       │
                  │ content              │
                  │ type (enum)          │
                  │ attachments (JSON)   │
                  │ isRead               │
                  │ readAt               │
                  │ createdAt            │
                  │ updatedAt            │
                  └──────────────────────┘
```

### 5.2 Prisma Schema Detail

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum UserRole {
  ADMIN
  GURU
  SISWA
}

enum JenjangType {
  SD
  SMP
}

enum TugasStatus {
  DRAFT
  PUBLISHED
  CLOSED
}

enum JenisTugas {
  ESSAY
  PILIHAN_GANDA
  UPLOAD_FILE
  PROYEK
}

enum StatusKoreksi {
  BELUM_DIKUMPULKAN
  DIKUMPULKAN
  SEDANG_DIKOREKSI
  SUDAH_DINILAI
  REVISI
}

enum KategoriPrestasi {
  AKADEMIK
  NON_AKADEMIK
  OLAHRAGA
  SENI
  KEAGAMAAN
  LAINNYA
}

enum TingkatPrestasi {
  SEKOLAH
  KECAMATAN
  KOTA
  PROVINSI
  NASIONAL
  INTERNASIONAL
}

enum ChatRoomType {
  PRIVATE
  GROUP
}

enum MessageType {
  TEXT
  IMAGE
  FILE
  SYSTEM
}

// ============================================
// MODELS
// ============================================

model User {
  id          String    @id @default(cuid())
  name        String
  email       String    @unique
  password    String
  role        UserRole
  avatar      String?
  nomorInduk  String?   @unique  // NIS untuk siswa, NIP untuk guru
  phone       String?
  alamat      String?   @db.Text
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  jenjangId   String?
  jenjang     Jenjang?  @relation(fields: [jenjangId], references: [id])
  kelasId     String?
  kelas       Kelas?    @relation("SiswaKelas", fields: [kelasId], references: [id])

  // Guru Relations
  kelasWali       Kelas[]              @relation("WaliKelas")
  mataPelajaran   MataPelajaranKelas[] @relation("GuruMapel")
  tugasDibuat     Tugas[]              @relation("GuruTugas")

  // Siswa Relations
  pengumpulanTugas PengumpulanTugas[]  @relation("SiswaPengumpulan")
  prestasi         Prestasi[]          @relation("SiswaPrestasi")

  // Prestasi Input
  prestasiInput   Prestasi[]           @relation("InputPrestasi")

  // Chat Relations
  chatRooms       ChatRoomMember[]
  messages        Message[]            @relation("SenderMessage")

  // Better Auth Relations
  sessions        Session[]
  accounts        Account[]

  @@index([role])
  @@index([jenjangId])
  @@index([kelasId])
  @@map("users")
}

model Session {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token       String   @unique
  expiresAt   DateTime
  ipAddress   String?
  userAgent   String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("sessions")
}

model Account {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  accountId         String
  providerId        String
  accessToken       String?  @db.Text
  refreshToken      String?  @db.Text
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope             String?
  idToken           String?  @db.Text
  password          String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@map("accounts")
}

model Verification {
  id          String   @id @default(cuid())
  identifier  String
  value       String   @db.Text
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("verifications")
}

model Jenjang {
  id        String      @id @default(cuid())
  nama      JenjangType @unique
  deskripsi String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  // Relations
  users          User[]
  kelas          Kelas[]
  mataPelajaran  MataPelajaran[]

  @@map("jenjang")
}

model Kelas {
  id          String   @id @default(cuid())
  nama        String               // e.g., "1A", "7B"
  tingkat     Int                   // 1-6 untuk SD, 7-9 untuk SMP
  tahunAjaran String               // e.g., "2026/2027"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  jenjangId   String
  jenjang     Jenjang  @relation(fields: [jenjangId], references: [id])
  waliKelasId String?
  waliKelas   User?    @relation("WaliKelas", fields: [waliKelasId], references: [id])

  siswa            User[]               @relation("SiswaKelas")
  mataPelajaran    MataPelajaranKelas[]

  @@unique([nama, tahunAjaran])
  @@index([jenjangId])
  @@map("kelas")
}

model MataPelajaran {
  id        String   @id @default(cuid())
  nama      String               // e.g., "Matematika", "Bahasa Indonesia"
  kode      String   @unique     // e.g., "MTK", "BIN"
  deskripsi String?  @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  jenjangId String
  jenjang   Jenjang  @relation(fields: [jenjangId], references: [id])

  kelasMapel MataPelajaranKelas[]

  @@index([jenjangId])
  @@map("mata_pelajaran")
}

model MataPelajaranKelas {
  id        String   @id @default(cuid())
  jadwal    Json?                // [{ hari: "Senin", jamMulai: "08:00", jamSelesai: "09:30" }]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  mataPelajaranId String
  mataPelajaran   MataPelajaran @relation(fields: [mataPelajaranId], references: [id])
  kelasId         String
  kelas           Kelas         @relation(fields: [kelasId], references: [id])
  guruId          String
  guru            User          @relation("GuruMapel", fields: [guruId], references: [id])

  tugas Tugas[]

  @@unique([mataPelajaranId, kelasId, guruId])
  @@index([kelasId])
  @@index([guruId])
  @@map("mata_pelajaran_kelas")
}

model Tugas {
  id        String      @id @default(cuid())
  judul     String
  deskripsi String?     @db.Text
  jenisTugas JenisTugas
  deadline  DateTime
  lampiran  Json?                // [{ nama: "soal.pdf", url: "/uploads/...", type: "pdf" }]
  status    TugasStatus @default(DRAFT)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  // Relations
  guruId              String
  guru                User               @relation("GuruTugas", fields: [guruId], references: [id])
  mataPelajaranKelasId String
  mataPelajaranKelas  MataPelajaranKelas @relation(fields: [mataPelajaranKelasId], references: [id])

  pengumpulan PengumpulanTugas[]

  @@index([guruId])
  @@index([mataPelajaranKelasId])
  @@index([deadline])
  @@index([status])
  @@map("tugas")
}

model PengumpulanTugas {
  id             String        @id @default(cuid())
  files          Json                    // [{ nama: "tugas.pdf", url: "/uploads/...", type: "pdf", size: 1024 }]
  catatan        String?       @db.Text
  nilai          Float?
  komentar       String?       @db.Text  // Komentar koreksi dari guru
  koreksiFile    Json?                   // File hasil koreksi guru (annotated PDF/image)
  statusKoreksi  StatusKoreksi @default(BELUM_DIKUMPULKAN)
  tanggalKumpul  DateTime?
  tanggalKoreksi DateTime?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  // Relations
  tugasId  String
  tugas    Tugas  @relation(fields: [tugasId], references: [id], onDelete: Cascade)
  siswaId  String
  siswa    User   @relation("SiswaPengumpulan", fields: [siswaId], references: [id])

  @@unique([tugasId, siswaId])
  @@index([statusKoreksi])
  @@map("pengumpulan_tugas")
}

model Prestasi {
  id          String            @id @default(cuid())
  judul       String
  deskripsi   String?           @db.Text
  kategori    KategoriPrestasi
  tingkat     TingkatPrestasi
  peringkat   String?                      // e.g., "Juara 1", "Medali Emas"
  tanggal     DateTime
  bukti       Json?                        // [{ nama: "sertifikat.pdf", url: "/uploads/..." }]
  isVerified  Boolean           @default(false)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  // Relations
  siswaId       String
  siswa         User   @relation("SiswaPrestasi", fields: [siswaId], references: [id])
  diinputOlehId String
  diinputOleh   User   @relation("InputPrestasi", fields: [diinputOlehId], references: [id])

  @@index([siswaId])
  @@index([kategori])
  @@index([tingkat])
  @@map("prestasi")
}

model ChatRoom {
  id        String       @id @default(cuid())
  type      ChatRoomType @default(PRIVATE)
  nama      String?                         // Nama group (untuk group chat)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt

  // Relations
  members  ChatRoomMember[]
  messages Message[]

  @@map("chat_rooms")
}

model ChatRoomMember {
  id       String   @id @default(cuid())
  joinedAt DateTime @default(now())

  // Relations
  chatRoomId String
  chatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id], onDelete: Cascade)
  userId     String
  user       User     @relation(fields: [userId], references: [id])

  @@unique([chatRoomId, userId])
  @@map("chat_room_members")
}

model Message {
  id          String      @id @default(cuid())
  content     String      @db.Text
  type        MessageType @default(TEXT)
  attachments Json?                      // [{ nama: "foto.jpg", url: "/uploads/...", type: "image" }]
  isRead      Boolean     @default(false)
  readAt      DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relations
  chatRoomId String
  chatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id], onDelete: Cascade)
  senderId   String
  sender     User     @relation("SenderMessage", fields: [senderId], references: [id])

  @@index([chatRoomId])
  @@index([senderId])
  @@index([createdAt])
  @@map("messages")
}
```

---

## 6. User Roles & Permissions

### 6.1 Role Matrix

| Fitur / Aksi                         | Admin | Guru | Siswa |
| ------------------------------------ | :---: | :--: | :---: |
| **Dashboard** |
| Lihat statistik keseluruhan          | ✅    | ❌   | ❌   |
| Lihat statistik kelas sendiri        | ❌    | ✅   | ❌   |
| Lihat statistik pribadi              | ❌    | ❌   | ✅   |
| **Manajemen User** |
| CRUD semua user                      | ✅    | ❌   | ❌   |
| Import user (bulk CSV)               | ✅    | ❌   | ❌   |
| Edit profil sendiri                  | ✅    | ✅   | ✅   |
| **Manajemen Kelas** |
| CRUD kelas                           | ✅    | ❌   | ❌   |
| Assign guru ke kelas                 | ✅    | ❌   | ❌   |
| Assign siswa ke kelas                | ✅    | ❌   | ❌   |
| Lihat kelas sendiri                  | ❌    | ✅   | ✅   |
| **Mata Pelajaran** |
| CRUD mata pelajaran                  | ✅    | ❌   | ❌   |
| Assign mapel ke kelas & guru         | ✅    | ❌   | ❌   |
| Lihat mapel sesuai kelas             | ❌    | ✅   | ✅   |
| **Tugas** |
| Buat tugas                           | ❌    | ✅   | ❌   |
| Edit/hapus tugas sendiri             | ❌    | ✅   | ❌   |
| Upload file lampiran tugas           | ❌    | ✅   | ❌    |
| Lihat daftar tugas                   | ✅    | ✅   | ✅    |
| Kumpul tugas (upload file)           | ❌    | ❌   | ✅    |
| Koreksi tugas siswa                  | ❌    | ✅   | ❌    |
| Beri nilai tugas                     | ❌    | ✅   | ❌    |
| Lihat nilai tugas sendiri            | ❌    | ❌   | ✅    |
| **Prestasi** |
| Input prestasi siswa                 | ✅    | ✅   | ❌    |
| Verifikasi prestasi                  | ✅    | ❌   | ❌    |
| Lihat prestasi semua siswa           | ✅    | ✅   | ❌    |
| Lihat prestasi sendiri               | ❌    | ❌   | ✅    |
| **Chat** |
| Chat ke siswa (kelas sendiri)        | ❌    | ✅   | ❌    |
| Chat ke guru (kelas sendiri)         | ❌    | ❌   | ✅    |
| Lihat semua chat (monitoring)        | ✅    | ❌   | ❌    |
| **Laporan** |
| Generate laporan akademik            | ✅    | ✅   | ❌    |
| Export data (PDF/Excel)              | ✅    | ✅   | ❌    |

### 6.2 Detail per Role

#### 🔴 Admin
Admin memiliki akses penuh ke seluruh sistem. Admin bertugas mengelola master data (user, kelas, mata pelajaran, jenjang) dan memonitor seluruh aktivitas di platform.

**Kapabilitas utama:**
- CRUD User (Guru & Siswa) — termasuk bulk import via CSV
- CRUD Kelas — pengaturan kelas per jenjang dan tahun ajaran
- CRUD Mata Pelajaran — penugasan guru ke kelas & mapel
- Verifikasi prestasi siswa
- Monitoring chat (read-only)
- Generate laporan keseluruhan
- Pengaturan sistem (tahun ajaran, semester, dll.)

#### 🟢 Guru
Guru memiliki akses ke kelas dan mata pelajaran yang diassign kepadanya. Guru dapat membuat tugas, mengoreksi hasil pekerjaan siswa, menginput prestasi, dan berkomunikasi dengan siswa.

**Kapabilitas utama:**
- Melihat dashboard kelas yang diampu
- Membuat, mengedit, dan menghapus tugas untuk kelas yang diampu
- Meng-upload lampiran tugas (soal dalam bentuk PDF/gambar)
- Mengoreksi tugas siswa secara langsung (annotasi pada file/pemberian komentar)
- Memberikan nilai pada tugas yang telah dikoreksi
- Menginput prestasi siswa
- Chat dengan siswa di kelas yang diampu
- Export laporan per kelas

#### 🔵 Siswa
Siswa memiliki akses terbatas pada data pribadi dan kelas masing-masing. Siswa dapat melihat tugas, mengumpulkan tugas, melihat nilai dan prestasi, serta berkomunikasi dengan guru.

**Kapabilitas utama:**
- Melihat dashboard pribadi (ringkasan tugas, nilai, prestasi)
- Melihat daftar mata pelajaran sesuai kelas
- Melihat dan mengunduh tugas dari guru
- Mengumpulkan tugas (upload file PDF/gambar)
- Melihat hasil koreksi dan nilai
- Melihat daftar prestasi pribadi
- Chat dengan guru kelas

---

## 7. Fitur Detail

### 7.1 🔐 Autentikasi & Otorisasi (Better Auth)

#### 7.1.1 Deskripsi
Sistem autentikasi menggunakan **Better Auth** dengan dukungan session-based authentication. Registrasi hanya dapat dilakukan oleh Admin (tidak ada self-registration untuk menjaga keamanan data sekolah).

#### 7.1.2 User Stories

| ID      | Sebagai | Saya Ingin                                    | Sehingga                                          |
| ------- | ------- | --------------------------------------------- | ------------------------------------------------- |
| AUTH-01 | Admin   | Membuat akun guru dan siswa                   | Mereka dapat login ke sistem                      |
| AUTH-02 | User    | Login dengan email dan password               | Saya dapat mengakses fitur sesuai role             |
| AUTH-03 | User    | Logout dari sistem                            | Sesi saya berakhir dengan aman                    |
| AUTH-04 | User    | Mereset password                              | Saya dapat mengakses akun jika lupa password       |
| AUTH-05 | Admin   | Menonaktifkan akun user                       | User tidak bisa login tanpa menghapus data         |
| AUTH-06 | User    | Melihat dan mengedit profil sendiri            | Data profil saya selalu up-to-date                |

#### 7.1.3 Spesifikasi Teknis

```typescript
// lib/auth.ts — Better Auth Configuration
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Akun dibuat oleh admin
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 hari
    updateAge: 60 * 60 * 24,      // Update setiap 24 jam
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "SISWA",
        input: true,
      },
      nomorInduk: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
```

#### 7.1.4 Halaman Login
- Form: Email + Password
- Validasi client-side & server-side
- Rate limiting (max 5 percobaan login gagal per 15 menit)
- Redirect otomatis berdasarkan role:
  - Admin → `/admin/dashboard`
  - Guru → `/guru/dashboard`
  - Siswa → `/siswa/dashboard`

#### 7.1.5 Middleware Proteksi Route

```typescript
// middleware.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const roleRoutes = {
  "/admin": ["ADMIN"],
  "/guru": ["ADMIN", "GURU"],
  "/siswa": ["ADMIN", "SISWA"],
};

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { pathname } = request.nextUrl;
  for (const [route, roles] of Object.entries(roleRoutes)) {
    if (pathname.startsWith(route)) {
      if (!roles.includes(session.user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/guru/:path*", "/siswa/:path*"],
};
```

---

### 7.2 📊 Dashboard

#### 7.2.1 Dashboard Admin

| Widget                      | Deskripsi                                              |
| --------------------------- | ------------------------------------------------------ |
| Total Siswa                 | Jumlah siswa aktif (SD & SMP)                          |
| Total Guru                  | Jumlah guru aktif                                      |
| Total Kelas                 | Jumlah kelas per jenjang                               |
| Grafik Prestasi             | Bar chart prestasi per kategori & bulan                |
| Tugas Terbaru               | 5 tugas terakhir yang dibuat                           |
| Aktivitas Terkini           | Log aktivitas pengguna terbaru                         |
| Statistik Pengumpulan Tugas | Persentase pengumpulan tugas tepat waktu               |

#### 7.2.2 Dashboard Guru

| Widget                      | Deskripsi                                              |
| --------------------------- | ------------------------------------------------------ |
| Kelas yang Diampu           | Daftar kelas beserta jumlah siswa                      |
| Tugas Menunggu Koreksi      | Counter tugas yang belum dikoreksi                     |
| Rata-rata Nilai Kelas       | Rata-rata nilai per mata pelajaran                     |
| Chat Belum Dibaca           | Jumlah pesan belum dibaca                              |
| Kalender Deadline           | Timeline deadline tugas yang akan datang               |
| Statistik Pengumpulan       | Grafik pie pengumpulan tugas per kelas                 |

#### 7.2.3 Dashboard Siswa

| Widget                      | Deskripsi                                              |
| --------------------------- | ------------------------------------------------------ |
| Tugas Mendatang             | Daftar tugas dengan deadline terdekat                  |
| Tugas Belum Dikumpulkan     | Counter tugas yang belum dikumpulkan                   |
| Nilai Terakhir              | 5 nilai terakhir yang diterima                         |
| Prestasi Saya               | Badge/card prestasi terbaru                            |
| Jadwal Hari Ini             | Jadwal mata pelajaran hari ini                         |
| Ringkasan Nilai             | Radar chart nilai per mata pelajaran                   |

---

### 7.3 🏆 Prestasi Siswa

#### 7.3.1 Deskripsi
Fitur untuk mencatat, mengelola, dan menampilkan prestasi siswa baik akademik maupun non-akademik. Prestasi dapat diinput oleh Admin atau Guru, dan harus diverifikasi oleh Admin sebelum ditampilkan secara resmi.

#### 7.3.2 User Stories

| ID       | Sebagai | Saya Ingin                                      | Sehingga                                            |
| -------- | ------- | ----------------------------------------------- | --------------------------------------------------- |
| PRES-01  | Admin   | Menginput prestasi siswa                        | Data prestasi tercatat dalam sistem                 |
| PRES-02  | Guru    | Menginput prestasi siswa di kelas saya          | Pencapaian siswa terdokumentasi                     |
| PRES-03  | Admin   | Memverifikasi prestasi yang diinput guru        | Hanya prestasi valid yang ditampilkan               |
| PRES-04  | Siswa   | Melihat daftar prestasi saya                   | Saya bisa memantau pencapaian saya                  |
| PRES-05  | Admin   | Melihat semua prestasi per jenjang/kelas        | Saya bisa membuat laporan prestasi                  |
| PRES-06  | Guru    | Meng-upload bukti prestasi (sertifikat/foto)    | Ada dokumentasi resmi atas prestasi                 |
| PRES-07  | Admin   | Meng-export data prestasi ke PDF/Excel          | Data bisa dicetak dan diarsipkan                    |

#### 7.3.3 Kategori Prestasi
- **Akademik**: Olimpiade sains, lomba matematika, karya ilmiah, dll.
- **Non-Akademik**: Kepemimpinan, kegiatan sosial, dll.
- **Olahraga**: Kompetisi olahraga (sepak bola, bulu tangkis, dll.)
- **Seni**: Lomba menggambar, menyanyi, menari, dll.
- **Keagamaan**: Tahfidz, MTQ, lomba adzan, kaligrafi, dll.
- **Lainnya**: Prestasi lain yang tidak termasuk kategori di atas.

#### 7.3.4 Tingkat Prestasi
Sekolah → Kecamatan → Kota/Kabupaten → Provinsi → Nasional → Internasional

#### 7.3.5 Alur Kerja Prestasi

```
Guru/Admin Input Prestasi
        │
        ▼
   [Upload Bukti]  ←── Sertifikat, foto, dokumen
        │
        ▼
  Status: Pending Verification
        │
        ▼
  Admin Verifikasi
   ┌────┴────┐
   ▼         ▼
Verified   Rejected (dengan alasan)
   │
   ▼
Tampil di Dashboard & Profil Siswa
```

---

### 7.4 💬 Chat Guru — Siswa

#### 7.4.1 Deskripsi
Fitur chat real-time yang memungkinkan guru berkomunikasi langsung dengan siswa di kelas yang diampunya. Mendukung pengiriman teks, gambar, dan file. Admin dapat memonitor percakapan untuk pengawasan.

#### 7.4.2 User Stories

| ID       | Sebagai | Saya Ingin                                      | Sehingga                                            |
| -------- | ------- | ----------------------------------------------- | --------------------------------------------------- |
| CHAT-01  | Guru    | Mengirim pesan teks ke siswa                    | Saya bisa berkomunikasi tentang pelajaran           |
| CHAT-02  | Siswa   | Mengirim pesan teks ke guru                     | Saya bisa bertanya tentang materi/tugas             |
| CHAT-03  | Guru    | Mengirim file/gambar via chat                   | Saya bisa berbagi materi tambahan                   |
| CHAT-04  | User    | Melihat status pesan (terkirim/terbaca)         | Saya tahu apakah pesan sudah dibaca                 |
| CHAT-05  | User    | Menerima notifikasi pesan baru                  | Saya tidak ketinggalan pesan penting                |
| CHAT-06  | Guru    | Membuat group chat per kelas                    | Saya bisa mengirim pengumuman ke seluruh kelas      |
| CHAT-07  | Admin   | Memonitor percakapan (read-only)                | Saya bisa mengawasi komunikasi untuk keamanan       |
| CHAT-08  | User    | Mencari pesan lama                              | Saya bisa menemukan informasi dari percakapan lama  |

#### 7.4.3 Spesifikasi Teknis Chat

**Arsitektur Real-time:**
```
Client A (Guru)                              Client B (Siswa)
     │                                             │
     │  emit("send_message", data)                 │
     ▼                                             │
┌─────────────────────────────┐                    │
│      Socket.io Server       │                    │
│  ┌───────────────────────┐  │                    │
│  │  Authenticate User    │  │                    │
│  │  Validate ChatRoom    │  │                    │
│  │  Save to MySQL        │  │                    │
│  │  Broadcast to Room    │──┼────────────────────▶
│  └───────────────────────┘  │    emit("new_message", data)
└─────────────────────────────┘
```

**Fitur Chat:**
- Private chat (1-on-1): Guru ↔ Siswa
- Group chat: Guru → Seluruh siswa di kelas
- Kirim teks, gambar (JPEG/PNG, max 5MB), file (PDF, max 10MB)
- Indikator pesan terbaca (read receipt)
- Notifikasi pesan baru (in-app notification)
- Riwayat percakapan (infinite scroll / pagination)
- Pencarian pesan

#### 7.4.4 Batasan Chat
- Siswa **hanya** bisa chat dengan guru yang mengajar di kelasnya
- Guru **hanya** bisa chat dengan siswa di kelas yang diampunya
- Admin bisa melihat semua percakapan (read-only, tidak bisa mengirim)
- Tidak ada chat antar siswa (untuk menjaga fokus akademik)
- File attachment dibatasi ukuran dan tipe

---

### 7.5 📚 Mata Pelajaran

#### 7.5.1 Deskripsi
Pengelolaan mata pelajaran yang disesuaikan berdasarkan jenjang (SD/SMP) dan kelas. Setiap mata pelajaran diassign ke guru pengampu dan kelas tertentu, dilengkapi dengan jadwal pelajaran.

#### 7.5.2 User Stories

| ID       | Sebagai | Saya Ingin                                       | Sehingga                                           |
| -------- | ------- | ------------------------------------------------ | -------------------------------------------------- |
| MAPEL-01 | Admin   | Membuat mata pelajaran baru                      | Mapel tersedia di sistem                           |
| MAPEL-02 | Admin   | Meng-assign guru ke mapel di kelas tertentu      | Guru tahu kelas & mapel yang diampu                |
| MAPEL-03 | Admin   | Mengatur jadwal mapel per kelas                  | Jadwal terorganisir dan tidak bentrok              |
| MAPEL-04 | Siswa   | Melihat daftar mapel sesuai kelas saya           | Saya tahu mapel yang harus dipelajari              |
| MAPEL-05 | Siswa   | Melihat jadwal pelajaran hari ini/minggu ini     | Saya bisa mempersiapkan diri                       |
| MAPEL-06 | Guru    | Melihat daftar kelas & mapel yang saya ampu      | Saya tahu jadwal mengajar saya                     |

#### 7.5.3 Daftar Mata Pelajaran Default

**SD (Kelas 1–6):**

| No | Mata Pelajaran                          | Kode   |
| -- | --------------------------------------- | ------ |
| 1  | Pendidikan Agama Islam                  | PAI    |
| 2  | Pendidikan Pancasila & Kewarganegaraan  | PPKn   |
| 3  | Bahasa Indonesia                        | BIN    |
| 4  | Matematika                              | MTK    |
| 5  | Ilmu Pengetahuan Alam (IPA)             | IPA    |
| 6  | Ilmu Pengetahuan Sosial (IPS)           | IPS    |
| 7  | Seni Budaya & Prakarya                  | SBdP   |
| 8  | Pendidikan Jasmani, Olahraga & Kesehatan| PJOK   |
| 9  | Bahasa Inggris                          | BING   |
| 10 | Bahasa Arab                             | BA     |
| 11 | Tahfidz Quran                           | TQ     |

**SMP (Kelas 7–9):**

| No | Mata Pelajaran                          | Kode   |
| -- | --------------------------------------- | ------ |
| 1  | Pendidikan Agama Islam                  | PAI    |
| 2  | Pendidikan Pancasila & Kewarganegaraan  | PPKn   |
| 3  | Bahasa Indonesia                        | BIN    |
| 4  | Matematika                              | MTK    |
| 5  | Ilmu Pengetahuan Alam (IPA)             | IPA    |
| 6  | Ilmu Pengetahuan Sosial (IPS)           | IPS    |
| 7  | Bahasa Inggris                          | BING   |
| 8  | Bahasa Arab                             | BA     |
| 9  | Seni Budaya                             | SB     |
| 10 | Pendidikan Jasmani, Olahraga & Kesehatan| PJOK   |
| 11 | Prakarya & Kewirausahaan                | PKK    |
| 12 | Tahfidz Quran                           | TQ     |
| 13 | Informatika                             | INF    |

---

### 7.6 📝 Upload File Tugas & Koreksi

#### 7.6.1 Deskripsi
Sistem pengelolaan tugas end-to-end: guru membuat tugas dengan lampiran, siswa mengumpulkan jawaban (upload file), dan guru dapat langsung mengoreksi serta memberi nilai melalui platform. Mendukung format PDF dan gambar.

#### 7.6.2 User Stories

| ID       | Sebagai | Saya Ingin                                       | Sehingga                                            |
| -------- | ------- | ------------------------------------------------ | --------------------------------------------------- |
| TGS-01   | Guru    | Membuat tugas baru dengan lampiran soal          | Siswa bisa mengakses soal secara digital             |
| TGS-02   | Guru    | Meng-upload soal dalam format PDF/gambar         | Soal bisa dilihat langsung di browser                |
| TGS-03   | Guru    | Menetapkan deadline tugas                        | Siswa tahu batas waktu pengumpulan                   |
| TGS-04   | Guru    | Mempublikasikan tugas ke kelas tertentu          | Hanya siswa di kelas tersebut yang melihat tugas     |
| TGS-05   | Siswa   | Melihat daftar tugas per mata pelajaran          | Saya tahu tugas apa saja yang harus dikerjakan       |
| TGS-06   | Siswa   | Mengunduh lampiran soal                          | Saya bisa mengerjakan soal secara offline             |
| TGS-07   | Siswa   | Meng-upload jawaban (PDF/gambar)                 | Tugas saya terkumpul secara digital                  |
| TGS-08   | Siswa   | Melihat status pengumpulan tugas saya            | Saya tahu apakah tugas sudah dikumpulkan             |
| TGS-09   | Guru    | Melihat daftar siswa yang sudah/belum mengumpulkan | Saya bisa memantau pengumpulan tugas              |
| TGS-10   | Guru    | Membuka dan melihat file jawaban siswa           | Saya bisa mengoreksi langsung di platform            |
| TGS-11   | Guru    | Memberikan anotasi/coretan pada file jawaban     | Koreksi tervisualisasi langsung di dokumen           |
| TGS-12   | Guru    | Memberikan nilai dan komentar                    | Siswa mendapat feedback atas pekerjaannya            |
| TGS-13   | Siswa   | Melihat hasil koreksi, nilai, dan komentar guru  | Saya bisa belajar dari kesalahan                     |
| TGS-14   | Guru    | Meminta siswa merevisi tugas                     | Siswa bisa memperbaiki dan mengumpulkan ulang        |
| TGS-15   | Siswa   | Mengumpulkan ulang tugas yang perlu revisi       | Tugas revisi saya ter-update di sistem               |

#### 7.6.3 Alur Kerja Tugas

```
     ┌──────────────────────────────────────────────────┐
     │                  GURU                             │
     │                                                   │
     │  1. Buat Tugas ──► Isi Detail ──► Upload Soal     │
     │       │              (judul, deskripsi,            │
     │       │               deadline, mapel)             │
     │       ▼                                           │
     │  2. Publish Tugas ──► Notifikasi ke Siswa          │
     └──────────────┬────────────────────────────────────┘
                    │
     ┌──────────────▼────────────────────────────────────┐
     │                  SISWA                             │
     │                                                   │
     │  3. Lihat Tugas ──► Download Soal                  │
     │       │                                           │
     │       ▼                                           │
     │  4. Kerjakan ──► Upload Jawaban (PDF/IMG)          │
     │       │          (multi-file, max 10MB/file)       │
     │       │          (max 5 files per tugas)           │
     │       ▼                                           │
     │  5. Status: DIKUMPULKAN                            │
     └──────────────┬────────────────────────────────────┘
                    │
     ┌──────────────▼────────────────────────────────────┐
     │                  GURU                             │
     │                                                   │
     │  6. Buka File Jawaban Siswa                        │
     │       │                                           │
     │       ▼                                           │
     │  7. Koreksi Langsung:                              │
     │       ├── Annotation pada PDF/gambar               │
     │       ├── Highlight teks                           │
     │       ├── Tambah komentar                          │
     │       └── Drawing/coretan                          │
     │       │                                           │
     │       ▼                                           │
     │  8. Beri Nilai (0-100) + Komentar Keseluruhan      │
     │       │                                           │
     │       ├──► Status: SUDAH_DINILAI ──► Notif Siswa   │
     │       │                                           │
     │       └──► Status: REVISI ──► Siswa upload ulang   │
     └──────────────────────────────────────────────────┘
```

#### 7.6.4 Spesifikasi Upload File

| Parameter            | Nilai                                     |
| -------------------- | ----------------------------------------- |
| **Format yang didukung** | PDF, JPEG, JPG, PNG, WEBP              |
| **Ukuran max per file**  | 10 MB                                  |
| **Jumlah max file per tugas (guru)**  | 10 file              |
| **Jumlah max file per pengumpulan (siswa)** | 5 file          |
| **Penamaan file**    | `{userId}_{tugasId}_{timestamp}.{ext}`    |
| **Penyimpanan**      | `/public/uploads/{tahunAjaran}/{kelasId}/` |
| **Thumbnail**        | Auto-generate untuk gambar                |

#### 7.6.5 Fitur Koreksi Online

Guru dapat mengoreksi tugas siswa langsung di browser menggunakan fitur berikut:

1. **PDF Viewer & Annotator**
   - Tampilkan PDF dalam browser (menggunakan `react-pdf` atau `pdf.js`)
   - Tambahkan anotasi: highlight, underline, strikethrough
   - Tambahkan komentar pada bagian tertentu
   - Tambahkan gambar/drawing overlay (freehand drawing)
   - Simpan hasil koreksi sebagai file baru

2. **Image Viewer & Annotator**
   - Tampilkan gambar jawaban siswa
   - Zoom in/out
   - Tambahkan coretan/marking (canvas drawing)
   - Tambahkan text annotation
   - Simpan hasil koreksi

3. **Panel Penilaian**
   - Input nilai numerik (0-100)
   - Textarea untuk komentar/feedback keseluruhan
   - Tombol "Sudah Dinilai" atau "Perlu Revisi"
   - Tombol "Simpan Draft" (jika ingin dilanjutkan nanti)

---

## 8. API Endpoints

### 8.1 Authentication

| Method | Endpoint                     | Deskripsi                    | Role       |
| ------ | ---------------------------- | ---------------------------- | ---------- |
| POST   | `/api/auth/sign-up`          | Register user (oleh admin)   | Admin      |
| POST   | `/api/auth/sign-in`          | Login                        | All        |
| POST   | `/api/auth/sign-out`         | Logout                       | All        |
| GET    | `/api/auth/session`          | Get current session          | All        |
| POST   | `/api/auth/forget-password`  | Request reset password       | All        |
| POST   | `/api/auth/reset-password`   | Reset password               | All        |

### 8.2 Users

| Method | Endpoint                     | Deskripsi                    | Role       |
| ------ | ---------------------------- | ---------------------------- | ---------- |
| GET    | `/api/users`                 | List all users (paginasi)    | Admin      |
| GET    | `/api/users/:id`             | Get user detail              | Admin      |
| PUT    | `/api/users/:id`             | Update user                  | Admin,Self |
| DELETE | `/api/users/:id`             | Delete user                  | Admin      |
| POST   | `/api/users/import`          | Bulk import users via CSV    | Admin      |
| PATCH  | `/api/users/:id/status`      | Activate/deactivate user     | Admin      |

### 8.3 Kelas

| Method | Endpoint                     | Deskripsi                    | Role       |
| ------ | ---------------------------- | ---------------------------- | ---------- |
| GET    | `/api/kelas`                 | List all kelas               | Admin      |
| POST   | `/api/kelas`                 | Create kelas                 | Admin      |
| GET    | `/api/kelas/:id`             | Get kelas detail + siswa     | Admin,Guru |
| PUT    | `/api/kelas/:id`             | Update kelas                 | Admin      |
| DELETE | `/api/kelas/:id`             | Delete kelas                 | Admin      |
| POST   | `/api/kelas/:id/siswa`       | Assign siswa ke kelas        | Admin      |
| DELETE | `/api/kelas/:id/siswa/:sid`  | Remove siswa dari kelas      | Admin      |

### 8.4 Mata Pelajaran

| Method | Endpoint                           | Deskripsi                        | Role       |
| ------ | ---------------------------------- | -------------------------------- | ---------- |
| GET    | `/api/mata-pelajaran`              | List all mata pelajaran          | Admin      |
| POST   | `/api/mata-pelajaran`              | Create mata pelajaran            | Admin      |
| GET    | `/api/mata-pelajaran/:id`          | Get detail mata pelajaran        | All        |
| PUT    | `/api/mata-pelajaran/:id`          | Update mata pelajaran            | Admin      |
| DELETE | `/api/mata-pelajaran/:id`          | Delete mata pelajaran            | Admin      |
| POST   | `/api/mata-pelajaran-kelas`        | Assign mapel ke kelas + guru     | Admin      |
| GET    | `/api/mata-pelajaran-kelas/kelas/:kelasId` | Get mapel per kelas      | All        |
| GET    | `/api/mata-pelajaran-kelas/guru/:guruId`   | Get mapel per guru       | Guru       |

### 8.5 Tugas

| Method | Endpoint                           | Deskripsi                        | Role       |
| ------ | ---------------------------------- | -------------------------------- | ---------- |
| GET    | `/api/tugas`                       | List tugas (filter by kelas/mapel)| All       |
| POST   | `/api/tugas`                       | Create tugas baru                | Guru       |
| GET    | `/api/tugas/:id`                   | Get detail tugas                 | All        |
| PUT    | `/api/tugas/:id`                   | Update tugas                     | Guru       |
| DELETE | `/api/tugas/:id`                   | Delete tugas                     | Guru       |
| PATCH  | `/api/tugas/:id/status`            | Update status (publish/close)    | Guru       |
| POST   | `/api/tugas/:id/upload`            | Upload lampiran soal             | Guru       |

### 8.6 Pengumpulan Tugas

| Method | Endpoint                                    | Deskripsi                        | Role       |
| ------ | ------------------------------------------- | -------------------------------- | ---------- |
| GET    | `/api/tugas/:id/pengumpulan`                | List pengumpulan per tugas       | Guru       |
| POST   | `/api/tugas/:id/pengumpulan`                | Submit tugas (siswa upload)      | Siswa      |
| GET    | `/api/tugas/:id/pengumpulan/:pid`           | Get detail pengumpulan           | Guru,Siswa |
| PUT    | `/api/tugas/:id/pengumpulan/:pid/koreksi`   | Koreksi & beri nilai             | Guru       |
| PATCH  | `/api/tugas/:id/pengumpulan/:pid/revisi`    | Minta revisi                     | Guru       |
| PUT    | `/api/tugas/:id/pengumpulan/:pid/resubmit`  | Upload ulang (revisi siswa)      | Siswa      |

### 8.7 Prestasi

| Method | Endpoint                           | Deskripsi                        | Role       |
| ------ | ---------------------------------- | -------------------------------- | ---------- |
| GET    | `/api/prestasi`                    | List prestasi (filter)           | All        |
| POST   | `/api/prestasi`                    | Create prestasi                  | Admin,Guru |
| GET    | `/api/prestasi/:id`                | Get detail prestasi              | All        |
| PUT    | `/api/prestasi/:id`                | Update prestasi                  | Admin,Guru |
| DELETE | `/api/prestasi/:id`                | Delete prestasi                  | Admin      |
| PATCH  | `/api/prestasi/:id/verify`         | Verify prestasi                  | Admin      |
| GET    | `/api/prestasi/siswa/:siswaId`     | Get prestasi per siswa           | All        |

### 8.8 Chat

| Method | Endpoint                           | Deskripsi                        | Role       |
| ------ | ---------------------------------- | -------------------------------- | ---------- |
| GET    | `/api/chat/rooms`                  | List chat rooms user             | All        |
| POST   | `/api/chat/rooms`                  | Create chat room                 | Guru       |
| GET    | `/api/chat/rooms/:id`              | Get room detail                  | Members    |
| GET    | `/api/chat/rooms/:id/messages`     | Get messages (pagination)        | Members    |
| POST   | `/api/chat/rooms/:id/messages`     | Send message (REST fallback)     | Members    |
| PATCH  | `/api/chat/rooms/:id/read`         | Mark messages as read            | Members    |
| GET    | `/api/chat/rooms/:id/search`       | Search messages                  | Members    |

### 8.9 Upload

| Method | Endpoint                           | Deskripsi                        | Role       |
| ------ | ---------------------------------- | -------------------------------- | ---------- |
| POST   | `/api/upload`                      | Upload single file               | All        |
| POST   | `/api/upload/multiple`             | Upload multiple files            | All        |
| DELETE | `/api/upload/:filename`            | Delete uploaded file             | Owner      |

---

## 9. UI/UX Design

### 9.1 Design System

#### 9.1.1 Filosofi Desain — Kid-Friendly & Engaging

Karena pengguna utama adalah siswa SD dan SMP (usia 6–15 tahun), desain harus:

| Prinsip                    | Implementasi                                                                |
| -------------------------- | --------------------------------------------------------------------------- |
| **Warna-warni & Ceria**    | Gunakan palet warna-warni logo Al-Azhar Cairo (biru, cyan, merah, kuning, hijau, ungu) secara konsisten di seluruh UI |
| **Ikon & Ilustrasi**       | Setiap menu dan fitur menggunakan emoji/ikon berwarna agar mudah dikenali   |
| **Font Mudah Dibaca**      | `Inter` (sans-serif) dengan ukuran minimum 14px untuk body text              |
| **Spasi Longgar**          | Padding dan gap yang cukup agar tampilan tidak sesak                         |
| **Micro-Animations**       | Hover effects, transisi halus, dan animasi ringan (bounce, fade) untuk interaktivitas |
| **Gamifikasi Ringan**      | Badge prestasi berwarna, progress bar tugas, ikon bintang untuk nilai        |
| **Navigasi Sederhana**     | Sidebar dengan ikon besar + label teks, breadcrumb yang jelas                |
| **Feedback Visual**        | Toast notification berwarna, loading skeleton, state kosong dengan ilustrasi |
| **Touch-Friendly**         | Tombol minimum 44×44px, jarak antar elemen klik minimal 8px                  |
| **Dark Mode**              | Mode gelap yang nyaman di mata dengan warna aksen terang (Cyan & Yellow)     |

#### 9.1.2 Color Palette — Al-Azhar Cairo Official

**🌞 Light Mode:**

| Token                  | Hex Code    | Keterangan                           |
| ---------------------- | ----------- | ------------------------------------ |
| `--primary`            | `#27348B`   | Al-Azhar Dark Blue — warna utama     |
| `--primary-foreground`  | `#ffffff`   | Teks di atas primary                 |
| `--accent`             | `#00AEEF`   | Al-Azhar Cyan — aksen utama          |
| `--accent-foreground`   | `#ffffff`   | Teks di atas accent                  |
| `--destructive`        | `#E1251B`   | Al-Azhar Red — error/hapus           |
| `--background`         | `#ffffff`   | Background utama                     |
| `--foreground`         | `#1e293b`   | Teks utama                           |
| `--card`               | `#ffffff`   | Background kartu                     |
| `--secondary`          | `#f1f5f9`   | Background sekunder                  |
| `--muted`              | `#f8fafc`   | Background muted                     |
| `--muted-foreground`   | `#64748b`   | Teks muted                           |
| `--border`             | `#e2e8f0`   | Warna border                         |
| `--ring`               | `#27348B`   | Focus ring                           |

**🌙 Dark Mode:**

| Token                  | Hex Code    | Keterangan                           |
| ---------------------- | ----------- | ------------------------------------ |
| `--primary`            | `#00AEEF`   | Cyan lebih kontras di gelap          |
| `--accent`             | `#FDB913`   | Al-Azhar Yellow sebagai aksen        |
| `--background`         | `#0f172a`   | Background gelap                     |
| `--foreground`         | `#f8fafc`   | Teks terang                          |
| `--card`               | `#1e293b`   | Background kartu gelap               |
| `--secondary`          | `#334155`   | Background sekunder gelap            |
| `--muted`              | `#1e293b`   | Background muted gelap               |
| `--border`             | `#334155`   | Border gelap                         |
| `--ring`               | `#00AEEF`   | Focus ring cyan                      |

**🎨 Chart / Grafik Colors (warna-warni logo):**

| Token         | Light Mode  | Dark Mode   | Warna    |
| ------------- | ----------- | ----------- | -------- |
| `--chart-1`   | `#00AEEF`   | `#00AEEF`   | Cyan     |
| `--chart-2`   | `#E1251B`   | `#ff4b40`   | Red      |
| `--chart-3`   | `#FDB913`   | `#FDB913`   | Yellow   |
| `--chart-4`   | `#008C45`   | `#00b85a`   | Green    |
| `--chart-5`   | `#662D91`   | `#F37021`   | Purple / Orange |

**🗂️ Sidebar Colors:**

| Token                          | Light       | Dark        |
| ------------------------------ | ----------- | ----------- |
| `--sidebar`                    | `#ffffff`   | `#0f172a`   |
| `--sidebar-foreground`         | `#1e293b`   | `#f8fafc`   |
| `--sidebar-primary`            | `#27348B`   | `#00AEEF`   |
| `--sidebar-primary-foreground` | `#ffffff`   | `#ffffff`   |
| `--sidebar-accent`             | `#f1f5f9`   | `#1e293b`   |
| `--sidebar-accent-foreground`  | `#27348B`   | `#f8fafc`   |
| `--sidebar-border`             | `#e2e8f0`   | `#334155`   |
| `--sidebar-ring`               | `#27348B`   | `#00AEEF`   |

#### 9.1.3 CSS Variables (globals.css)

```css
:root {
  --background: #ffffff;
  --foreground: #1e293b;
  --card: #ffffff;
  --card-foreground: #1e293b;
  --popover: #ffffff;
  --popover-foreground: #1e293b;
  --primary: #27348B; /* Al-Azhar Dark Blue */
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #334155;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --accent: #00AEEF; /* Al-Azhar Cyan */
  --accent-foreground: #ffffff;
  --destructive: #E1251B; /* Al-Azhar Red */
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #27348B;
  
  /* Kombinasi Warna-warni Logo untuk Grafik/Chart */
  --chart-1: #00AEEF; /* Cyan */
  --chart-2: #E1251B; /* Red */
  --chart-3: #FDB913; /* Yellow */
  --chart-4: #008C45; /* Green */
  --chart-5: #662D91; /* Purple */
  
  --radius: 0.5rem;
  --sidebar: #ffffff;
  --sidebar-foreground: #1e293b;
  --sidebar-primary: #27348B;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f1f5f9;
  --sidebar-accent-foreground: #27348B;
  --sidebar-border: #e2e8f0;
  --sidebar-ring: #27348B;
  --font-sans: Inter, sans-serif;
  --font-serif: Source Serif 4, serif;
  --font-mono: JetBrains Mono, monospace;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  --popover: #1e293b;
  --popover-foreground: #f8fafc;
  --primary: #00AEEF; /* Cyan lebih kontras di mode gelap */
  --primary-foreground: #ffffff;
  --secondary: #334155;
  --secondary-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #FDB913; /* Al-Azhar Yellow sebagai aksen */
  --accent-foreground: #0f172a;
  --destructive: #E1251B;
  --destructive-foreground: #ffffff;
  --border: #334155;
  --input: #334155;
  --ring: #00AEEF;
  
  /* Chart di mode gelap diseimbangkan kontrasnya */
  --chart-1: #00AEEF; /* Cyan */
  --chart-2: #ff4b40; /* Lighter Red */
  --chart-3: #FDB913; /* Yellow */
  --chart-4: #00b85a; /* Lighter Green */
  --chart-5: #F37021; /* Orange (menggantikan ungu agar lebih jelas) */
  
  --radius: 0.5rem;
  --sidebar: #0f172a;
  --sidebar-foreground: #f8fafc;
  --sidebar-primary: #00AEEF;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #1e293b;
  --sidebar-accent-foreground: #f8fafc;
  --sidebar-border: #334155;
  --sidebar-ring: #00AEEF;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-radius: var(--radius);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-font-sans: var(--font-sans);
  --color-font-serif: var(--font-serif);
  --color-font-mono: var(--font-mono);
}
```

#### 9.1.4 Typography

| Elemen            | Font Family                    | Size    | Weight | Keterangan                         |
| ----------------- | ------------------------------ | ------- | ------ | ---------------------------------- |
| Heading (H1)      | `Inter`                        | 28–32px | 700    | Judul halaman utama                |
| Heading (H2)      | `Inter`                        | 22–24px | 600    | Sub-judul section                  |
| Heading (H3)      | `Inter`                        | 18–20px | 600    | Sub-sub judul                      |
| Body              | `Inter`                        | 14–16px | 400    | Teks paragraf utama                |
| Small / Caption   | `Inter`                        | 12–13px | 400    | Label, keterangan kecil            |
| Code / Mono       | `JetBrains Mono`               | 13–14px | 400    | Kode, nomor induk                  |
| Serif (dekoratif) | `Source Serif 4`               | varies  | varies | Quotes, elemen dekoratif           |
| Arabic            | `Amiri`                        | 16–18px | 400    | Konten bahasa Arab & Tahfidz       |

#### 9.1.5 Spacing & Border Radius

| Elemen       | Nilai                                                |
| ------------ | ---------------------------------------------------- |
| Base unit    | `4px` (mengikuti Tailwind spacing scale)             |
| `--radius`   | `0.5rem` (8px) — default radius                      |
| Card radius  | `0.75rem` (12px) — rounded card yang ramah anak      |
| Button radius| `0.375rem` (6px) — tombol subtle rounded             |
| Avatar radius| `9999px` — full circle                               |
| Padding card | `1rem – 1.5rem` — cukup longgar untuk keterbacaan    |
| Gap grid     | `1rem – 1.5rem` — jarak antar elemen yang nyaman     |

#### 9.1.6 Elemen Visual Kid-Friendly

| Elemen                    | Implementasi                                                         |
| ------------------------- | -------------------------------------------------------------------- |
| **Emoji pada Menu**       | Setiap item sidebar diberi emoji (🏠📚📝🏆💬) agar visual & mudah dikenali |
| **Badge Warna-warni**     | Status tugas & prestasi menggunakan warna chart (cyan, red, yellow, green) |
| **Progress Bar**          | Bar tugas dengan gradient warna-warni menunjukkan progress pengumpulan |
| **Avatar Default**        | Avatar placeholder berupa inisial nama dengan background warna random dari palet chart |
| **Empty State**           | Halaman kosong menampilkan ilustrasi lucu (misal: karakter membaca buku) + teks motivasi |
| **Hover Effects**         | Scale-up ringan (1.02–1.05), shadow elevation, warna transisi halus  |
| **Loading Skeleton**      | Skeleton shimmer effect dengan animasi pulse yang smooth              |
| **Toast Notification**    | Warna sesuai status: hijau (sukses), merah (error), kuning (warning), biru (info) |
| **Stat Cards Dashboard**  | Setiap card menggunakan warna background berbeda dari palet chart    |
| **Bintang Nilai**         | Nilai ditampilkan dengan bintang ⭐ (A=5★, B=4★, dst) di samping angka |

### 9.2 Layout Utama

```
┌─────────────────────────────────────────────────────────┐
│  Header (Logo, Search, Notifications, User Avatar)      │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│          │                                              │
│ Sidebar  │              Main Content Area               │
│ (Nav     │                                              │
│  Menu)   │                                              │
│          │                                              │
│          │                                              │
│          │                                              │
├──────────┴──────────────────────────────────────────────┤
│  Footer (Copyright, Version)                            │
└─────────────────────────────────────────────────────────┘
```

### 9.3 Navigasi per Role

**Admin Sidebar:**
- 🏠 Dashboard
- 👥 Manajemen User
  - Guru
  - Siswa
  - Import Data
- 🏫 Manajemen Kelas
- 📚 Mata Pelajaran
- 🏆 Prestasi
  - Daftar Prestasi
  - Verifikasi Prestasi
- 📝 Tugas (Monitor)
- 💬 Chat (Monitor)
- 📊 Laporan
- ⚙️ Pengaturan

**Guru Sidebar:**
- 🏠 Dashboard
- 🏫 Kelas Saya
- 📚 Mata Pelajaran
- 📝 Tugas
  - Daftar Tugas
  - Buat Tugas Baru
  - Koreksi Tugas
- 🏆 Prestasi Siswa
- 💬 Chat
- 👤 Profil Saya

**Siswa Sidebar:**
- 🏠 Dashboard
- 📚 Mata Pelajaran
- 📝 Tugas
  - Daftar Tugas
  - Tugas Saya
- 🏆 Prestasi Saya
- 💬 Chat
- 👤 Profil Saya

### 9.4 Komponen UI Kunci (shadcn/ui)

| Komponen           | Penggunaan                                   |
| ------------------ | -------------------------------------------- |
| `DataTable`        | Tabel data user, tugas, prestasi (sortable, filterable, paginated) |
| `Card`             | Dashboard widgets, tugas cards                |
| `Dialog/Modal`     | Form create/edit, konfirmasi delete           |
| `Sheet`            | Panel koreksi tugas (slide-in dari kanan)     |
| `Tabs`             | Navigasi dalam halaman (e.g., per status tugas)|
| `Badge`            | Status label (tugas, koreksi, prestasi)       |
| `Avatar`           | Foto profil user                              |
| `Calendar`         | Pemilihan deadline tugas                      |
| `Command`          | Quick search (Ctrl+K)                         |
| `Toast`            | Notifikasi sukses/error                       |
| `DropdownMenu`     | Action menu di tabel                          |
| `Form`             | Semua form input (dengan validasi)            |
| `Select`           | Dropdown pilihan (kelas, mapel, kategori)     |
| `Skeleton`         | Loading state                                 |
| `Breadcrumb`       | Navigasi breadcrumb                           |
| `Separator`        | Visual separator                              |
| `ScrollArea`       | Chat window, long content                     |

---

## 10. Non-Functional Requirements

### 10.1 Performa

| Metrik                      | Target                          |
| --------------------------- | ------------------------------  |
| Time to First Byte (TTFB)   | < 200ms                         |
| Largest Contentful Paint     | < 2.5s                         |
| First Input Delay            | < 100ms                        |
| Cumulative Layout Shift      | < 0.1                          |
| API Response Time            | < 500ms (95th percentile)      |
| File Upload Speed            | Mendukung hingga 10MB tanpa timeout |
| Concurrent Users             | Minimal 200 pengguna simultan  |

### 10.2 Keamanan

| Aspek                        | Implementasi                                    |
| ---------------------------- | ----------------------------------------------- |
| Autentikasi                  | Better Auth dengan session-based auth            |
| Otorisasi                    | Role-based access control (RBAC) di middleware   |
| Password                     | Hashing dengan bcrypt/argon2 (via Better Auth)   |
| CSRF Protection              | Built-in Next.js CSRF token                      |
| XSS Prevention               | React auto-escaping + CSP headers                |
| SQL Injection                | Prisma parameterized queries                     |
| File Upload Validation       | Server-side MIME type check + file size limit     |
| Rate Limiting                | API rate limiting (max requests per minute)       |
| HTTPS                        | Wajib di production                              |
| Data Encryption              | Encryption at rest & in transit                  |

### 10.3 Skalabilitas

- Database: MySQL dengan indexing optimal
- Caching: Gunakan Next.js built-in cache + Redis (optional)
- File Storage: Scalable ke S3/MinIO jika dibutuhkan
- Horizontal scaling ready (stateless server design)

### 10.4 Responsivitas (Semua Device)

Aplikasi dirancang **mobile-first** dan dioptimasi untuk semua ukuran layar.

#### Breakpoint System (Tailwind CSS)

| Device              | Breakpoint          | Prefix  | Contoh Layar                      |
| ------------------- | ------------------- | ------- | --------------------------------- |
| Mobile Portrait     | `0px – 639px`       | default | iPhone SE, Android kecil          |
| Mobile Landscape    | `640px – 767px`     | `sm:`   | iPhone landscape, Android         |
| Tablet Portrait     | `768px – 1023px`    | `md:`   | iPad Mini, iPad Air (portrait)    |
| Tablet Landscape    | `1024px – 1279px`   | `lg:`   | iPad Pro (landscape)              |
| Laptop              | `1280px – 1535px`   | `xl:`   | MacBook Air, laptop 13–14"        |
| Desktop             | `≥ 1536px`          | `2xl:`  | Monitor 24"+, iMac                |

#### Layout Adaptasi per Device

**📱 Mobile (< 768px):**

| Komponen           | Perilaku                                                    |
| ------------------ | ----------------------------------------------------------- |
| Sidebar            | Tersembunyi, muncul sebagai **slide-over drawer** (hamburger menu) |
| Header             | Fixed top, logo kecil + hamburger + avatar + notification bell |
| Dashboard cards    | Stack vertikal (1 kolom), full-width                        |
| DataTable          | Horizontal scroll atau berubah menjadi **card list view**    |
| Chat               | Full-screen chat window, contact list jadi tab terpisah      |
| Tugas form         | Form input full-width, stacked layout                        |
| Koreksi viewer     | Full-screen modal, annotation tools di bottom toolbar        |
| Bottom nav (siswa) | Optional: fixed bottom navigation bar untuk akses cepat      |
| Font size          | Body: 14px, H1: 22px, minimum touch target: 44×44px         |
| Padding            | `px-4` (16px) horizontal padding                            |

**📟 Tablet (768px – 1023px):**

| Komponen           | Perilaku                                                    |
| ------------------ | ----------------------------------------------------------- |
| Sidebar            | **Collapsed sidebar** (ikon only, 64px width), expand on hover/click |
| Header             | Logo + search bar mini + notifications + avatar              |
| Dashboard cards    | Grid 2 kolom                                                |
| DataTable          | Tampil normal dengan horizontal scroll jika perlu            |
| Chat               | Split view: contact list (30%) + chat window (70%)           |
| Tugas form         | 2-kolom form layout untuk field pendek                       |
| Koreksi viewer     | Side-by-side: file viewer (60%) + panel penilaian (40%)      |
| Font size          | Body: 15px, H1: 26px                                        |
| Padding            | `px-6` (24px) horizontal padding                             |

**💻 Laptop (1024px – 1279px):**

| Komponen           | Perilaku                                                    |
| ------------------ | ----------------------------------------------------------- |
| Sidebar            | **Semi-expanded** (200px width), ikon + label pendek         |
| Header             | Full header: logo + search bar + breadcrumb + notif + avatar |
| Dashboard cards    | Grid 3 kolom                                                |
| DataTable          | Full table view dengan sorting, filtering, pagination        |
| Chat               | Split view: contact list (25%) + chat window (75%)           |
| Tugas form         | 2-kolom dengan sidebar preview                               |
| Koreksi viewer     | Side-by-side: file viewer (65%) + panel penilaian (35%)      |
| Font size          | Body: 15px, H1: 28px                                        |
| Padding            | `px-6` (24px) horizontal padding                             |

**🖥️ Desktop (≥ 1280px):**

| Komponen           | Perilaku                                                    |
| ------------------ | ----------------------------------------------------------- |
| Sidebar            | **Full expanded** (256px width), ikon + label lengkap        |
| Header             | Full header dengan search command palette (Ctrl+K)           |
| Dashboard cards    | Grid 4 kolom, chart widgets berdampingan                    |
| DataTable          | Full table, semua kolom terlihat, bulk actions               |
| Chat               | 3-panel: contact list + chat window + user info sidebar      |
| Tugas form         | Multi-kolom dengan live preview lampiran                     |
| Koreksi viewer     | Side-by-side optimal: file viewer (70%) + panel (30%)        |
| Font size          | Body: 16px, H1: 32px                                        |
| Max content width  | `max-w-7xl` (1280px) dengan auto margin centering            |
| Padding            | `px-8` (32px) horizontal padding                             |

#### Responsive Utilities

```css
/* Contoh responsive pattern yang digunakan */

/* Dashboard grid */
.dashboard-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6;
}

/* Sidebar */
.sidebar {
  @apply fixed inset-y-0 left-0 z-50
    w-0 md:w-16 lg:w-[200px] xl:w-64
    transition-all duration-300 ease-in-out;
}

/* Main content area */
.main-content {
  @apply ml-0 md:ml-16 lg:ml-[200px] xl:ml-64
    p-4 md:p-6 xl:p-8
    transition-all duration-300;
}

/* Card component */
.stat-card {
  @apply rounded-xl p-4 md:p-6
    hover:scale-[1.02] hover:shadow-lg
    transition-all duration-200;
}

/* Touch-friendly buttons */
.btn-touch {
  @apply min-h-[44px] min-w-[44px] px-4 py-2
    text-sm md:text-base
    rounded-md;
}
```

### 10.5 Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly (semantic HTML + ARIA labels)
- Color contrast ratio minimal 4.5:1
- Focus indicators pada semua interactive elements

---

## 11. Environment Variables

```env
# .env.example

# ============================================
# DATABASE
# ============================================
DATABASE_URL="mysql://root:password@localhost:3306/alazhar_cairo_db"

# ============================================
# BETTER AUTH
# ============================================
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# ============================================
# APP
# ============================================
NEXT_PUBLIC_APP_NAME="Al-Azhar Cairo School Management"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ============================================
# FILE UPLOAD
# ============================================
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=10485760  # 10MB in bytes

# ============================================
# REAL-TIME (Socket.io)
# ============================================
SOCKET_PORT=3001

# ============================================
# OPTIONAL: S3 STORAGE
# ============================================
# S3_ENDPOINT=
# S3_ACCESS_KEY=
# S3_SECRET_KEY=
# S3_BUCKET_NAME=
# S3_REGION=
```

---

## 12. Milestone & Timeline

### Phase 1 — Foundation (Minggu 1-2)
| Task                                    | Estimasi    |
| --------------------------------------- | ----------- |
| Setup project Next.js + Tailwind + shadcn/ui | 1 hari  |
| Setup Prisma + MySQL schema             | 2 hari      |
| Konfigurasi Better Auth                 | 2 hari      |
| Halaman login + middleware auth         | 2 hari      |
| Layout dashboard (sidebar, header)      | 2 hari      |
| Database seeder (data awal)             | 1 hari      |

### Phase 2 — Master Data & Admin Panel (Minggu 3-4)
| Task                                    | Estimasi    |
| --------------------------------------- | ----------- |
| CRUD User (Admin)                       | 3 hari      |
| Bulk import user via CSV                | 1 hari      |
| CRUD Kelas + assign siswa               | 2 hari      |
| CRUD Mata Pelajaran + assign ke kelas   | 2 hari      |
| Dashboard Admin (widgets + charts)      | 2 hari      |

### Phase 3 — Tugas & Koreksi (Minggu 5-7)
| Task                                    | Estimasi    |
| --------------------------------------- | ----------- |
| CRUD Tugas (Guru)                       | 3 hari      |
| Upload file soal tugas                  | 2 hari      |
| Pengumpulan tugas (Siswa upload)        | 3 hari      |
| PDF/Image viewer di browser             | 3 hari      |
| Annotation & koreksi tools              | 5 hari      |
| Penilaian & feedback                    | 2 hari      |
| Dashboard Guru & Siswa (tugas)          | 2 hari      |

### Phase 4 — Prestasi & Chat (Minggu 8-10)
| Task                                    | Estimasi    |
| --------------------------------------- | ----------- |
| CRUD Prestasi                           | 3 hari      |
| Verifikasi prestasi                     | 1 hari      |
| Upload bukti prestasi                   | 1 hari      |
| Tampilan prestasi (badge, card, table)  | 2 hari      |
| Setup Socket.io server                  | 2 hari      |
| Chat UI (contact list, chat window)     | 3 hari      |
| Real-time messaging                     | 3 hari      |
| File sharing via chat                   | 2 hari      |
| Notifikasi pesan baru                   | 1 hari      |

### Phase 5 — Polish & Launch (Minggu 11-12)
| Task                                    | Estimasi    |
| --------------------------------------- | ----------- |
| Responsive design optimization          | 3 hari      |
| Dark mode implementation                | 1 hari      |
| Error handling & loading states         | 2 hari      |
| Laporan & export (PDF/Excel)            | 3 hari      |
| Performance optimization                | 2 hari      |
| Security audit                          | 1 hari      |
| Testing (unit + integration)            | 3 hari      |
| UAT & bug fixing                        | 3 hari      |
| Deployment & documentation              | 2 hari      |

**Total Estimasi: ~12 Minggu (3 Bulan)**

---

## 13. Testing Strategy

### 13.1 Unit Testing
- **Framework**: Vitest
- **Target**: Utility functions, validators, API route handlers
- **Coverage target**: ≥ 80%

### 13.2 Integration Testing
- **Framework**: Vitest + Prisma test environment
- **Target**: API endpoints, database operations, auth flow

### 13.3 E2E Testing
- **Framework**: Playwright
- **Target**: Critical user flows
  - Login/Logout
  - Buat tugas → Kumpul tugas → Koreksi → Nilai
  - Input prestasi → Verifikasi
  - Chat flow (kirim & terima pesan)

### 13.4 Manual Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsive testing (mobile, tablet, desktop)
- Accessibility audit

---

## 14. Deployment

### 14.1 Arsitektur Deployment

```
                    ┌─────────────────┐
                    │   Cloudflare    │
                    │   (DNS + CDN)   │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │   VPS / Cloud   │
                    │   (e.g. Vercel  │
                    │   / DigitalOcean│
                    │   / Railway)    │
                    ├─────────────────┤
                    │  Next.js App    │
                    │  (Node.js)      │
                    ├─────────────────┤
                    │  Socket.io      │
                    │  Server         │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────┴───────┐ ┌───┴────┐ ┌───────┴──────┐
     │  MySQL 8.x     │ │ Redis  │ │ File Storage │
     │  (Managed)     │ │(Cache) │ │ (S3/MinIO)   │
     └────────────────┘ └────────┘ └──────────────┘
```

### 14.2 Opsi Deployment

| Opsi              | Pro                                    | Kontra                          |
| ----------------- | -------------------------------------- | ------------------------------- |
| Vercel + PlanetScale | Easy deploy, auto-scaling, serverless | Biaya bisa membengkak         |
| Railway           | Simple, all-in-one                     | Skalabilitas terbatas           |
| VPS (DO/Hetzner)  | Full control, cost-effective           | Butuh maintenance sendiri       |
| Self-hosted       | Kontrol penuh, data di lokal           | Butuh sysadmin & infrastruktur  |

---

## 15. Risiko & Mitigasi

| Risiko                                       | Dampak  | Mitigasi                                              |
| -------------------------------------------- | ------- | ----------------------------------------------------- |
| Adopsi lambat dari guru/siswa                | Tinggi  | Pelatihan penggunaan, UI yang intuitif                |
| Data siswa bocor                             | Tinggi  | Enkripsi, RBAC ketat, audit log                       |
| Server down saat ujian/deadline              | Tinggi  | Monitoring, auto-scaling, backup regular              |
| File upload menghabiskan storage             | Sedang  | Quota per user, kompresi otomatis, lifecycle policy   |
| Real-time chat tidak stabil                  | Sedang  | Fallback ke polling, retry mechanism                  |
| Fitur koreksi PDF lambat di mobile           | Sedang  | Lazy loading, progressive enhancement                 |
| Perubahan kurikulum memerlukan update mapel  | Rendah  | Struktur data fleksibel, admin bisa manage sendiri    |

---

## 16. Glosarium

| Istilah            | Definisi                                                    |
| ------------------ | ----------------------------------------------------------- |
| **Jenjang**        | Tingkat pendidikan: SD (Sekolah Dasar) atau SMP (Sekolah Menengah Pertama) |
| **Kelas**          | Kelompok belajar siswa dalam satu tingkat (misal: 1A, 7B)   |
| **Mapel**          | Mata Pelajaran                                              |
| **NIS**            | Nomor Induk Siswa                                           |
| **NIP**            | Nomor Induk Pegawai (Guru)                                  |
| **Wali Kelas**     | Guru yang bertanggung jawab atas satu kelas                 |
| **Tahun Ajaran**   | Periode akademik (misal: 2026/2027)                         |
| **CRUD**           | Create, Read, Update, Delete                                |
| **RBAC**           | Role-Based Access Control                                   |
| **SSR**            | Server-Side Rendering                                       |
| **RSC**            | React Server Components                                     |

---

## 17. Approval & Sign-off

| Nama               | Role              | Tanggal    | Tanda Tangan |
| ------------------ | ----------------- | ---------- | ------------ |
|                    | Project Owner      |            |              |
|                    | Lead Developer     |            |              |
|                    | Kepala Sekolah SD  |            |              |
|                    | Kepala Sekolah SMP |            |              |

---

