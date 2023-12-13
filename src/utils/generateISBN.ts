export function generateISBN13(): string {
  const prefix = '978';
  let isbn = prefix;
  for (let i = prefix.length; i < 12; i++) {
    isbn += Math.floor(Math.random() * 10).toString();
  }

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const weight = i % 2 === 0 ? 1 : 3;
    sum += parseInt(isbn[i]) * weight;
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  return isbn + checkDigit.toString();
}
