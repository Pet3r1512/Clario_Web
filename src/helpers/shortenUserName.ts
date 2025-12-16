export default function ShortenUserName(userName: string): string {
  const words = userName.split(" ");

  if (words.length == 1) {
    return words[0][0].toUpperCase();
  }

  if (words.length >= 2) {
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  }

  return "";
}
