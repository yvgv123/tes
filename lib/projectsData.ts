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
    title: "SKELETON<br>MINER'S",
    desc: "a vector image asset of a miner's skeleton",
    image: "/assets/skeleton_miner_01.png",
    leftPanelBg: "#0B3535",
    status: "DECRYPTED", rev: "1.0.4", created: "2024-05-26", author: "GALIH_R", type: "VECTOR_ILLUSTRATION",
    detailDesc: "This asset features a skeletal figure integrated with mining equipment, rendered in precise, crisp vector lines. Primarily engineered as a high-impact graphic element for apparel, merchandise branding, or digital stock distribution. All vector nodes and color palettes have been secured for scalable deployment."
  },
  {
    id: "ARCHIVE_FILE_02",
    title: "Bukan<br>Boneka Biasa!",
    customTitleCss: "color:#fff;font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:48px;text-transform:uppercase;white-space:nowrap;",
    desc: "Revealing the Mystical Charm of Nini Thowong in Bantul, Yogyakarta",
    image: "/assets/nini_thowong.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0D1A3D",
    status: "ENCRYPTED", rev: "2.1.0", created: "2025-12-7", author: "GALIH_R", type: "E-Book",
    detailDesc: "The visual documentation e-book 'Bukan Boneka Biasa!' corrects the negative perceptions surrounding the mystical tradition of Nini Thowong in Dusun Grudo through a combination of field research and visual communication design. This project explores the core values of the art form as a tangible expression of social harmony, mutual cooperation, and the history of traditional healing, while translating the intricate stories of the past into a functional and modern digital literacy format."
  },
  {
    id: "ARCHIVE_FILE_03",
    title: "Yellow<br>Fin",
    desc: "vector image asset of a yellowfin mahseer fish",
    image: "/assets/yellowfin_mahseer.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;object-position:center;z-index:1;",
    leftPanelBg: "#1A0D3D",
    status: "ACTIVE", rev: "0.9.beta", created: "2024-4-23", author: "GALIH_R", type: "VECTOR_ILLUSTRATION",
    detailDesc: "A digital illustration featuring a highly detailed fish, emphasizing its thick and intricately outlined scale patterns. The monochromatic silver and black body of the fish creates a strong visual contrast with the bright yellow hues on its dorsal, pectoral, and forked caudal fins. This artwork blends scientific-style visual precision with a bold aesthetic, strikingly capturing the textured anatomy of the subject."
  },
  {
    id: "ARCHIVE_FILE_04",
    title: "Crimson<br>Gaze Limbata",
    customTitleCss: "color:#fff;font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:48px;text-transform:uppercase;white-space:nowrap;",
    desc: "vector image asset of a bogo fish or channa limbata from Indonesia",
    image: "/assets/limbata.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.0.0", created: "2024-1-30",
    author: "SYSTEM_AUTO", type: "VECTOR_ILLUSTRATION",
    detailDesc: "A digital illustration depicts a stunning ornamental Snakehead fish (Bogo/Channa limbata) in a swimming pose. Its sleek, dark gray body contrasts sharply with the highly detailed dorsal and tail fins. The fish's defiant red-orange eye further enhances the illustrative style, which is characterized by clean lines, rich color saturation, and a bold, mascot-like aesthetic."
  },
  {
    id: "ARCHIVE_FILE_05",
    title: "A Casual<br>Self-Portrait",
    customTitleCss: "color:#fff;font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:48px;text-transform:uppercase;white-space:nowrap;",
    desc: "This is a stylized, casual vector self-portrait of myself.",
    image: "/assets/casual_portrait.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;object-position:center;z-index:1;",
    leftPanelBg: "#1A0F2E",
    status: "RECOVERED", rev: "1.1.0", created: "2025-3-16",
    author: "SYSTEM_AUTO", type: "VECTOR_ILLUSTRATION",
    detailDesc: "This digital illustration is a contemplative self-representation, capturing a moment of quiet self-assurance. The figure stands in a relaxed pose with crossed legs and one hand casually in his pocket, wearing a versatile outfit consisting of a dark gray sweater, a collared white shirt, faded blue jeans, and classic black sneakers. The character's reserved expression and clean, vector-like art style convey a blend of introverted introspection and approachable confidence, defining a precise personal identity through minimalist yet detailed form."
  },
  {
    id: "ARCHIVE_FILE_06",
    title: "JEMPOL MENGETIK,<br>BANGSA TERUSIK",
    customTitleCss: "color:#fff;font-size:38px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:42px;text-transform:uppercase;white-space:nowrap;",
    desc: "an educational poster describing the implementation of the values contained in Pancasila",
    image: "/assets/jempol_mengetik.jpg",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.2.0", created: "2025-11-19",
    author: "SYSTEM_AUTO", type: "Poster",
    detailDesc: "This poster illustrates how the action of a single finger on a smartphone can fracture national unity, a core principle of Pancasila. A hand is shown typing censored hate comments, represented by speech bubbles (\"JWIR\", \"SDM RENDAH!\", \"JW* = HAMA!\"), which are visually connected to severe cracks on a framed map of Indonesia under a spotlight in the background. This visualization, paired with the large headline 'JEMPOL MENGETIK, BANGSA TERUSIK' and the advisory text 'Saring sebelum sharing,' serves as a stark warning against reckless behavior on social media, demonstrating that it can literally tear apart the fabric of the country."
  },
  {
    id: "ARCHIVE_FILE_07",
    title: "Peak of<br>Youth Spirit",
    customTitleCss: "color:#fff;font-size:48px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:48px;text-transform:uppercase;white-space:nowrap;",
    desc: "a poster commemorating Youth Pledge Day, October 28",
    image: "/assets/youth_spirit.jpg",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#1A0F2E",
    status: "RECOVERED", rev: "1.3.0", created: "2024-10-27",
    author: "SYSTEM_AUTO", type: "Poster",
    detailDesc: "This digital poster was created to commemorate Youth Pledge Day using a striking and patriotic visual composition. Dominated by a roughly textured red background symbolizing courage and the Indonesian flag, the artwork features a black silhouette of a figure standing triumphantly atop a rocky cliff peak while waving a flag. The bold white typography with a distressed style on the text 'SELAMAT HARI SUMPAH PEMUDA 28 OKTOBER' complements this gritty vintage aesthetic, effectively conveying a strong message of perseverance, fighting spirit, and national pride."
  },
  {
    id: "ARCHIVE_FILE_08",
    title: "Labdagati<br>Digital Library",
    customTitleCss: "color:#fff;font-size:38px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:42px;text-transform:uppercase;white-space:nowrap;",
    desc: "Warm digital library app interface design concept for competition purposes.",
    image: "/assets/labdagati_ui.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#0F1F1F",
    status: "RECOVERED", rev: "1.4.0", created: "2024-9-25",
    author: "SYSTEM_AUTO", type: "INTERFACE_CONCEPT",
    detailDesc: "Created specifically for a competition, the UI/UX design of the 'Labdagati' online library app offers a warm visual experience through a cohesive earth-tone color palette. Its interface is designed for optimal navigation, featuring an efficient authentication process, an organized home screen for various reading categories, and management features for downloads and custom personal shelves. This blend of minimalist aesthetics and intuitive functionality successfully creates a comfortable, modern digital reading space for book enthusiasts."
  },
  {
    id: "ARCHIVE_FILE_09",
    title: "Abstract Manual<br>Book Cover<br>Designs",
    customTitleCss: "color:#fff;font-size:36px;font-weight:700;font-family:'Space Grotesk',sans-serif;line-height:40px;text-transform:uppercase;white-space:nowrap;",
    desc: "four modern abstract manual book cover design templates",
    image: "/assets/abstract_covers.png",
    customImgCss: "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:1;",
    leftPanelBg: "#1A0F2E",
    status: "RECOVERED", rev: "1.5.0", created: "2024-7-4",
    author: "SYSTEM_AUTO", type: "COVER_BOOK",
    detailDesc: "Four modern abstract manual book cover design templates. Each design variant utilizes a clean and professional aesthetic with sophisticated flowing curves and layered gradients, suitable for various publications. This complete set includes options of warm gold-brown, cool blue, vibrant red-orange, and natural green, all of which incorporate clear integrated placeholder text for flexible branding and title placement, providing a versatile and high-quality solution for technical manuals."
  }
];
