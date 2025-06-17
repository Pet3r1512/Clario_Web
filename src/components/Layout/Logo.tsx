export default function Logo() {
  return (
    <a data-testid="logo-wrapper" href="/">
      <img
        className="w-auto h-18 md:h-24 lg:h-32"
        src="/logo/Full_Logo.png"
        alt="Clario Logo"
      />
    </a>
  );
}
