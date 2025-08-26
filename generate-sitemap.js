import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

(async () => {
  const sitemap = new SitemapStream({
    hostname: "https://fitfusiondemo.netlify.app/",
  });
  const writeStream = fs.createWriteStream("./public/sitemap.xml");
  sitemap.pipe(writeStream);

  const routes = [
    "/",
    "/welcome/login",
    "/welcome/signup",
    "/welcome/forgot-password",
    "/confirm-email",
    "/password-reset",
    "/dashboard/home",
    "/dashboard/update-user",
    "/dashboard/workouts",
    "/dashboard/workouts/123",
    "/dashboard/workouts/123/45",
    "/dashboard/workout-calendar",
  ];

  routes.forEach((route) => {
    sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("Sitemap generated successfully.");
})();
