//Internal Lib Import
const router = require("express").Router();

//External Lib Import
const messageRoute = require("./messages/messages.route");

const defaultRoutes = [
  {
    path: "/message",
    route: messageRoute,
  },
];

const devRoutes = [
  //   {
  //     path: "/docs",
  //     route: docsRoute,
  //   },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (pro.env === "development") {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
