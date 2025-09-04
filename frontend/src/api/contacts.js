export async function fetchContacts() {
  const res = await fetch('/contacts');
  return res.json();
}
