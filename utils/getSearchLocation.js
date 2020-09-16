export function getSearchLocationList(posts, search) {
  const list = posts
    .map((item) => {
      if (item.location.includes(search)) {
        return item;
      }
      return;
    })
    .filter((item) => typeof item === "object");
  return list;
}
