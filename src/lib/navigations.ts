interface Navigations {
  name: string;
  link: string;
}

const navigations: Navigations[] = [
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Log In",
    link: "/auth/login",
  },
  {
    name: "Sign Up",
    link: "/auth/signup",
  },
];

export default navigations;
