import nextConnect from "next-connect";
import multer from "multer";
const promisify = require("util").promisify;
const path = require("path");
const fs = require("fs");
const readdirp = promisify(fs.readdir);
const statp = promisify(fs.stat);
const unlinkp = promisify(fs.unlink);
let jsonData = require("./data.json");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("files"));

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});

apiRoute.get(async (req, res) => {
  const result = await scan();
  jsonData.images = result.map((item, index) => ({
    imageUrl: item.split("public")[1],
    fileName: index,
  }));
  res.status(200).json({ data: jsonData });
});

apiRoute.delete(async (req, res) => {
  const directory = "./public/uploads";
  const files = await readdirp(directory);
  for (let filename of files) {
    await unlinkp(`${directory}/${filename}`);
  }
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function scan(directoryName = "./public/uploads", results = []) {
  let files = await readdirp(directoryName);
  for (let f of files) {
    let fullPath = path.join(directoryName, f);
    let stat = await statp(fullPath);
    if (stat.isDirectory()) {
      await scan(fullPath, results);
    } else {
      results.push(fullPath);
    }
  }
  return results;
}
