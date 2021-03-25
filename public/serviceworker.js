self.addEventListener("install", (e) => {
  console.log("Service Worker Installed!: ", e);
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated!: ", e);
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker Fetched: ", e);
});
