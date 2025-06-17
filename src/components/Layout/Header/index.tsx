import Logo from "../Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto px-5 lg:px-0">
      <Logo />
      <Navbar />
    </header>
  );
}
