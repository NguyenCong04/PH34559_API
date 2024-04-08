var express = require("express");
var router = express.Router();
const Shoes = require("../model/shoes");
const upload = require("../config/upload");

router.get("/", (rq, rs) => {
  rs.send("Vao API mobile");
});

router.get("/get-list-shoe", async (rq, rs) => {
  try {
    const data = await Shoes.find();

    rs.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/post-shoe", upload.single("image"), async (rq, rs) => {
  try {
    const data = rq.body;
    const file = rq.file;
    const urlimage = `${rq.protocol}://${rq.get("host")}/uploads/${
      file.filename
    }`;
    const newShoe = new Shoes({
      name: data.name,
      brand: data.brand,
      price: data.price,
      size: data.size,
      image: urlimage,
    });
    const reslut = await newShoe.save();

    if (reslut) {
      rs.json({
        status: 200,
        messenger: "Create shoe successfully",
        data: reslut,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "Erro",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-shoe-by-id/:id", async (rq, rs) => {
  try {
    const { id } = rq.params;
    const result = await Shoes.findByIdAndDelete(id);

    if (result) {
      rs.json({
        status: 200,
        messenger: "Delete shoe successfully",
        data: result,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "ERRO",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/update-shoe-by-id/:id", upload.single("image"), async (rq, rs) => {
  try {
    const { id } = rq.params;
    const data = rq.body;
    const file = rq.file;

    const urlimage = `${rq.protocol}://${rq.get("host")}/uploads/${
      file.filename
    }`;

    const updateShoe = await Shoes.findById(id);

    let reslut = null;
    if (updateShoe) {
      updateShoe.name = data.name ?? updateShoe.name;
      updateShoe.brand = data.brand ?? updateShoe.brand;
      updateShoe.price = data.price ?? updateShoe.price;
      updateShoe.size = data.size ?? updateShoe.size;
      updateShoe.image = urlimage ?? updateShoe.image;

      reslut = await updateShoe.save();
    }

    if (reslut) {
      rs.json({
        status: 200,
        messenger: "Update shoe successfully",
        data: reslut,
      });
    } else {
      rs.json({
        status: 400,
        messenger: "ERRO",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//Tim kiem
router.get("/search-shoe", async (req, res) => {
  try {
    const key = req.query.key;
    const data = await Shoes.find({
      name: { $regex: key, $options: "i" },
    }).sort({ createAt: -1 });

    if (data) {
      res.send(data);
    } else {
      res.json({
        status: 400,
        msg: "That bai",
        data: [],
      });
    }
  } catch (error) {
    console.log("router.get  error:", error);
  }
});

//Sắp xếm theo giá
router.get("/sort-shoe", async (req, res) => {
  try {
    let sort = 1;
    const sortType = req.query.sort; // Lấy giá trị của tham số sort từ request query

    const data = await Shoes.find().sort({ price:  sort });
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.json({
        status: 200,
        msg: "Thât bại",
        data: [],
      });
    }
  } catch (error) {
    console.log("router.get  error:", error);
  }
});

router.get("/sort-shoe", async (req, res) => {
  try {
    const data = await Shoes.find().sort({ price: 1 });//1 SX tăng
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.json({
        status: 200,
        msg: "Thât bại",
        data: [],
      });
    }
  } catch (error) {
    console.log("router.get  error:", error);
  }
});
router.get("/sort-shoe-1", async (req, res) => {
  try {
    const data = await Shoes.find().sort({ price: -1 });//1 SX giảm
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.json({
        status: 200,
        msg: "Thât bại",
        data: [],
      });
    }
  } catch (error) {
    console.log("router.get  error:", error);
  }
});

module.exports = router;
