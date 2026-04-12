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
    desc: "Revealing the Mystical Charm of Nini Thowong in Bantul, Yogyakarta",
    image: "/assets/nini_thowong.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0D1A3D",
    status: "ENCRYPTED", rev: "2.1.0", created: "2025-12-7", author: "GALIH_R", type: "E-Book",
    detailDesc: "The visual documentation e-book 'Bukan Boneka Biasa!' corrects the negative perceptions surrounding the mystical tradition of Nini Thowong in Dusun Grudo through a combination of field research and visual communication design. This project explores the core values of the art form as a tangible expression of social harmony, mutual cooperation, and the history of traditional healing, while translating the intricate stories of the past into a functional and modern digital literacy format."
  },
  {
    id: "ARCHIVE_FILE_02",
    title: "JEMPOL MENGETIK,<br>BANGSA TERUSIK",
    customTitleCss: "color:#fff;font-weight:700;font-family:'Space Grotesk',sans-serif;text-transform:uppercase;",
    desc: "an educational poster describing the implementation of the values contained in Pancasila",
    image: "/assets/jempol_mengetik.jpg",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.2.0", created: "2025-11-19",
    author: "SYSTEM_AUTO", type: "Poster",
    detailDesc: "This poster illustrates how the action of a single finger on a smartphone can fracture national unity, a core principle of Pancasila. A hand is shown typing censored hate comments, represented by speech bubbles (\"JWIR\", \"SDM RENDAH!\", \"JW* = HAMA!\"), which are visually connected to severe cracks on a framed map of Indonesia under a spotlight in the background. This visualization, paired with the large headline 'JEMPOL MENGETIK, BANGSA TERUSIK' and the advisory text 'Saring sebelum sharing,' serves as a stark warning against reckless behavior on social media, demonstrating that it can literally tear apart the fabric of the country."
  },
  {
    id: "ARCHIVE_FILE_03",
    title: "Labdagati<br>Digital Library",
    customTitleCss: "color:#fff;font-weight:700;font-family:'Space Grotesk',sans-serif;text-transform:uppercase;",
    desc: "Warm digital library app interface design concept for competition purposes.",
    image: "/assets/labdagati_ui.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.4.0", created: "2024-9-25",
    author: "SYSTEM_AUTO", type: "INTERFACE_CONCEPT",
    detailDesc: "Created specifically for a competition, the UI/UX design of the 'Labdagati' online library app offers a warm visual experience through a cohesive earth-tone color palette. Its interface is designed for optimal navigation, featuring an efficient authentication process, an organized home screen for various reading categories, and management features for downloads and custom personal shelves. This blend of minimalist aesthetics and intuitive functionality successfully creates a comfortable, modern digital reading space for book enthusiasts."
  }
];
