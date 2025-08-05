/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1100px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
    },
    extend: {
      colors: {
        graidient_top: "#130107",
        graidient_bottom: "rgba(223, 6, 78, 1)",
        gradient_darker: "rgba(159 , 0 , 54, 1)",
        overlap: "#F5F5F5",
        botton_white_text: "#DF064d",
        white_transperent: " rgba(245, 245, 245, 0.97)",
        home_card_bg: "rgba(74, 85, 104, 0.4)",
        home_blue: " rgba(5, 3, 77, 1)",
        shadow_Bottom: "rgba(223, 6, 78, 0.6)",
        footer_gradient_top: "rgba(19 , 1, 7 , 1)",
        footer_gradient_bot: "rgba(223 , 6 , 78 , 1)",
        home_button_color: "rgba(223, 6, 78, 1)",
        editor_button_top: "rgba(255, 255 , 255 ,1)",
        editor_button_bot: "rgba(236 , 236 , 236 , 1)",
        editor_header_button: "rgba(247, 231, 237, 1)",
        sidebar_border: "rgba(152 , 152 , 152 , 1)",
        hover_btn: "rgba(255, 206, 216, 0.2)",
        hover_dark_btn: "rgba(159, 0, 54, 1)",
        lvl_3_bg: "rgba(245, 245, 245, 1)",
        lvl_3_txt: "rgba(167, 167, 167, 1)",
        lvl_3_img: "rgba(196, 196, 196, 1)",
        lvl_2_txt: "rgba(140, 140, 140, 1)",
        lvl_2_hed: "rgba(140, 140, 140, 1)",
        lvl_3_sha: "rgba(0, 0, 0, 0.2)",
        canvas_bg: "rgba(245, 245, 245, 1)",
        cost_bg: " rgba(82, 82, 82 , 1 )",
        active_text: "#1F1F1F",
        heightlet_text: "#525252",
        non_active_text: "#8C8C8C",
        non_active_text_2: " #CBCBCB",

        backgrounds: "#F5F5F5",
        highlight: " #EEEEEE",
        border_clr: "#E0E0E0",
        secondary: "#C80544",
        primary: "#DF064E",
        third: "#9F0036",
        backgrounds_2: "#F0F0F0",
      },

      clipPath: {
        trapezoid: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
      },
    },
  },
  plugins: [],
};
