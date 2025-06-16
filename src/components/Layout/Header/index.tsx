import Logo from "../Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="flex justify-between items-center max-w-7xl mx-auto">
      <Logo />
      <Navbar />
    </header>
  );
}
