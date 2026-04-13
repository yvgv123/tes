// lib/projectsData.ts

export interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
  leftPanelBg: string;
  status: string;
  rev: string;
  created: string;
  author: string;
  type: string;
  detailDesc: string;
  customTitleCss?: string;
  customImgCss?: string;
}

export const projectsData: Project[] = [
  {
    id: "ARCHIVE_FILE_01",
    title: "Bukan<br>Boneka Biasa!",
    customTitleCss: "color:#fff;font-weight:700;font-family:'Space Grotesk',sans-serif;text-transform:uppercase;",
    desc: "Mengungkap Pesona Mistis Nini Thowong yang ada di Bantul, Yogyakarta",
    image: "/assets/nini_thowong.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0D1A3D",
    status: "ENCRYPTED", rev: "2.1.0", created: "2025-12-7", author: "GALIH_R", type: "E-Book",
    detailDesc: "Melalui e-book dokumentasi visual 'Bukan Boneka Biasa!', saya ingin meluruskan anggapan negatif tentang tradisi Nini Thowong di Dusun Grudo. pada karya ini, saya menggabungkan hasil riset lapangan langsung dengan desain komunikasi visual. Fokus utama saya adalah mengangkat nilai-nilai asli dari kesenian ini seperti kerukunan warga, semangat gotong royong, dan sejarah pengobatan tradisionalnya. Dimana, saya berusaha menerjemahkan cerita masa lalu yang kompleks ke dalam format digital yang lebih modern, fungsional, dan mudah dinikmati oleh pembaca saat ini."
  },
  {
    id: "ARCHIVE_FILE_02",
    title: "JEMPOL MENGETIK,<br>BANGSA TERUSIK",
    customTitleCss: "color:#fff;font-weight:700;font-family:'Space Grotesk',sans-serif;text-transform:uppercase;",
    desc: "poster edukasi yang menjelaskan penerapan nilai-nilai terkandung dalam Pancasila",
    image: "/assets/jempol_mengetik.jpg",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.2.0", created: "2025-11-19",
    author: "SYSTEM_AUTO", type: "Poster",
    detailDesc: "Pada poster ini, saya ingin menunjukkan bagaimana tindakan sederhana dari satu jari di smartphone dapat merusak persatuan bangsa, nilai yang jadi inti Pancasila. Di sini, saya menampilkan ilustrasi tangan yang sedang mengetik komentar-komentar kebencian seperti \"J*WIR\", \"SDM RENDAH!\", dan \"J*W* = HAMA!\". Efek dari komentar ini saya visualisasikan dengan retakan parah pada bingkai peta Indonesia di latar belakang. Dengan memadukan visual tersebut, headline \"JEMPOL MENGETIK, BANGSA TERUSIK\", dan pesan \"Saring sebelum sharing\", saya merancang karya ini sebagai peringatan keras bahwa kebiasaan asal ketik di media sosial benar-benar bisa memecah belah negara kita."
  },
  {
    id: "ARCHIVE_FILE_03",
    title: "Labdagati<br>Digital Library",
    customTitleCss: "color:#fff;font-weight:700;font-family:'Space Grotesk',sans-serif;text-transform:uppercase;",
    desc: "Konsep desain antarmuka aplikasi perpustakaan digital dengan kesan hangat untuk tujuan kompetisi.",
    image: "/assets/labdagati_ui.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.4.0", created: "2024-9-25",
    author: "SYSTEM_AUTO", type: "INTERFACE_CONCEPT",
    detailDesc: "Untuk proyek ini, saya merancang UI/UX aplikasi perpustakaan online 'Labdagati' khusus untuk sebuah lomba. Saya menggunakan palet warna earth-tone agar tampilannya terasa hangat dan terkesan klasik secara visual. Bagian antarmuka saya atur sedemikian rupa supaya navigasinya optimal dan mudah digunakan. Di dalamnya, saya membuat alur login yang efisien, beranda yang rapi untuk berbagai kategori bacaan, serta fitur untuk mengatur buku yang diunduh dan rak buku pribadi. Pada intinya, lewat perpaduan estetika yang minimalis dan fungsi yang intuitif, saya ingin menciptakan ruang baca digital yang modern dan nyaman bagi para penggemar buku."
  }
];
