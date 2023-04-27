// export function formatDate(date) {
//   return date.toISOString();
// }

export function formatDate(date) {
  if (typeof date === "string") {
    date = new Date(date); // Convert string to Date object
  }
  console.log(date.toString().split("GMT")[0]);

  return date.toString().split("GMT")[0];
}
