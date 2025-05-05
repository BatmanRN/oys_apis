/*
const express = require("express");
const router = express.Router();
const { supabase } = require("../supabaseClient"); 

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("course_materials")
      .select("id, course_id, code, name, pdf_url");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const { supabase } = require("../supabaseClient");

router.get("/:student_id", async (req, res) => {
  const studentId = req.params.student_id;

  try {
    // 1. Öğrencinin kayıtlı olduğu course_id'leri çek
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from("enrollments")
      .select("course_id")
      .eq("student_id", studentId);

    if (enrollmentsError) {
      return res.status(500).json({ error: enrollmentsError.message });
    }

    const courseIds = enrollments.map(e => e.course_id);

    // 2. Bu derslere ait course_materials kayıtlarını çek
    const { data: materials, error: materialsError } = await supabase
      .from("course_materials")
      .select("id, course_id, code, name, pdf_url")
      .in("course_id", courseIds);

    if (materialsError) {
      return res.status(500).json({ error: materialsError.message });
    }

    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
