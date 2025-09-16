import { useEffect } from "react";
import Home from "./pages/home/Home";

// Home Page Dashboard
const App = () => {
  useEffect(() => {
    document.title = "Home | Mindcanvas";
    // document.title.description:
    // "MindCanvas is a online and offline content creation tool. Bring all your work, ideas to an oragnized place.",
    // robots: "index, follow",
    // alternates: {
    // canonical: "https://vercel.life-expansion.app/",
    // },
    // icons: {
    // icon: "favicon.ico",
    // },
  }, []);
  return <Home />;
};

export default App;
